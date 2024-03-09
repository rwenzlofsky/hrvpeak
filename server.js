const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const express = require('express');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const httpsOptions = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.cert'),
  };

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  const httpsServer = createServer(httpsOptions, server);

  httpsServer.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on https://localhost:3000');
  });
});
