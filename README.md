# city-canvas

A full stack web application for street art enthusiasts who want to locate, share, and save street art in their city and beyond.

## Why City Canvas Was Built

City Canvas fills a void in the art-based image sharing social media realm. After spending too much time enduring the frustrations of searching social media platforms for street art and publicly accessible art installations near me, the idea of creating a web application for the specific purpose of sharing and locating street art was born. City Canvas serves this purpose without all the other distractions of alternative social media platforms.

## Technologies Used

- React.js
- JavaScript ES6
- Webpack
- Node.js
- Express
- PostgreSQL
- HTML5
- CSS3
- [Bootstrap 5](https://getbootstrap.com/docs/5.1/getting-started/introduction/ "Bootstrap Documentation")
- [React Bootstrap](https://react-bootstrap.github.io/getting-started/introduction/ "React Bootstrap Documentation")
- [React Google Maps API](https://react-google-maps-api-docs.netlify.app/ "React Google Maps API Documentation")
- [AWS Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html "Getting started with Amazon S3 Documentation")
- [AWS SDK for JavaScript S3 Client v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/index.html "AWS SDK for JavaScript S3 Client Documentation")
- [Multer](https://github.com/expressjs/multer#readme "Multer Documentation")
- [sharp](https://sharp.pixelplumbing.com/ "sharp Documentation")
- [Argon2](https://github.com/ranisalt/node-argon2#readme "Argon2 Documentation")
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme "jsonwebtoken Documentation")
- [Dokku](https://dokku.com/docs/getting-started/installation/ "Dokku Documentation")

## Live Application

Try City Canvas live at [https://city-canvas.laveirge.dev](https://city-canvas.laveirge.dev "City Canvas"). Click on the 'Sign In as Guest User' button to login in as a demo user with the username 'DemoDane.'

## Application Preview

**Desktop** | Signing in as guest user, 'DemoDane', and creating a City Canvas Pin:

![Signing in as guest user 'Demo Dane' and creating a new City Canvas Pin](server/public/city-canvas-images/assets/readme-1.gif)


**Mobile** | Using the 'Art Finder' page map to find street art near targeted location and adding a Pin to the 'My Saved City Canvas' page:

![Using the 'Art Finder' page map to find street art near targeted location and adding pin to 'My Saved City Canvas' page](server/public/city-canvas-images/assets/readme-2.gif)

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
- User can view if any City Canvas Pin is marked as removed from view on the Pin's preview in the 'Home' page feed and the Pin's dedicated Pin page
- User can view if another user marked their City Canvas Pin as removed from view on the Pin's preview in the 'Home' page feed, on the 'My City Canvas' page, on the Pin's dedicated Pin page, and the user will be alerted via a modal on the Pin's update form
- User can save City Canvas Pins to their personal 'My Saved City Canvas' page from the Pin's dedicated Pin page for viewing later or as a list of favorites
- User can view saved City Canvas Pins on the 'My Saved City Canvas' page
- User can remove saved City Canvas Pins from their personal 'My Saved City Canvas' page from the Pin's dedicated Pin page
- User can view City Canvas Pins near them on the 'Art Finder' page map using the geolocation target button or by using the map's zoom feature

## Additional Stretch Features Planned

- User can search for City Canvas Pins near a zip code or street address on the 'Art Finder' page map
- User can view another user's profile page showcasing that user's City Canvas Pins

## System Requirements

- Node.js 16 or higher
- npm 8 or higher
- PostgreSQL 12 or higher

## Getting Started

1. Clone the repository:

    ```shell
    git clone https://github.com/llaveirge/city-canvas
    cd city-canvas
    ```
2. Install all dependencies with npm:

    ```shell
    npm install
    ```

3. A Google Maps JavaScript API key is necessary for all map features. Follow the [Google Maps Platform Documentation](https://developers.google.com/maps/documentation/javascript/cloud-setup 'Google Maps Platform documentation') to set up a Google Cloud Project, enable the [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript "Maps JavaScript API documentation"), and [create an API key](https://developers.google.com/maps/documentation/javascript/get-api-key "Maps JavaScript API: Using API Keys Documentation").
   - Optional: Create a custom styled map to use on all map components following the [Google Maps Platform Maps Customization Guide](https://developers.google.com/maps/documentation/cloud-customization/overview#creating_map_styles "Maps Customization Guide for Cloud-based maps styling"). You will need to update the ` mapId` value of the `options` object on all map component files to render your custom map styling.

4. An Amazon S3 bucket is necessary to store images uploaded by users. Follow the [AWS Amazon S3 documentation](https://aws.amazon.com/s3/?nc2=h_ql_prod_fs_s3 "AWS Amazon S3 Documentation") to create an account and set up a bucket with public access to store user uploads. A Free Tier account will be adequate, but be sure to monitor on storage limitations.

5. Make sure `postgresql` is running:

    ```shell
      sudo service postgresql start
    ````

6. Create a database, username, and password, and grant permissions as necessary. May need to update firewall to allow access to the server, if appropriate. Replace `yourDatabaseName` below with the name of the database you created for the application:

    ```shell
    createdb yourDatabaseName
    ```

7. Create a copy of the '.env.example' file and save as your '.env' environment variables file and update the following information:
    - Update the `TOKEN_SECRET` value with a custom secret key to be used for signing the JSON Web Token.
    - Update the `DATABASE_URL` value with your database name and information to resemble the following: `postgres://{username}:{password}@localhost/{database-name}`.
    - Update the `REACT_APP_GOOGLE_MAPS_API_KEY` value with your Google Maps JavaScript API key.
    - Update the `AWS_S3_REGION` with your AWS S3 bucket region.
    - Update the `AWS_S3_BUCKET` with your AWS bucket name.
    - Update the `AWS_ACCESS_KEY_ID` value with your AWS S3 bucket access key ID.
    - Update the `AWS_SECRET_ACCESS_KEY` value with AWS S3 bucket access key.

8. Import the provided database schema and demo data using the follow script:
    ```shell
    npm run db:import
    ```

9. Start the application with the provided `dev` script:
    ```shell
    npm run dev
    ```

10. Open the application in your browser at  [http://127.0.0.1:3000](http://127.0.0.1:3000).

11. To successfully utilize the 'Guest User Login' feature, create a custom password using the the Argon2 implementation built into the application and update the `DEMO_LOGIN_PASSWORD` value in the '.env' environment variables file with the password. Next, replace the the hashed password string value for the user with username value 'DemoDane' in the 'users' table on the 'data.sql' file with the new hashed password string value. Then, reimport the demo data using the following script:

    ```shell
    npm run db:import
    ```
    :exclamation: If this step is skipped, this will result in an error when the 'Sign In as Guest' button is clicked on the 'sign-in-form' component. :exclamation:

-  Optionally, view your database with the [pgweb GUI tool](https://github.com/sosedoff/pgweb#pgweb "pgweb Documentation") for PostgreSQL. [Download pgweb](https://sosedoff.github.io/pgweb/ "Download pgweb") and execute the following script after the application is:
    ```shell
    pgweb --db=yourDatabaseName
    ```
    Then visit [http://localhost:8081](http://localhost:8081) to use the GUI.
