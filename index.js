const express = require('express');

const server = express();
server.use(express.static(__dirname + '/'));

server.get('/', async function (req, res) {
  res.sendFile(path.join(public, 'index.html'));
});

server.listen(3000, function () {
  console.log('Listening on 3000')
});