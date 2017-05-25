var express = require('express');
var app = express();
var http = require('http');
var pug = require('pug');
var routes = require('./routes.js');


//app setting 

app.use(express['static'](__dirname ));
app.set('views',__dirname+'/views');
app.set('view engine', 'pug');

// for Raspberry
//var Gpio = require('onoff').Gpio;
var server = app.listen(3000);
var io = require('socket.io').listen(server);

//require('events').EventEmitter.prototype._maxListeners = 100;

console.log('App Server running at port 3000');

// for Raspberry
//button = new Gpio(23,'in','both');
//led = new Gpio(24, 'out');


// routes
routes.views(app);
// ** routes



io.on('connection',function(socket){ 
    socket.on('chat message',function(data){
        if(data == "1"){
            socket.emit('new message', {msg:'pic1'});
        }else if(data == "2"){
            socket.emit('new message', {msg:'pic2'});
        }
    });         
});

/* for Raspberry
//
io.on('connection',function(socket){
  button.watch(function(err,value){
    input = value;
    if(input==1){
     led.writeSync(input);
     socket.emit('new message', {msg:'on'});
    }else{
led.writeSync(input);
     socket.emit('new message', {msg:'off'});
    }    
  });
});
*/



// Express route to handle errors
app.use(function(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send('Oops, Something went wrong!');
  } else {
    next(err);
  }
});

module.exports = app;