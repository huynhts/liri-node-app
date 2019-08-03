//requires the dotenv package to read and set environment variables
require("dotenv").config();

// import key.js file and store into variable
var keys = require("./keys.js");
var colors = require('colors');
var ranTxt = require('fs');


var liriCommand = process.argv[2];
var liriSearch = process.argv[3];
//add switch case function for node commands:
switch (liriCommand) {
    case 'concert-this':
        concertTime();
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
        randomCommand();
        //add function to read cmd from text
        break;
    default: 
        console.log('Sorry, that command is not available at this time. Please try another command.');
};

//function that looks up concerts and prints information on CML
function concertTime () {
    var axios = require('axios');
    var artist = liriSearch;
    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        axios.get(url).then(function(response) {
            console.log(response);
            //     "Movie Title: ".bold.green + response.data.Title +
            //     + "\n Release Year: ".bold.green + response.data.Year 
            //     + "\n IMDB Rating: ".bold.green + response.data.imdbRating 
            //     + "\n Production Country: ".bold.green + response.data.Country 
            //     + "\n Language: ".bold.green + response.data.Language 
            //     + "\n Plot: ".bold.green + response.data.Plot 
            //     + "\n Actors/Actresses: ".bold.green + response.data.Actors
            // );
        });
};

//function that looks up movies and prints information on CML
function movieTime () {
    var axios = require('axios');
    var movieName = liriSearch;
    var url = `http://www.omdbapi.com/?t=${ movieName }&y=&plot=short&apikey=trilogy`;
        axios.get(url).then(function(response) {
            console.log(
                "Movie Title: ".bold.green + response.data.Title +
                + "\n Release Year: ".bold.green + response.data.Year 
                + "\n IMDB Rating: ".bold.green + response.data.imdbRating 
                + "\n Production Country: ".bold.green + response.data.Country 
                + "\n Language: ".bold.green + response.data.Language 
                + "\n Plot: ".bold.green + response.data.Plot 
                + "\n Actors/Actresses: ".bold.green + response.data.Actors
            );
        });
};

function spotifyTime () {
    //log artist, song name, preview link from spotify, and album of song

    var Spotify = require('node-spotify-api');

    // access spotify key
    var spotifyKey = new Spotify(keys.spotify);
    var songName = liriSearch;

    if (!liriSearch) {
        songName = "The Sign";
    } else {
        songName = liriSearch;
    };


    spotifyKey.search({ type: 'track', query: songName, limit: 10})
    .then(function(response) {
        var spotifyResults = response.tracks.items;
        var count = 1;
        for (i=0; i < spotifyResults.length; i++){
            var totArtists = [];
            Object.values(response.tracks.items[i].artists).forEach((value) => {
                trackArtist = value.name;
                totArtists.push(trackArtist);
            });
            console.log("------Result #" + count + "------" + "\n" 
                + "Track: ".bold.blue + response.tracks.items[i].name
                + "\nTrack Artists: ".bold.blue + totArtists 
                + "\nAlbum: ".bold.blue + response.tracks.items[i].album.name
            );
            if (response.tracks.items[i].preview_url == null){
                console.log("Sorry track preview is not available!".bold.blue.underline + "\n")
            } else {
                console.log("Preview URL: ".bold.blue + response.tracks.items[i].preview_url + "\n");   
            };

            count++;
        }
    })
    .catch(function(err) {
      console.log(err);
    });
}

function randomCommand (){
    ranTxt.readFile('random.txt', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        
        var ranCmd = [];
        var input = data.split(',');
        for (i=0; i<input.length; i++){
            ranCmd.push(input[i])
        };

        var liriCommand = ranCmd[0];
        var liriSearch = ranCmd[1];

        console.log('I think it worked? ' + liriCommand + " " + liriSearch);

        if(liriCommand === 'concert-this'){
            concertTime(liriSearch);
        } else if (liriCommand === 'spotify-this-song'){
            spotifyTime(liriSearch);
        } else if (liriCommand === 'movie-this') {
            movieTime(liriSearch);
        };
        

    });
};