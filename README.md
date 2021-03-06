# liri-node #
## LIRI Spotify Bot ##

This app is like iPhone's SIRI, but LIRI is a Language Interpretation and Recognition Interface.
It is a command line node app that takes in user parameters and gives back data 

In order to clone this on your machine and have it run properly, you need to supply your own .env file with spotify keys

### LIRI is able to handle 4 basic commands: 
**concert-this**
**spotify-this-song**
**movie-this**
**do-what-it-says**

For concert-this, spotify-this-song, and movie-this, no other input is needed in the first line.
After typing one of those commands, a prompt will pop up to further guide the user.

### Breakdown of commands:
**concert-this** 
  concert-this is designed to allow a user to search for an Artist and get back data about their upcoming concerts
  
  To begin, the user types in **node liri.js concert-this**
  
  The terminal will return back "What Artist would you like to see?"
  
  The user then types in **Artist Name** and the results are displayed.
  
  If there are no upcoming shows, the terminal says there is no information for that artist.
  
  **Please refer to the pictures in each section for more help.**
  ![concert-this with info](https://raw.githubusercontent.com/KevMart93/liri-node/master/concert-this.png)
  ![concert-this-without-info](https://raw.githubusercontent.com/KevMart93/liri-node/master/ct-no-info.png)
  
  
  
**spotify-this-song**
  spotify-this-song lets the user search for a song and get back information about that song.
  
  To begin, the user types in **node liri.js spotify-this-song**
  
  The terminal will return back "What song would you like to play?"
  
  The user then types in **Song Name** and the result is displayed.
  
  Info includes artist, track, and album name, as well as a link to a song preview on Spotify
  ![spotify-this multiple examples](https://raw.githubusercontent.com/KevMart93/liri-node/master/spotify-this-song.png)



**movie-this**
  movie-this lets the user search for a movie and get back information about that movie.
  
  To begin, the user types in **node liri.js movie-this**
  
  The terminal will return back "What movie would you like to view?"
  
  The user then types in **Movie Name** and the resulting info is displayed.
  
  Info includes title, release year, IMDB and Rotten Tomatoes rating, country of production, language, plot and actors of the movie
  ![movie-this](https://raw.githubusercontent.com/KevMart93/liri-node/master/movie-this.png)



**do-what-it-says**
  do-what-it-says pulls up the txt file
  ![do-what-it-says](https://github.com/KevMart93/liri-node/blob/master/do-what-it-says.png?raw=true)
