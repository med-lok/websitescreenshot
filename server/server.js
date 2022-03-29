const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const puppeteer = require("puppeteer");
const url = require("url");
const path = require("path");
const mime = require("mime");
const fs = require("fs");

app.use(express.static("public"));
app.use(cors({ credentials: true }));

app.get("/", (req, res) => {
  res.send("404");
});

function fullUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get("host"),
    //pathname: req.originalUrl,
  });
}

app.get("/png", (req, res) => {
  const n = Math.floor(new Date().valueOf() * Math.random());
  let path = `public/images/${n}.png`;
  let publicPath = `images/${n}.png`;
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    if (req.query.device) {
      await page.emulate(puppeteer.devices["iPhone X"]);
      console.log(req.query.device);
    }
    await page.goto(req.query.url, {
      waitUntil: "networkidle0",
    });
    await page.setViewport({
      width: req.query.width ? req.query.width : 640,
      height: req.query.height ? req.query.height : 680,
      deviceScaleFactor: 1,
    });
    await page.screenshot({ path });
    await browser.close();
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.send({
      url: fullUrl(req) + "/" + publicPath,
      filename: n,
      filetype: "png",
    });
  })();
  //console.log(req.query.f);
});

app.get("/jpg", (req, res) => {
  const n = Math.floor(new Date().valueOf() * Math.random());
  let path = `public/images/${n}.jpg`;
  let publicPath = `images/${n}.jpg`;
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    if (req.query.device) {
      await page.emulate(puppeteer.devices["iPhone X"]);
      console.log(req.query.device);
    }
    await page.goto(req.query.url, {
      waitUntil: "networkidle0",
    });
    await page.setViewport({
      width: req.query.width ? req.query.width : 640,
      height: req.query.height ? req.query.height : 680,
      deviceScaleFactor: 1,
    });
    await page.screenshot({ path });
    await browser.close();
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.send({
      url: fullUrl(req) + "/" + publicPath,
      filename: n,
      filetype: "jpg",
    });
  })();
  //console.log(req.query.f);
});

app.route("/pdf").get(function (req, res) {
  const n = Math.floor(new Date().valueOf() * Math.random());
  let path = `public/images/${n}.pdf`;
  let publicPath = `images/${n}.pdf`;
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(req.query.url, {
      waitUntil: "networkidle0",
    });
    // Generates a PDF with 'screen' media type.
    await page.emulateMediaType("screen");
    await page.pdf({
      format: req.query.format ? req.query.format : "Ledger",
      path,
    });
    await browser.close();
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.send({
      url: fullUrl(req) + "/" + publicPath,
      filename: n,
      filetype: "pdf",
    });
  })();
  //console.log(req.query.f);
});

app.route("/download").get(function (req, res) {
  const file = `public/images/${req.query.file}.${req.query.type}`;
  res.download(file); // Set disposition and send it.
});

app.route("/file").get(function (req, res) {
  const file = `public/images/${req.query.file}.${req.query.type}`;
  res.send(file); // Set disposition and send it.
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
