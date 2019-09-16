const puppeteer = require('puppeteer');
const express = require('express');
const stream = require('stream');

const server = express();
server.use(express.static(__dirname + '/'));

server.get('/get_pdf', async function (req, res) {
  // const params = {
  //   kanjis: '%E6%98%93',
  //   columns: 7,
  // }
  
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 2000,
      height: 2000,
    },
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
  browser.close();

  const fileName = '%E6%98%93';
  var fileContents = Buffer.from(screen, "base64");

  var readStream = new stream.PassThrough();
  readStream.end(fileContents);

  res.set('Content-disposition', `attachment; filename=${fileName}.png`);
  res.set('Content-Type', 'text/plain');

  readStream.pipe(res);
});

server.get('/', async function (req, res) {
  res.sendFile(path.join(public, 'index.html'));
});

server.listen(3000, function () {
  console.log('Listening on 3000')
});