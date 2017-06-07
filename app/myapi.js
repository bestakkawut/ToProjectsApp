var express = require('express');
var app = express();
var http = require('http');
var pug = require('pug');
var routes = require('./routes.js');
var controller = require('./controller.js');
var fs = require('fs');
var body = require('body-parser');


// for Raspberry
var Gpio = require('onoff').Gpio;

//app setting 

app.use(express['static'](__dirname ));
app.set('views',__dirname+'/views');
app.set('view engine', 'pug');

app.use(body.json()); // support json encoded bodies
app.use(body.urlencoded({ extended: true })); // support encoded bodies


var server = app.listen(3000);
var io = require('socket.io').listen(server);

//require('events').EventEmitter.prototype._maxListeners = 100;

console.log('App Server running at port 3000');

// for Raspberry
btn0 = new Gpio(14,'in','both');
btn1 = new Gpio(15,'in','both');
btn2 = new Gpio(18,'in','both');
led = new Gpio(24, 'out');
// var btn0 = btn1 = btn2 = led = null;

// routes
routes.views(app,body);
// ** routes

io.on('connection',function(socket){ 
    socket.on('picpicksend',function(data){
        if(data == "1"){
            socket.emit('picpick', {msg:'pic1'});
        }else if(data == "2"){
            socket.emit('picpick', {msg:'pic2'});
        }
    });         
});

//for Raspberry

io.on('connection',function(socket){
  btn0.watch(function(err,value){
    controller.switchInput('btn0',value,led,socket);
  });
  btn1.watch(function(err,value){
    controller.switchInput('btn1',value,led,socket);
  });
  btn2.watch(function(err,value){
    controller.switchInput('btn2',value,led,socket);
  });
});




// Express route to handle errors
app.use(function(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send('Oops, Something went wrong!');
  } else {
    next(err);
  }
});

module.exports = app;