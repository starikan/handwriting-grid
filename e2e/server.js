const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 9192;

const runServer = () => {
  http
    .createServer(function (request, response) {
      const filePath = path.resolve('./build') + (request.url === '/' ? '/index.html' : request.url);

      const extname = path.extname(filePath);
      let contentType = 'text/html';
      switch (extname) {
        case '.js':
          contentType = 'text/javascript';
          break;
        case '.css':
          contentType = 'text/css';
          break;
        case '.json':
          contentType = 'application/json';
          break;
        case '.png':
          contentType = 'image/png';
          break;
        case '.jpg':
          contentType = 'image/jpg';
          break;
        case '.wav':
          contentType = 'audio/wav';
          break;
        default:
          contentType = 'text/html';
          break;
      }

      fs.readFile(filePath, function (error, content) {
        if (error) {
          if (error.code === 'ENOENT') {
            fs.readFile('./404.html', function (error, content) {
              response.writeHead(200, { 'Content-Type': contentType });
              response.end(content, 'utf-8');
            });
          } else {
            response.writeHead(500);
            response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            response.end();
          }
        } else {
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(content, 'utf-8');
        }
      });
    })
    .listen(port);
  console.log(`Server running at http://127.0.0.1:${port}/`);
};

if (!module.parent) {
  runServer();
} else {
  module.exports = runServer;
}
