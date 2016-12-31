const express = require('express');
const app = express();
const http = require('http');
const Twitter = require('twit');
const io = require('socket.io')(3000);
const rightpad = require('right-pad');

const watchList = process.argv[2].split(',');

const twitter = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token: '',
  access_token_secret: ''
});

twitter.stream('statuses/filter', { track: watchList }).on('tweet', function (tweet) {
  const text = tweet.text.replace(/\n|\r/g, '');

  console.log(`@${rightpad(tweet.user.screen_name, 25)} ${text}`);

  io.emit('tweet:new', tweet);
});
