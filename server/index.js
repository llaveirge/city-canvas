require('dotenv/config');
const db = require('./db');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');
const sharp = require('sharp');
const path = require('path');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const app = express();

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.use(staticMiddleware);

/* Get My Canvas pins from 'posts' table with associated pin data from
'savedPosts' table: */
app.get('/api/my-canvas-pins/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  if (!userId || userId < 0) {
    throw new ClientError(400, 'a valid userId is required, please sign in or create an account');
  }

  const sql = `
    SELECT
      "p"."postId",
      "p"."title",
      "p"."artistName",
      "p"."artPhotoUrl",
      "p"."reported",
      "p"."userId",
      (
        SELECT
          "savedPosts"."createdAt"
        FROM "savedPosts"
        WHERE
          "savedPosts"."userId" = $1
          AND "p"."postId" = "savedPosts"."postId"
      ) AS "savedByCurrentUser"
    FROM "posts" AS "p"
    JOIN "users" AS "u" USING ("userId")
    WHERE
      "p"."userId" = $1
      AND "p"."deleted" is NULL
    ORDER BY "p"."createdAt" DESC, "postId" DESC;
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
app.get('/api/home-feed/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  if (!userId || userId < 0) {
    throw new ClientError(400, 'a valid userId is required, please sign in or create an account');
  }

  const sql = `
    SELECT
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
      (
        SELECT
          "savedPosts"."createdAt"
        FROM "savedPosts"
        WHERE
          "savedPosts"."userId" = $1
          AND "p"."postId" = "savedPosts"."postId"
      ) AS "savedByCurrentUser"
    FROM "posts" AS "p"
    JOIN "users" AS "u" USING ("userId")
    WHERE "p"."deleted" is NULL
    ORDER BY "p"."createdAt" DESC, "p"."postId" DESC;
  `;

  const params = [userId];
  db.query(sql, params)
    .then(response => {
      res.json(response.rows);
    })
    .catch(err => next(err));
});

/* Get all pins from 'posts' table and associate author user data to generate
and display markers on the 'ArtFinder' page */
app.get('/api/art-finder', (req, res, next) => {
  const sql = `
    SELECT
      "p"."postId",
      "p"."title",
      "p"."artistName",
      "p"."artPhotoUrl",
      "p"."reported",
      "p"."userId",
      "p"."lat",
      "p"."lng",
      "u"."userName",
      "u"."photoUrl"
    FROM "posts" AS "p"
    JOIN "users" AS "u" USING ("userId")
    WHERE "p"."deleted" is NULL
    ORDER BY "p"."createdAt" DESC, "p"."postId" DESC;
   `;

  db.query(sql)
    .then(response => {
      res.json(response.rows);
    })
    .catch(err => next(err));
});

/* Get a specific pin from 'posts' table, associated author user data from
'users' table, and current authorized user data from 'savedPosts' table for
'PinPage': */
app.get('/api/pins/:postId/:userId', (req, res, next) => {
  const postId = Number(req.params.postId);
  const userId = Number(req.params.userId);

  if (!postId || postId < 0) {
    throw new ClientError(400, 'postId must be a positive integer');
  }

  if (!userId || userId < 0) {
    throw new ClientError(400, 'a valid userId is required, please sign in or create an account');
  }

  const sql = `
    SELECT
      "p".*,
      "u"."userName",
      "u"."photoUrl",
      (
        SELECT
          "savedPosts"."createdAt"
        FROM "savedPosts"
        WHERE
          "savedPosts"."userId" = $2
          AND "savedPosts"."postId" = $1
      ) AS "savedByCurrentUser"
    FROM "posts" AS "p"
    JOIN "users" AS "u" USING ("userId")
    WHERE
      "p"."postId" = $1
      AND "p"."deleted" is NULL;
  `;

  const params = [postId, userId];
  db.query(sql, params)
    .then(response => {
      if (!response.rows[0]) {
        throw new ClientError(
          404,
          `This isn't the pin you're looking for... no, really, there is no pin with a postId of ${postId}. It may have been deleted.`
        );
      }
      res.json(response.rows[0]);
    })
    .catch(err => next(err));
});

/* Get all saved posts from 'savedPosts' table and the associated pin data
for the specified userId (saver): */
app.get('/api/saved-pins/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);

  if (!userId || userId < 0) {
    throw new ClientError(400, 'a valid userId is required, please sign in or create an account');
  }

  const sql = `
    SELECT
      "p"."postId",
      "sp"."createdAt" AS "saved",
      "sp"."userId" AS "saver",
      "p"."title",
      "p"."artistName",
      "p"."artPhotoUrl",
      "p"."reported",
      "p"."userId" AS "poster",
      "p"."lat",
      "p"."lng",
      "u"."userName",
      "u"."photoUrl"
    FROM "posts" AS "p"
    JOIN "users" AS "u" USING ("userId")
    JOIN "savedPosts" AS "sp" USING ("postId")
    WHERE
      "p"."deleted" is NULL
      AND "sp"."userId" = $1
    ORDER BY "sp"."createdAt" DESC, "sp"."postId" DESC;
  `;

  const params = [userId];
  db.query(sql, params)
    .then(response => {
      res.json(response.rows);
    })
    .catch(err => next(err));
});

// Authenticate user at sign-in:
app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ClientError(401, 'Invalid login');
  }

  const sql = `
    SELECT
      "userId",
      "hashedPassword",
      "photoUrl"
    FROM "users"
    WHERE "userName" = $1;
  `;
  const params = [username];
  db.query(sql, params)
    .then(response => {
      const [user] = response.rows;
      if (!user) {
        throw new ClientError(401, 'Invalid login');
      }
      const { userId, hashedPassword, photoUrl } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'Invalid login');
          }
          const payload = { userId, username, photoUrl };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

// Post new pin to 'posts' table:
app.post('/api/post-pin', uploadsMiddleware, async (req, res, next) => {
  const { title, artist, info, lat, lng, userId } = req.body;

  if (!title) {
    throw new ClientError(400, 'street art title is a required field');
  }
  if (!artist) {
    throw new ClientError(400, 'artist name or tag is a required field');
  }
  if (!info) {
    throw new ClientError(400, 'description or information is a required field');
  }
  if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
    throw new ClientError(400, 'lat and lng are required fields and must be Number type values');
  }
  if (!userId | userId < 0) {
    throw new ClientError(400, 'a valid userId is required, please sign in or create an account');
  }
  if (!req.file) {
    throw new ClientError(400, 'an image upload is required');
  }

  const { filename: image } = req.file;
  try {
    await sharp(req.file.path)
      .resize({ width: 1000, withoutEnlargement: true })
      .jpeg({ force: false, mozjpeg: true })
      .png({ force: false, quality: 70 })
      .webp({ force: false, quality: 70 })
      .toFile(
        path.resolve(req.file.destination, 'resized', image)
      );
  } catch (err) {
    return next(err);
  }

  const url = `/images/resized/${req.file.filename}`;

  const sql = `
    INSERT INTO "posts"
      (
        "title",
        "artistName",
        "artPhotoUrl",
        "comment",
        "lat",
        "lng",
        "userId"
      )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
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
  const { userId } = req.body;

  if (!postId || postId < 0 || isNaN(postId)) {
    throw new ClientError(400, 'postId must be a positive integer');
  }
  if (!userId || userId < 0 || isNaN(userId)) {
    throw new ClientError(400, 'invalid userId, please sign in or create an account');
  }

  const sql = `
    INSERT INTO "savedPosts"
      (
        "postId",
        "userId"
      )
    SELECT $1, $2
    WHERE EXISTS
      (SELECT 1 FROM "posts" WHERE "postId" = $1
        AND "deleted" is NULL)
    RETURNING *;
  `;

  const params = [postId, userId];
  db.query(sql, params)
    .then(response => {
      if (!response.rows[0]) {
        throw new ClientError(
          404,
          `This isn't the pin you're looking for... no, really, there is no pin with a postId of ${postId}. It may have been deleted.`
        );
      }
      const [saved] = response.rows;
      res.status(201).json(saved);
    })
    .catch(err => next(err));
});

