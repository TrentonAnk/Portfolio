require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs")
var keys = require("./keys.js");
require("dotenv").config();
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
// console.log(keys.spotify)
// console.log(keys.twitter)



var args = process.argv;
var song = "";
var command = process.argv[2];
switch (command) {
    case "spotify":
        runSpotify();
        break;
    case "omdb":
        runOmdb();
        break;
    case "twitter":
        runTwitter();
        break;
    default:
        console.log("try again")

}

function runSpotify() {
    console.log("This ran")
    for (var i = 3; i < args.length; i++) {
        if (i > 3 && i < args.length) {
            song = song + "+" + args[i];
            // artist = artist + "+" + args[i++]
        }
        else {
            song += args[i];
            // artist += args[i]
        }
    }

    spotify.search({ type: "track", query: song }, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }
        var songInfo = data.tracks.items;
        console.log("Artist: " + songInfo[0].artists[0].name);
        console.log("Song Name: " + songInfo[0].name);
        console.log("Album: " + songInfo[0].album.name)
        
    });
    logger("spotify was run on: " + song + "\n")
}
function runOmdb() {
    var nodeArgs = process.argv;
    var movieName = "";
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < args.length) {
            movieName = movieName + "+" + nodeArgs[i];
        }
        else {
            movieName += nodeArgs[i];
        }
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("Actors:" + JSON.parse(body).Actors);
            console.log("Rating:" + JSON.parse(body).imdbRating);
        }
        logger("Omdb was run on:" + movieName + "\n")
    });
}
function runTwitter() {
    var params = { screen_name: "realDonaldTrump" };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log("Tweet: " + "'" + tweets[i].text + "'" + " Created At: " + tweets[i].created_at);
            }
        } else {
            console.log(error);
        }
    });
    logger("twitter was run on:" + params.screen_name + "\n")
}

function logger(log) {
    fs.appendFile("log.txt", log, function(err) {
        if (err) { 
            console.log(err) 
        }
    })}
