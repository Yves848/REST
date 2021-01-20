const express = require('express');
var Scraper = require('images-scraper');

const google = new Scraper({
    puppeteer: {
      headless: true,
    },
  });

const app = express()

app.listen(8080,() => {
    console.log("Serveur à l'écoute")
})

app.get('/search/:id/:number',async (req, res) => {
  const key = req.params.id
  const number = parseInt(req.params.number);
  const results = await google.scrape(key, number);
  const urls = results.map(result => {
      return {url: result.url}
  })
  res.status(200).json(urls)
})

app.get('/search/:id',async (req, res) => {
    const key = req.params.id
    const results = await google.scrape(key, 25);
    const urls = results.map(result => {
        return {url: result.url}
    })
    res.status(200).json(urls)
})