// Add new user to 'users' table:
app.post('/api/auth/sign-up', uploadsMiddleware, (req, res, next) => {
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
    throw new ClientError(400, 'Invalid password: Password must include at least six characters and one number');
  }
  if (!req.file) {
    throw new ClientError(400, 'An image upload is required');
  }

  const url = `/images/${req.file.filename}`;

  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
          INSERT INTO "users"
            (
              "firstName",
              "lastName",
              "email",
              "userName",
              "photoUrl",
              "hashedPassword"
            )
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING "userId", "userName", "createdAt";
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
  const { title, artist, info, lat, lng, userId } = req.body;

  if (!postId || postId < 0) {
    throw new ClientError(400, 'postId must be a positive integer');
  }
  if (!title) {
    throw new ClientError(400, 'street art title is a required field');
  }
  if (!artist) {
    throw new ClientError(400, 'artist name or tag is a required field');
  }
  if (!info) {
    throw new ClientError(400, 'description or information is a required field');
  }
  if (!userId) {
    throw new ClientError(400, 'userId is required, please sign in or create an account');
  }
  if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
    throw new ClientError(400, 'lat and lng are required fields and must be Number type values');
  }

  // Check to see if the image was updated, if not, set 'url' to null:
  let url;
  if ('file' in req) {
    url = `/images/${req.file.filename}`;
  } else {
    url = null;
  }

  const sql = `
    UPDATE "posts"
    SET
      "title" = $2,
      "reported" = false,
      "artistName" = $3,
      "comment" = $4,
      "lat" = $5,
      "lng" = $6
      ${url ? ',"artPhotoUrl" = $8' : ''}
    WHERE
      "postId" = $1
      AND "userId" = $7
      AND "deleted" is NULL
    RETURNING *;
  `;

  const params = [postId, title, artist, info, lat, lng, userId];
  if (url !== null) params.push(url);
  db.query(sql, params)
    .then(response => {
      const [pin] = response.rows;
      if (!pin) {
        throw new ClientError(
          404,
          `This isn't the pin you're looking for... no, really, there is no pin with a postId of ${postId} associated with userId ${userId}. Please check you're logged in properly and that you're updating the correct pin.`
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
    UPDATE "posts"
    SET "deleted" = now()
    WHERE "postId" = $1
    RETURNING "deleted";
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
    UPDATE "posts"
    SET "reported" = true
    WHERE
      "postId" = $1
       AND "deleted" is NULL
    RETURNING "reported";
  `;

  const params = [postId];
  db.query(sql, params)
    .then(response => {
      const [reported] = response.rows;
      if (!reported) {
        throw new ClientError(
          404,
            `This isn't the pin you're looking for... no, really, there is no pin with a postId of ${postId}. It may have been deleted.`
        );
      }
      res.json(reported);
    })
    .catch(err => next(err));
});

// Delete a saved pin from the saved table:
app.delete('/api/delete-saved/:postId', (req, res, next) => {
  const { userId } = req.body;
  const postId = Number(req.params.postId);

  if (!postId || postId < 0 || isNaN(postId)) {
    throw new ClientError(400, 'postId must be a positive integer');
  }

  if (!userId || userId < 0 || isNaN(userId)) {
    throw new ClientError(400, 'invalid userId, please sign in or create an account');
  }

  const sql = `
  DELETE FROM "savedPosts"
    WHERE
      "postId" = $1
      AND "userId" = $2
  RETURNING *;
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
