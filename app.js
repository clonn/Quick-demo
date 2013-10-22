
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require("socket.io").listen(server);
var imgs = [
    "http://i.imgur.com/y41WQyI.jpg",
    "http://i.imgur.com/Axh5rOq.jpg",
    "http://i.imgur.com/lTtGncd.jpg",
    "http://i.imgur.com/PVYvfGy.jpg",
    "http://i.imgur.com/2QZvYe5.jpg"
];

var index = 0;

io.sockets.on("connection", function (socket) {
    socket.emit("start");
});

function broascastImg () {
    io.sockets.emit("showImg", {
        link: imgs[index]
    });
    index = index % 4;
    index ++;
    setTimeout(function () {
        console.log('show index: ' + index);
        broascastImg();
    }, 500);
}

broascastImg();
