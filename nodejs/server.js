require('dotenv').config();
const http = require('http');
const config = require('config');
const logger = require('./utils/logger');
const dbConnect = require('./utils/dbConnect');
const home = require('./controllers/home.controller');
const urlParse = require('url').parse;

const port = config.get('port');

const app = http.createServer((req, res) => {
  const uri = urlParse(req.url);
  const url = uri.pathname;
  const method = req.method;
  let query = {};

  uri?.query?.split('&').map((item) => {
    const q = item.split('=');
    query[q[0]] = q[1];
  });

  if (url == '/') {
    switch (method) {
      case 'GET':
        home.index(req, res, query);
        break;
      case 'POST':
        home.productSave(req, res, query);
        break;
      default:
        res.statusCode = 404;
        res.end('Page not found!');
    }
  } else if (url == '/delete') {
    switch (method) {
      case 'GET':
        home.deleteProduct(req, res, query);
        break;
      default:
        res.statusCode = 404;
        res.end('Page not found!');
    }
  } else {
    res.statusCode = 404;
    res.end('Page not found!');
  }
});

app.listen(port, () => {
  logger.info(`Server is running in port ${port}`);

  dbConnect();
});
