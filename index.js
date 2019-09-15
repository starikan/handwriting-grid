const puppeteer = require('puppeteer');
const express = require('express');

const server = express();
server.use(express.static(__dirname + '/'));

server.get('/get_pdf', async function (req, res) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/?kanjis=%E6%98%93&columns=6', {
    "waitUntil": 'networkidle2'
  }).catch(function () {
    console.log('Error while loading up the url.');
  });
  const selector = await page.$('page[size="A4"]');
  const screen = await selector.screenshot()
  var img = new Buffer(screen, 'base64');
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': img.length
  });
  res.end(img);
  browser.close();
});

server.get('/', async function (req, res) {
  res.sendFile(path.join(public, 'index.html'));
});

server.listen(3000, function () {
  console.log('Listening on 3000')
});