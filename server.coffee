thrift = require 'thrift'
helloWorldService = require('./gen-nodejs/HelloWorld')
helloTypes = require('./gen-nodejs/hello_types');

server = thrift.createServer(helloWorldService, {
  greetings: (message, result)->
    console.log("server retrieved:", message);
    result(null, "What to do?");
});

server.listen 9111
console.log "Listening at port %s", 9111
