require('dotenv/config');
const db = require('./db');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');
const argon2 = require('argon2');
const app = express();

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.use(staticMiddleware);

/* Get My Canvas pins from 'posts' table with associated pin data from
'savedPosts' table: */
app.get('/api/my-canvas-pins', (req, res, next) => {
  const userId = 1; // will need to update this after authentication
  if (!userId || userId < 0) {
    throw new ClientError(400, 'postId must be a positive integer');
  }

  const sql = `
    select
      "p"."postId",
      "p"."title",
      "p"."artistName",
      "p"."artPhotoUrl",
      "p"."reported",
      "p"."userId",
      "sp"."createdAt" as "saved",
      "sp"."userId" as "saver"
    from "posts" as "p"
    left join "savedPosts" as "sp" using ("postId")
    where "p"."userId" = $1
      and "p"."deleted" is NULL
    order by "p"."createdAt" DESC, "postId" DESC;
  `;

  const params = [userId];
  db.query(sql, params)
    .then(response => {
      res.json(response.rows);
    })
    .catch(err => next(err));
});

/* Get all pins from 'posts' table and associated user data from 'users' and
'savedPosts' tables for home feed: */
app.get('/api/home-feed', (req, res, next) => {
  const sql = `
    select
      "p"."postId",
      "p"."title",
      "p"."artistName",
      "p"."artPhotoUrl",
      "p"."reported",
      "p"."userId",
      "p"."lat",
      "p"."lng",
      "u"."userName",
      "u"."photoUrl",
      "sp"."createdAt" as "saved",
      "sp"."userId" as "saver"
    from "posts" as "p"
    join "users" as "u" using ("userId")
    left join "savedPosts" as "sp" using ("postId")
    where "p"."deleted" is NULL
    order by "p"."createdAt" DESC, "p"."postId" DESC;
   `;

  db.query(sql)
    .then(response => {
      res.json(response.rows);
    })
    .catch(err => next(err));
});

/* Get a specific pin from 'posts' table and associated user data from 'users'
and 'savedPosts' tables for 'PinPage': */
app.get('/api/pins/:postId', (req, res, next) => {
  const postId = Number(req.params.postId);
  if (!postId || postId < 0) {
    throw new ClientError(400, 'postId must be a positive integer');
  }

  const sql = `
    select
      "p".*,
      "u"."userName",
      "u"."photoUrl",
      "sp"."createdAt" as "saved",
      "sp"."userId" as "saver"
    from "posts" as "p"
    join "users" as "u" using ("userId")
    left join "savedPosts" as "sp" using ("postId")
    where "p"."postId" = $1
     and "p"."deleted" is NULL;
   `;

  const params = [postId];
  db.query(sql, params)
    .then(response => {
      if (!response.rows[0]) {
        throw new ClientError(
          404,
          `This isn't the pin you're looking for... no, really, there is no pin with a postId of ${postId}.`
        );
      }
      res.json(response.rows[0]);
    })
    .catch(err => next(err));
});

/* Get all saved posts from 'savedPosts' table and the associated pin data
for the specified userId (saver): */
app.get('/api/saved-pins', (req, res, next) => {
  const userId = 1; // will need to update this after authentication
  if (!userId || userId < 0) {
    throw new ClientError(400, 'postId must be a positive integer');
  }

  const sql = `
    select
      "p"."postId",
      "sp"."createdAt" as "savedTime",
      "sp"."userId" as "saver",
      "p"."title",
      "p"."artistName",
      "p"."artPhotoUrl",
      "p"."reported",
      "p"."userId" as "poster",
      "p"."lat",
      "p"."lng",
      "u"."userName",
      "u"."photoUrl"
      from "posts" as "p"
      join "users" as "u" using("userId")
      join "savedPosts" as "sp" using ("postId")
      where "p"."deleted" is NULL
        and "sp"."userId" = $1
      order by "sp"."createdAt" DESC, "sp"."postId" DESC;
  `;

  const params = [userId];
  db.query(sql, params)
    .then(response => {
      res.json(response.rows);
    })
    .catch(err => next(err));
});

