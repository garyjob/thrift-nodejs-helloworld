thrift = require 'thrift'
helloWorldService = require('./gen-nodejs/HelloWorld')
helloTypes = require('./gen-nodejs/hello_types')

connection = thrift.createConnection('localhost', 9111)
client = thrift.createClient(helloWorldService, connection)
client.greetings "Greetings from Node", (err, res)->
  if err
    console.log "Error : %s", err
  else
    console.log "Response from server : ", res