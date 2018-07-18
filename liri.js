require("dotenv").config();

let keys = require("./keys")

let Twitter = require('twitter');
let Spotify = require('node-spotify-api');
let params = {
    screen_name: 'PhilipL47617143'
};
let argument = process.argv[2]
let title = process.argv[3]
let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);


if (argument === "spotify-this-song") {
    spotify.search({
        type: 'track',
        query: title,
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //gives artist name
        let songData = data.tracks.items
        songData.forEach(song => {
            console.log(song.artists[0].name)
            console.log(song.name)
            console.log(song.artists[0].external_urls.spotify)
            console.log(song.album.name)
        })

    });
}

if (argument === "my-tweets") {
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            tweets.forEach(tweet =>
                console.log(tweet.text)
            );
        }
    });
}

if (argument === "tweet")
client.post('statuses/update', {status: title}, function(error, tweet, response) {
    if (!error) {
      console.log(tweet);
    }
  });







