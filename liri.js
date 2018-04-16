require("dotenv").config();



var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var request = require('request');

var fs = require("fs");

var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});

var spotify = new Spotify(keys.spotify);

var client = new Twitter(keys.twitter);
({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});



//Setting the parameters to equal the Twitter username we are retrieving tweets from
var params = { screen_name: 'HanchoEschobar' };

var command = process.argv[2];

// Take in the command line arguments
var nodeArgs = process.argv;

// Create an empty string for holding the address
var name = "";

// Capture all the words in the address (again ignoring the first two Node arguments)
for (var i = 3; i < nodeArgs.length; i++) {
    if (i === 3) {
        name = nodeArgs[i];
    } else {
        name = name + "+" + nodeArgs[i];
    }
}


if (command === "my-tweets") {
    //Send a request to the Twitter API
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        // loop to organize tweets
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
        }
    });
}


if (command === "spotify-this-song") {
    if (!name) {
        name = "The+Sign"
    }

    spotify.request('https://api.spotify.com/v1/search?q=track:' + name + '&type=track')
        .then(function (data) {
            console.log("\nSong: " + JSON.stringify(data.tracks.items[0].name, null, 2));
            console.log("Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
            console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));
            console.log("Spotify Link: " + JSON.stringify(data.tracks.items[0].artists[0].external_urls.spotify, null, 2));

        })

        .catch(function (err) {
            console.error('Error occurred: ' + err);
        });

}


if (command === "movie-this") {
    if (!name) {
        name = "Mr.+Nobody";
    }
    request("http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        //   for (var i = 0; body.length; i++) 
        if (!error && response.statusCode === 200) {
            console.log("Title:" + " " + JSON.parse(body).Title);
            console.log("Year:" + " " + JSON.parse(body).Year);
            console.log("Imdb Rating:" + " " + JSON.parse(body).imdbRating);

            // console.log("Rotten tomatoes Rating:" + " " + JSON.parse(body).title.ratings);
            console.log("Language:" + " " + JSON.parse(body).Language);
            console.log("Country:" + " " + JSON.parse(body).Country);
            console.log("Plot:" + " " + JSON.parse(body).Plot);
            console.log("Country:" + " " + JSON.parse(body).Language);
            console.log("Actors:" + " " + JSON.parse(body).Actors);


            // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            //console.log('body:', body); // Print the HTML for the homepage.
            //console.log("\ntitle:" + body.text[i]);
        }
    });




}

if (command === "do-what-it-says") {


    fs.readFile('random.txt', function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log(data.toString());
    });
}


// }