// Post new pin to to 'posts' table:
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
    returning *;
  `;

  const params = [title, artist, url, info, lat, lng, userId];
  db.query(sql, params)
    .then(response => {
      const [pin] = response.rows;
      res.status(201).json(pin);
    })
    .catch(err => next(err));
});

// Add pin to saved posts:
app.post('/api/save-post/:postId', (req, res, next) => {
  const postId = Number(req.params.postId);
  const userId = 1; // will need to update this after authentication

  if (!postId || postId < 0 || isNaN(postId)) {
    throw new ClientError(400, 'postId must be a positive integer');
  }
  if (!userId || userId < 0 || isNaN(userId)) {
    throw new ClientError(400, 'invalid userId');
  }

  const sql = `
    insert into "savedPosts" ("postId", "userId")
      select $1, $2
    where exists (select 1 from "posts" where "postId" = $1 )
    returning *;
  `;

  const params = [postId, userId];
  db.query(sql, params)
    .then(response => {
      if (!response.rows[0]) {
        throw new ClientError(
          404,
          `This isn't the pin you're looking for... no, really, there is no pin with a postId of ${postId}.`
        );
      }
      const [saved] = response.rows;
      res.status(201).json(saved);
    })
    .catch(err => next(err));
});

// Add new user to 'users' table:
app.post('/api/auth/sign-up', (req, res, next) => {
  const { first, last, email, username, password } = req.body;

  if (!first) {
    throw new ClientError(400, 'first name is a required field');
  }
  if (!last) {
    throw new ClientError(400, 'last name is a required field');
  }
  if (!email || /@/.test(email) === false) {
    throw new ClientError(400, 'a valid email address is a required field');
  }
  if (!password) {
    throw new ClientError(400, 'password is a required field');
  }
  if (!username) {
    throw new ClientError(400, 'username is a required field');
  }
  if (password.length < 6 || /\d/.test(password) === false) {
    throw new ClientError(400, 'password must include at least six characters and one number');
  }

  const url = 'https://pbs.twimg.com/profile_images/1237550450/mstom.jpg';

  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
          insert into "users" ("firstName", "lastName", "email", "userName", "photoUrl", "hashedPassword")
            values ($1, $2, $3, $4, $5, $6)
          returning "userId", "userName", "createdAt";
        `;
      const params = [first, last, email, username, url, hashedPassword];
      return db.query(sql, params);
    })
    .then(response => {
      const [user] = response.rows;
      res.status(201).json(user);
    })
    .catch(err => {
      if (err.code === '23505' && err.detail.includes('email')) {
        return next(new ClientError(400, 'Sorry, that email already exists'));
      }
      if (err.code === '23505' && err.detail.includes('userName')) {
        return next(new ClientError(400, 'Sorry, that username already exists'));
      }
      next(err);
    });
});

// Update a post pin in posts table
app.patch('/api/pins/:postId', uploadsMiddleware, (req, res, next) => {
  const postId = Number(req.params.postId);
  const { title, artist, info, lat, lng } = req.body;

  if (!postId || postId < 0) {
    throw new ClientError(400, 'postId must be a positive integer');
  }
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

  // Check to see if the image was updated, if not, set 'url' to null:
  let url;
  if ('file' in req) {
    url = `/images/${req.file.filename}`;
  } else {
    url = null;
  }

  const sql = `
    update "posts"
      set "title" = $2,
        "reported" = false,
        "artistName" = $3,
        "comment" = $4,
        "lat" = $5,
        "lng" = $6
        ${url ? ',"artPhotoUrl" = $7' : ''}
      where "postId" = $1
      and "deleted" is NULL
    returning *;
  `;

  const params = [postId, title, artist, info, lat, lng];
  if (url !== null) params.push(url);
  db.query(sql, params)
    .then(response => {
      const [pin] = response.rows;
      if (!pin) {
        throw new ClientError(
          404,
          `This isn't the pin you're looking for... no, really, there is no pin with a postId of ${postId}.`
        );
      }
      res.json(pin);
    })
    .catch(err => next(err));
});

// Mark a pin as deleted:
app.patch('/api/delete-pin/:postId', (req, res, next) => {
  const postId = Number(req.params.postId);
  if (!postId || postId < 0) {
    throw new ClientError(400, 'postId must be a positive integer');
  }

  const sql = `
    update "posts"
      set "deleted" = now()
      where "postId" = $1
    returning "deleted";
  `;

  const params = [postId];
  db.query(sql, params)
    .then(response => {
      const [deleted] = response.rows;
      if (!deleted) {
        throw new ClientError(
          404,
          `This isn't the pin you're looking for... no, really, there is no pin with a postId of ${postId}.`
        );
      }
      res.json(deleted);
    })
    .catch(err => next(err));
});

// Report a post as removed from view:
app.patch('/api/report/:postId', (req, res, next) => {
  const postId = Number(req.params.postId);
  if (!postId || postId < 0) {
    throw new ClientError(400, 'postId must be a positive integer');
  }

  const sql = `
    update "posts"
      set "reported" = true
      where "postId" = $1
    returning "reported";
  `;

  const params = [postId];
  db.query(sql, params)
    .then(response => {
      const [reported] = response.rows;
      if (!reported) {
        throw new ClientError(
          404,
            `This isn't the pin you're looking for... no, really, there is no pin with a postId of ${postId}.`
        );
      }
      res.json(reported);
    })
    .catch(err => next(err));
});

// Delete a saved pin from the saved table:
app.delete('/api/delete-saved/:postId', (req, res, next) => {
  const userId = 1; // will need to update this after authentication
  const postId = Number(req.params.postId);
  if (!postId || postId < 0 || isNaN(postId)) {
    throw new ClientError(400, 'postId must be a positive integer');
  }

  const sql = `
  delete from "savedPosts"
    where "postId" = $1
    and "userId" = $2
  returning *;
  `;

  const params = [postId, userId];
  db.query(sql, params)
    .then(response => {
      const [deleted] = response.rows;
      if (!deleted) {
        throw new ClientError(
          404,
          `This isn't the pin you're looking for... no, really, you haven't saved a post with a postId of ${postId}.`
        );
      }
      res.sendStatus(204);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
