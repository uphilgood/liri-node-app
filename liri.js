require("dotenv").config();

let keys = require("./keys")
let fs = require("fs");
let Twitter = require('twitter');
let Spotify = require('node-spotify-api');
let request = require('request');
let params = {
    screen_name: 'PhilipL47617143'
};
let argument = process.argv[2]
let title = process.argv[3]
let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);
let omdbKey = keys.omdb.key
// global.navigator = {
//     userAgent: 'liri.js'
//   };

if (argument === "movie-this" && title) {
    request.get('http://www.omdbapi.com/?t=' + title + '&apikey=' + omdbKey, function (error, response, body) {
        if (!error) {
            let data = JSON.parse(body)
            console.log("Title: ", data.Title)
            console.log("Release Date: ", data.Year)
            console.log("IMDB Rating: ", data.imdbRating)
            console.log("Rotten Tomatoes Rating: ", data.Ratings[1].Value)
            console.log("Country: ", data.Country)
            console.log("Language: ", data.Language)
            console.log("Plot: ", data.Plot)
            console.log("Actors: ", data.Actors)

        } else console.log(error)
    });
}
if (argument === "movie-this") {
    request.get('http://www.omdbapi.com/?t=Mr. Nobody&apikey=' + omdbKey, function (error, response, body) {
        if (!error) {
            let data = JSON.parse(body)
            console.log("Title: ", data.Title)
            console.log("Release Date: ", data.Year)
            console.log("IMDB Rating: ", data.imdbRating)
            console.log("Rotten Tomatoes Rating: ", data.Ratings[1].Value)
            console.log("Country: ", data.Country)
            console.log("Language: ", data.Language)
            console.log("Plot: ", data.Plot)
            console.log("Actors: ", data.Actors)

        } else console.log(error)
    });

}

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
    client.post('statuses/update', {
        status: title
    }, function (error, tweet, response) {
        if (!error) {
            console.log(tweet);
        }
    });

if (argument === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        spotify.search({
            type: 'track',
            query: dataArr[1],
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
      
      
      });
    }
   

 