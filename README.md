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

## Application Preview

**Desktop** | Signing in as guest user, 'DemoDane', and creating a City Canvas Pin:

![Signing in as guest user 'Demo Dane' and creating a new City Canvas Pin](server\public\city-canvas-images\assets\readme-1.gif)


**Mobile** | Using the 'Art Finder' page map to find street art near targeted location and adding a Pin to the 'My Saved City Canvas' page:

![Using the 'Art Finder' page map to find street art near targeted location and adding pin to 'My Saved City Canvas' page](server\public\city-canvas-images\assets\readme-2.gif)

## Features

- User can create a profile and sign in to the application with a password
- User can create a post, referred to as a City Canvas Pin, sharing details of street art they created or encountered, including:
  - an image
  - the artist's name
  - artwork details, description, user's experience, etc.
- User can add the location of the artwork in their City Canvas Pin post by dropping a pin on a Google Map on the New City Canvas Pin form using the geolocation target button or the map's zoom feature
- User can access the City Canvas Pins they've created on the 'My City Canvas' page and update their Pins via an update form
- User can delete the City Canvas Pins they've created
- User can view previews of all City Canvas Pin posts sorted by creation date and time on the 'Home' page feed
- User can view City Canvas Pins with complete information and location on a dedicated Pin page
- User can view the pinned location of another user's City Canvas Pin on the Pin's map page
- User can get directions to any City Canvas Pin on the Pin's map page, linked on the dedicated Pin page
- User can mark another user's City Canvas Pin as removed from view if the described street art is not at the pinned location
- User can view if any City Canvas Pin is marked as removed from view on the Pin preview in the 'Home' page feed and the Pin's dedicated Pin page
- User can view if another user marked their City Canvas Pin as removed from view on the Pin's preview in the 'Home' page feed and the 'My City Canvas' page, on the Pin's dedicated Pin page, and the user will be alerted via a modal on the Pin's update form
- User can save City Canvas Pins to their personal 'My Saved City Canvas' page from the Pin's dedicated Pin page for viewing later or as a list of favorites
- User can view saved City Canvas Pins on the 'My Saved City Canvas' page
- User can remove saved City Canvas Pins from their personal 'My Saved City Canvas' page feed from the Pin's dedicated Pin page
- User can view City Canvas Pins near them on the 'Art Finder' page map using the geolocation target button or by using the map's zoom feature

## Additional Stretch Features Planned

- User can search for City Canvas Pins near a zip code or street address on the 'Art Finder' page map
- User can view another user's profile page showcasing that user's City Canvas Pins

## System Requirements

- Node.js 16 or higher
- npm 8 or higher
- PostgreSQL 12 or higher
