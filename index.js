var express=require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var Ajv = require('ajv');

//MYSQL
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crmslcco_systemx"
});


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


             
                   var sql = "INSERT INTO chat (name,msg) VALUES ('"+data.name+"', '"+data.msg+"')";
                   con.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log("1 record inserted");
                   });
             
          io.emit('chat.message',data);
     });

     socket.on('disconnect',function()
     {
          //io.emit('chat.message','User Has disconnect') ; 
     });
});


app.get('/chat', function(req, res)
{
    con.query('SELECT name,msg FROM chat', function(err, rows)
    {
        if(err)
            res.status(500).json({"Error":err});
        else if(rows.length)
            res.status(200).json(rows);
        else
            res.status(200).json({"Data":"No records found"});
    });
});