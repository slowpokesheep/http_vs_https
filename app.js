const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');

// Local
const api = require('./api');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(api);

// Private key and certificate for https
const credentials = {
  key: fs.readFileSync('sslcert/server.key', 'utf8'),
  cert: fs.readFileSync('sslcert/server.crt', 'utf8'),
};

const httpConnection = {
  server: http.createServer(app),
  host: '127.0.0.1',
  port: '8080',
}

const httpsConnection = {
  server: https.createServer(credentials, app),
  host: '127.0.0.1',
  port: '8443',
}

// Error handling
function notFoundHandler(req, res, next) {
  console.warn('Not found', req.originalUrl);
  res.status(404).json({ error: 'Not found' });
}

function errorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid json' });
  }

  return res.status(500).json({ error: 'Internal server error' });
}

// Routes
app.use('/', api);
app.use(notFoundHandler);
app.use(errorHandler);

// HTTP server
httpConnection.server.listen(httpConnection.port, () => {
  if (httpConnection.host) {
    console.info(`HTTP server: http://${httpConnection.host}:${httpConnection.port}`);
  }
});

// HTTPS server
httpsConnection.server.listen(httpsConnection.port, () => {
  if (httpsConnection.host) {
    console.info(`HTTP server: https://${httpsConnection.host}:${httpsConnection.port}`);
  }
});