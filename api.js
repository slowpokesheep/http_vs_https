const express = require('express');
const path = require('path');

const router = express.Router();

/**
 * Catches errors from routes and passes them on to app.js
 *
 * @param {function} fn - Middleware to encapsulate
 */
function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

async function getRoute(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
}

async function postRoute(req, res) {
  const username = req.body.username
  const password = req.body.password

  console.info(`Username = ${username}`)
  console.info(`Password = ${password}`)

  res.redirect('/');
}

router.get('/', catchErrors(getRoute));
router.post('/', catchErrors(postRoute));

module.exports = router;
