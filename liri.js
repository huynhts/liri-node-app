//requires the dotenv package to read and set environment variables
require("dotenv").config();

// import key.js file and store into variable
var keys = require("./keys.js");


var liriCommand = process.argv[2];
var liriSearch = process.argv[3];
//add switch case function for node commands:
switch (liriCommand) {
    case 'concert-this':
        //add function to search artist/band name; pass it liriSearch variable
        break;
    case 'spotify-this-song':
        spotifyTime();
        //add function to search song names; pass it liriSearch variable
        break;
    case 'movie-this':
        movieTime();
        //add function to search movie title; pass it liriSearch variable
        break;
    case 'do-what-it-says':
        //add function to read cmd from text
        break;
    default: 
        console.log('Sorry, that command is not available at this time. Please try another command.');
};



//function that looks up movies and prints information on CML
function movieTime () {
    var axios = require('axios');
    var movieName = liriSearch;
    var url = `http://www.omdbapi.com/?t=${ movieName }&y=&plot=short&apikey=trilogy`;
        axios.get(url).then(function(response) {
            if (err) {
                return console.log('Error occurred: ' + err);
                } else {
                    console.log(
                        "Movie Title: " + response.data.Title +
                        "\n Release Year: " + response.data.Year +
                        "\n IMDB Rating: " + response.data.imdbRating +
                        "\n Production Country: " + response.data.Country +
                        "\n Language: " + response.data.Language +
                        "\n Plot: " + response.data.Plot + 
                        "\n Actors/Actresses: " + response.data.Actors
                    );
                };
        });
};

function spotifyTime () {
    var Spotify = require('node-spotify-api');

    // access spotify key
    var spotifyKey = new Spotify(keys.spotify);
    var songName = liriSearch;

    spotifyKey.search({ type: 'track', query: songName, limit: 10 })
    .then(function(response) {
        for (i = 0; i < response.tracks.items.length; i++)
        console.log(response.tracks.items[i].album[i]);
        console.log(response.tracks.items[i].artists[i]);

    })
    .catch(function(err) {
      console.log(err);
    });
}