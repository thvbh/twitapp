const express = require('express');
const Twitter = require('twit');
const config = require('./config');
const app = express();

const client = new Twitter({
  consumer_key: config.consumerKey,
  consumer_secret: config.consumerSecret,
  access_token: config.accessToken,
  access_token_secret: config.accessTokenSecret
});

app.use(require('cors')());
app.use(require('body-parser').json());

app.get('/api/tweets', (req, res) => {
  let params = {screen_name: '', tweet_mode: 'extended', exclude_replies: false};
  if(req.query.screen_name) {
    params.screen_name = req.query.screen_name;
  }
  if(req.query.exclude_replies) {
    params.exclude_replies = req.query.exclude_replies;
  }
  client.get('statuses/user_timeline', params).then(timeline => {
    res.send(timeline);
  }).catch(error => res.send(error));
});


app.listen(config.host, () => console.log('Server running'));
