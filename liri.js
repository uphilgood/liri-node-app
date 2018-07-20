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

omdb = (search, key) => {
    request.get('http://www.omdbapi.com/?t=' + search + '&apikey=' + key, function (error, response, body) {
        if (!error) {
            let data = JSON.parse(body)
            console.log("Title: " + data.Title + "\nRelease Date:: " + data.Year+
            "\nIMDB Rating: " + data.imdbRating + "\nRotten Tomatoes Rating: " + data.Ratings[1].Value + "\nCountry: " + data.Country 
            + "\nLanguage: " + data.Language + "\nPlot: " + data.Plot + "\nActors: " + data.Actors);
            append(data.Title)
            append(data.Year)
            append(data.imdbRating)
            append(data.Ratings[1].Value )
            append(data.Country)
            append(data.Language)
            append(data.Plot)
            append(data.Actors)
        } else console.log(error)
    });
}

getTweets = params => {
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            tweets.forEach(tweet => {
                console.log(tweet.text + tweet.created_at)
                append(tweet.text + tweet.created_at)
            }
            );
        }
    });
}

searchTrack = title => {
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
            console.log("Name: " + song.artists[0].name + "\nSong Name: " + song.name +
            "\nSong URL: " + song.artists[0].external_urls.spotify + "\nAlbum Name: " + song.album.name);
            append(song.artists[0].name)
            append(song.name)
            append(song.artists[0].external_urls.spotify)
            append(song.album.name)
        })
    });
}

postTweet = message => {
    client.post('statuses/update', {
        status: message
    }, function (error, tweet, response) {
        if (!error) {
            append(tweet.text);
        }
    });
}

randomFile = () => {
    fs.readFile("random.txt", "utf8", function (error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        // Then split it by commas (to make it more readable)
        let dataArr = data.split(",");
       searchTrack(dataArr[1])
    });
}

append = (arg) => {
    fs.appendFile("log.txt", "\n" + arg, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

if (argument === "movie-this" && title) {
    omdb(title, omdbKey)
} else if (argument === "movie-this") {
    omdb("Mr. Nobody", omdbKey)

}

if (argument === "spotify-this-song") {
    searchTrack(title);
} 

if (argument === "my-tweets") {
    getTweets(params);
}

if (argument === "tweet") {
    postTweet(title);
}

if (argument === "do-what-it-says") {
    randomFile();
}

