// Dependencies
require("dotenv").config();

var inquirer = require('inquirer');
var moment = require('moment');
var axios = require('axios');
var request = require('request');
var fs = require('fs');

// Setting up Spotify
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);

// Functions for getting track/movie info
function trackName(artistName, songName, trackLink, albumName) {
    this.artistName = artistName;
    this.songName = songName;
    this.trackLink = trackLink;
    this.albumName = albumName;
    this.print = function () {
        console.log("Artist Name: ", artistName);
        console.log("Song Name: ", songName);
        console.log("Track Preview: ", trackLink);
        console.log("Album Name: ", albumName);
    }
}

function MovieInfo(title, year, iRating, tRating, countryProd, language, plot, actors) {
    this.title = title;
    this.year = year;
    this.iRating = iRating;
    this.tRating = tRating;
    this.countryProd = countryProd;
    this.language = language;
    this.plot = plot;
    this.actors = actors;
    this.print = function() {
        console.log("Title: ", title);
        console.log("Year Released: ", year);
        console.log("IMDB Rating: ", iRating);
        console.log("Rotten Tomatoes Rating: ", tRating);
        console.log("Countries Produced In: ", countryProd);
        console.log("Languages Supported: ", language);
        console.log("Plot Synopsis: ", plot);
        console.log("Actors: ", actors);
    }
}


// Defining user input and setting up if statements to loop through all app functions
let answer = '';
let userInput = process.argv.slice(2).join(" ");

if (userInput === "spotify-this-song") {
    SpotifyThisSong();
}
else if (userInput === "concert-this") {
    ConcertThis();
}
else if (userInput === "movie-this") {
    MovieThis();
}
else if (userInput === "do-what-it-says") {
    DoWhatItSays();
}
else {
    console.log("Please enter one of the valid commands given to you.");
}

// Functions to search for a song and display it to user
function SpotifyThisSong() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What song would you like to play?",
                name: "songName"
            }
        ]).then(function (input) {
            answer = input.songName;
            SongLookUp();
        });
}

// Break down song look up process into multiple functions
function SongLookUp() {
    spotify
        .search({ type: "track", query: answer})
        .then(function (response) {
            song = response.tracks.items[0].artists[0].name;
            artist = response.tracks.items[0].name;
            trackURL = response.tracks.items[0].external_urls.spotify;
            album = response.tracks.items[0].album.name;
            songdata = new trackName(song, artist, trackURL, album);
            songdata.print();
        })
        .catch(function (err) {
            console.log(err);
        });
}


// Function for running concert finder part
function ConcertThis() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What artist would you like to see?",
                name: "bandName"
            }
        ]).then(function (input) {
            answer = input.bandName.split(" ").join("+");
            console.log(answer);
            BandLookUp();
        });
}

// Breaking concert finder down into multiple functions
function BandLookUp() {
    axios.get("https://rest.bandsintown.com/artists/" + answer + "/events?app_id=codingbootcamp").then(
        function (response) {
            if(response.data.length <= 0) {
                console.log("No info for this artist")
            }
            else {
                for(var i=0; i < response.data.length; i++) {
                    var currentData = `\n
                Venue: ${response.data[i].venue.name}
                Location: ${response.data[i].venue.city + ", " + response.data[0].venue.region}
                Event Date: ${moment(response.data[i].datetime).format('LL')}
                    `
                    console.log(currentData)
                }
            }
            // print(currentData)
        }
    );
    }

// Process to capture user input and begin search for that movie's data
function MovieThis() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What movie would you like to view?",
                name: "movieName"
            }
        ]).then(function (input) {
            answer = input.movieName.split(" ").join("+");
            MovieLookUp();
        });
}

// Look for movie based on user's input
function MovieLookUp() {
    let movieURL = "http://www.omdbapi.com/?t=" + answer + "&y=&plot=short&apikey=trilogy"

    request(movieURL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let movieArray = JSON.parse(body);
            title = movieArray.Title;
            year = movieArray.Year;
            iRating = movieArray.Ratings[0].Value;
            tRating = movieArray.Ratings[1].Value;
            countryProd = movieArray.Country;
            language = movieArray.Language;
            plot = movieArray.Plot;
            actors = movieArray.Actors;
            moviedata = new MovieInfo(title, year, iRating, tRating, countryProd, language, plot, actors);
            moviedata.print();
        }
    });
}

// Function to read txt file 
function DoWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        answer = dataArr[1];

        if (dataArr[0] === "spotify-this-song") {
            SongLookUp();
        }
        else if (dataArr[0] === "concert-this") {
            BandLookUp();
        }
        else if (dataArr[0] === "movie-this") {
            MovieLookUp();
        }
        else {
            console.log("You have not selected a valid option, please check the txt file and try again.")
        }
    });
}