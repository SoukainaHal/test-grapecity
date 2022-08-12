"use strict";

const express = require("express");
const { createXlsxFromJson } = require("./convert-to-xlsx");
const { createPdfFromJson } = require("./convert-to-pdf");

const router = new express.Router();

router.route("/json2xlsx").get((req, res, next) => {
  return createXlsxFromJson(req, res, next);
});

router.route("/json2pdf").get((req, res, next) => {
  return createPdfFromJson(req, res, next);
});

module.exports = router;
