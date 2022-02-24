require('dotenv/config');
const db = require('./db');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');

const app = express();

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.use(staticMiddleware);

// Get My Canvas Pins from Posts Database:
app.get('/api/my-canvas-pins', (req, res, next) => {
  const userId = 1; // will need to update this after authentication

  const sql = `
    select
      "postId", "title", "artistName", "artPhotoUrl", "reported", "userId"
    from
      "posts"
    where "userId" = $1
    order by "createdAt" DESC;
  `;

  const params = [userId];

  db.query(sql, params)
    .then(response => {
      res.json(response.rows);
    })
    .catch(err => next(err));
});

// Get all pins from 'posts' table and associated user data from 'users' table for home feed:
app.get('/api/home-feed', (req, res, next) => {
  const sql = `
    select
      "p"."postId",
      "p"."title",
      "p"."artistName",
      "p"."artPhotoUrl",
      "p"."reported",
      "p"."userId",
      "u"."userName",
      "u"."photoUrl"
    from "posts" as "p"
    join "users" as "u" using ("userId")
    order by "p"."createdAt" DESC;
   `;

  db.query(sql)
    .then(response => {
      res.json(response.rows);
    })
    .catch(err => next(err));
});

// Post new pin to to 'Posts' table:
app.post('/api/post-pin', uploadsMiddleware, (req, res, next) => {
  const { title, artist, info, lat, lng } = req.body;

  if (!title) {
    throw new ClientError(400, 'title is a required field');
  }
  if (!artist) {
    throw new ClientError(400, 'artist is a required field');
  }
  if (!info) {
    throw new ClientError(400, 'info is a required field');
  }
  if (!lat || !lng) {
    throw new ClientError(400, 'lat and lng are required fields');
  }

  const url = `/images/${req.file.filename}`;
  const userId = 1; // will need to update this after authentication

  const sql = `
    insert into "posts" ("title", "artistName", "artPhotoUrl", "comment", "lat", "lng", "userId")
      values ($1, $2, $3, $4, $5, $6, $7)
    returning *
  `;
  const params = [title, artist, url, info, lat, lng, userId];
  db.query(sql, params)
    .then(response => {
      const [pin] = response.rows;
      res.status(201).json(pin);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
