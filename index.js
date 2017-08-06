var express=require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//var Validator = require('jsonschema').Validator;

var Ajv = require('ajv');

server.listen(3000,'0.0.0.0');

app.get('/',function(request,response)
{
     response.sendFile(__dirname+'/index.html');
     //console.log('as');
});

app.use(express.static(__dirname + '/public'));

io.on('connection',function(socket)
{
     socket.on('chat.message',function(data)
     {    
          
         var ajv = new Ajv();
         var validate = ajv.compile({ "type": "string","minLength":3});
         var valid = validate(data.msg);
         if (!valid) console.log(validate.errors);

          io.emit('chat.message',data);
     });

     socket.on('disconnect',function()
     {
          io.emit('chat.message','User Has disconnect') ; 
     });
});
