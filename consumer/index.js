var Hapi = require('hapi');
var Good = require('good');
var amqp = require('amqp');
var server = new Hapi.Server();

server.connection({port: 8080});



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
        server.log('info', 'Consumer server running at  ' + server.info.uri);
    });

});

server.rabbitMqConnection = amqp.createConnection({host: '192.168.59.103'});
server.rabbitMqConnection.on('ready', function(){
    server.rabbitConnectionStatus = 'Connected';
    if (server.log)
        server.log('info', 'connected to rabbitmq');



    server.rabbitMqConnection.exchange('exchange', {
        type: 'fanout'
    }, function(exchange){
        if (server.log)
            server.log('info', 'exchange is open!');

        server.rabbitQueue = server.rabbitMqConnection.queue('consumer1-queue',
            {autoDelete: 'false', exclusive: true}, function(queue){
            if (server.log)
                server.log('info', 'queue opened');

            queue.bind(exchange, '');
            queue.subscribe(function (message, headers, deliveryInfo, messageObject) {
                server.log('info', 'Got a message with message: ' + JSON.stringify(message));
            });
        });
    });



});
