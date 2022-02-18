require('dotenv/config');
const db = require('./db');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const app = express();

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.use(staticMiddleware);

app.get('/api/my-canvas-pins', (req, res, next) => {
  const userId = 1; // will need to update this after authentication

  const sql = `
  select
    "postId", "title", "artistName", "artPhotoUrl", "reported", "userId"
  from
    "posts"
  where "userId" = $1;
  `;

  const params = [userId];

  db.query(sql, params)
    .then(response => {
      res.json(response.rows);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
