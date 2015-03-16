/**
 * Created by chris on 3/16/15.
 */
var cassandra = require('cassandra-driver');
var client = new cassandra.Client({contactPoints: ['192.168.59.103'], keyspace:'ks1'});
var query = 'insert into test(key) values (test1)';
client.execute(query, undefined, {prepare:false}, function(err){
   if (err){
       console.log(err);
       return;
   }
    console.log('inserted');
    client.eachRow('select * from test', undefined, function(n, row){
        console.log('row val is ' + row.key);
    }, function(err){
        if (err){
            console.log('an error occurred ' + err);
        }
    });
});