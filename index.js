var express=require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var Validator = require('jsonschema').Validator;

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
          
          var v = new Validator();
          var schema = {"type": "number"};
          var val=v.validate(data, schema);

          if (val.message!=undefined)
          {
               data={err:true,errMsg:'HATA'};
          }
           
          console.log(val.message);
          console.log(val);
          io.emit('chat.message',data);
     });

     socket.on('disconnect',function()
     {
          io.emit('chat.message','User Has disconnect') ; 
     });
});
