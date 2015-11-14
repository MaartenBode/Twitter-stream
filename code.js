var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  ,Twit = require('twit')
  , io = require('socket.io').listen(server);

server.listen(8080);

app.get('/', function (req, res) {
res.sendFile(__dirname + '/index.html');
});

var watchList = ['paris'];
 var T = new Twit({
    consumer_key:         ''
  , consumer_secret:      ''
  , access_token:         ''
  , access_token_secret:  ''
})

io.sockets.on('connection', function (socket) {
    console.log('Connected');
    var stream = T.stream('statuses/filter', { track: watchList })
    stream.on('tweet', function (tweet) {
        io.sockets.emit('stream',tweet.text);
    });
});
