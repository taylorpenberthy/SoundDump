# SoundDump

SoundDump is a music-sharing fullstack application that was built using Express.js, Handlebars, and Mongoose.  It allows users to upload their favorite songs with captions! SoundDump also includes a search feature so users can search for their favorite songs via Spotify.  

## Interface

![preview](sounddump.png)

## List of Features

- Users can view the most recent posts from other users on the Home page
- Users can view individual posts by clicking on their titles
- Users can view individual profiles by clicking on the post, then the user
- Users can post new songs via a "new post" page
- Users can edit or delete any of their posts
- Users can search Spotify's database to grab a song link and listen to a preview

## Technologies Used

- Express
    - Utilized express to handle requests from users, sava data to SoundDump's database, and process the data
    - Implemented HTTP methods using both Express and JavaScript
- Handlebars
    - Used Handlebars as middleware to build different pages and display JSON data in a user-friendly, presentable way 
- Mongoose 
    - Used mongoose to create schemas to make it easier to interact with MongoDB within SoundDump 
    - Created post and user models to organize data
- Spotify Web API 
    - Requested data from the Spotify Web API to allow users to search for tracks

## Approach Taken

I initially had the idea of making an Instagram-like song sharing interface, when I found myself asking my friends for song recommendations!  I began by creating posts with embedded links to songs, as well as user-curated titles and captions.  Once I had that functionality working, I made it so the user could delete and edit their posts.  In the process, I realized that many people wouldn't even know where to begin with finding a song to post! So, I figured out how to use the Spotify Web API to retrieve data about songs.  I used specific data from the Spotify Web API, including the song title, artist, a :30 second preview, as well as a link to the song on Spotify.

## Installation Instructions

- View this site to open the app: https://sounddump.herokuapp.com/posts
- To post a song with an embedded link, click on a song in spotify, press share, and copy and paste the "embed" link!
- To see the developer side of things, fork and clone this repo.  Then, make sure you have all of the dependencies installed, and open the project in your favorite text editor!

## Unsolved Problems / Future Directions

- I would like to have the ability to search for a song directly in the "new post" page
- I would like to make it easier for a user to post a song without the embedded link.
