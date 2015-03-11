var Hapi = require('hapi');
var Good = require('good');
var Path = require('path');
var amqp = require('amqp');


var server = new Hapi.Server();

server.connection({port: 8080});

server.views({
    engines:{
        html: require('handlebars')
    },
    path: Path.join(__dirname, 'templates')
});



server.register({
    register: Good,
    options:{
        reporters: [{
            reporter: require('good-console'),
            args:[{ log: '*', response: '*' }]
        }]
    }
}, function(err){
    if (err){
        throw err;
    }

    server.start(function(){
        server.log('info', 'Producer server running at  ' + server.info.uri);
    });

});

server.rabbitMqConnection = amqp.createConnection({host: '192.168.59.103'});
server.rabbitMqConnection.on('ready', function(){
    server.rabbitConnectionStatus = 'Connected';
    if (server.log)
        server.log('info', 'connected to rabbitmq');

    server.rabbitExchange = server.rabbitMqConnection.exchange('exchange', {
        type: 'fanout'
    }, function(exchange){
        if (server.log)
            server.log('info', 'exchange is open!');
    });

    if (server.log)
        server.log('info', 'exchange created');

});


server.route({
    method: 'GET',
    path: '/',
    handler: {
        view: 'index'
    }
});

server.route({
    method: 'POST',
    path: '/send',
    handler: function(request, reply){
        server.rabbitExchange.publish('', request.payload.msg, {}, function(err, msg){
            server.log('info', msg);
        });
        reply.view('send', {message: request.payload.msg});
    }
});

