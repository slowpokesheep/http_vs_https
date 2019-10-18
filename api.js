const express = require('express');
const path = require('path');

const router = express.Router();

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

async function getRoute(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
}

async function postRoute(req, res) {
  const username = req.body.username
  const password = req.body.password

  if (req.secure) console.info('HTTPS');
  else console.info('HTTP');
  
  console.info(`Username = ${username}`);
  console.info(`Password = ${password}`);

  res.redirect('/');
}

router.get('/', catchErrors(getRoute));
router.post('/', catchErrors(postRoute));

module.exports = router;
