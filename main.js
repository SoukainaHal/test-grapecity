"use strict";

const bodyParser = require("body-parser");
const Express = require("express");
const puppeteer = require("puppeteer");
const config = require("./config");

const app = Express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// static files
app.use(
  "/static/excelio/",
  Express.static("node_modules/@grapecity/spread-excelio/dist", {
    maxAge: config.staticMaxAge,
  })
);
app.use(
  "/static/sheets/",
  Express.static("node_modules/@grapecity/spread-sheets/dist", {
    maxAge: config.staticMaxAge,
  })
);
app.use(
  "/static/sheets/",
  Express.static("node_modules/@grapecity/spread-sheets-pdf/dist", {
    maxAge: config.staticMaxAge,
  })
);
app.use(
  "/static/sheets/",
  Express.static("node_modules/@grapecity/spread-sheets-print/dist", {
    maxAge: config.staticMaxAge,
  })
);
app.use(
  "/static/sheets/",
  Express.static("node_modules/@grapecity/spread-sheets-barcode/dist", {
    maxAge: config.staticMaxAge,
  })
);
app.use(
  "/static/sheets/",
  Express.static("node_modules/@grapecity/spread-sheets-charts/dist", {
    maxAge: config.staticMaxAge,
  })
);
app.use(
  "/static/sheets/",
  Express.static("node_modules/@grapecity/spread-sheets-shapes/dist", {
    maxAge: config.staticMaxAge,
  })
);
app.use(
  "/static/styles/",
  Express.static("node_modules/@grapecity/spread-sheets/styles", {
    maxAge: config.staticMaxAge,
  })
);

// const router = require("./routes/spread");
// app.use("/spread", router);

// server start up
app.listen(config.port, async () => {
  const browserOptions = { headless: true };

  try {
    const browser = await puppeteer.launch(browserOptions);
    app.set("browser", browser);
    console.log("Server started...");
  } catch (err) {
    console.log("Could not start server.");
  }
});

module.exports = app;
