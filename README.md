# city-canvas

A full stack web application for street art enthusiasts who want to locate, share, and save street art in their city and beyond.

## Why City Canvas Was Built

City Canvas fills a void in the art-based image sharing social media realm. After spending too much time enduring the frustrations of searching social media platforms for street art and publicly accessible art installations near me, the idea of creating a web application for the specific purpose of sharing and locating street art was born. City Canvas serves this purpose without all the other distractions of alternative social media platforms.

## Technologies Used

- React.js
- JavaScript ES6
- HTML5
- CSS3
- [Bootstrap 5](https://getbootstrap.com/docs/5.1/getting-started/introduction/ "Bootstrap Documentation")
- [React Bootstrap](https://react-bootstrap.github.io/getting-started/introduction/ "React Bootstrap Documentation")
- Webpack
- Node.js
- Express
- PostgreSQL
- [AWS SDK for JavaScript S3 Client v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/index.html "AWS SDK for JavaScript S3 Client Documentation")
- [React Google Maps API](https://react-google-maps-api-docs.netlify.app/ "React Google Maps API Documentation")
- [Multer](https://github.com/expressjs/multer#readme "Multer Documentation")
- [sharp](https://sharp.pixelplumbing.com/ "sharp Documentation")
- [Argon2](https://github.com/ranisalt/node-argon2#readme "Argon2 Documentation")
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme "jsonwebtoken Documentation")
- [Dokku](https://dokku.com/docs/getting-started/installation/ "Dokku Documentation")

## Live Application

Try City Canvas live at [https://city-canvas.laveirge.dev](https://city-canvas.laveirge.dev "City Canvas"). Click on the "Sign In as Guest User" button to login in as a demo user with the username "DemoDane."


## Features

- User can create a profile and sign into the application
- User can create a post sharing details of street art they created or encountered, including:
  - image
  - artist name
  - artwork details/experience, etc.
- User can add the location of the artwork in their posts using React Google Maps API and geolocation
- User can access the posts they’ve created to update any information on the 'My Canvas' page via an update form
- User can delete the posts they’ve created
- User can view a feed of post previews sorted by date and time of posting with limited information from other users on the 'Home' page feed
- User can view other users’ posts with complete information and location on a dedicated post page
- User can view the map pin location of another user's post
- User can get directions to street art post map pin
- User can mark other users' posts as removed from view if street art is not at pinned location
- User can view if any post is marked as removed from view on the 'Home' page feed and the post's dedicated post page
- User can view if another user marked their post as removed from view on their post page, post preview, and on the post's update form
- User can save posts from other users to their personal 'My Saved City Canvas' page feed
- User can view saved posts on the 'My Saved City Canvas' page feed
- User can remove saved posts from their personal 'My Saved City Canvas' page feed
- User can view street art posts near them on the 'Art Finder' page map using geolocation or zoom function on the map
