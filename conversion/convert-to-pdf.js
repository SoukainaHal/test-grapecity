"use strict";

const config = require("../config");
const getInputData = require("../utils/file-to-json");

const domHtml = `<!DOCTYPE html><html lang="en">
     <head>
       <meta charset="utf-8">
       <script src="http://localhost:${config.port}/static/sheets/gc.spread.sheets.all.min.js"></script>
       <script src="http://localhost:${config.port}/static/sheets/gc.spread.sheets.print.min.js"></script>
       <script src="http://localhost:${config.port}/static/sheets/gc.spread.sheets.pdf.min.js"></script>
       <script src="http://localhost:${config.port}/static/sheets/gc.spread.sheets.barcode.min.js"></script>
       <script src="http://localhost:${config.port}/static/sheets/gc.spread.sheets.charts.min.js"></script>
       <script src="http://localhost:${config.port}/static/sheets/gc.spread.sheets.shapes.min.js"></script>
       <script language='JavaScript'>GC.Spread.Sheets.LicenseKey='${config.spreadLicenseKey}'</script>
       <link rel="stylesheet" type="text/css" href="http://localhost:${config.port}/static/styles/gc.spread.sheets.excel2016colorful.css">
      </head><body></body></html>`;

module.exports = {
  createPdfFromJson: async function (req, res, next) {
    const browser = req.app.get("browser");
    const page = await browser.newPage();
    await page.setContent(domHtml);
    const executionContext = await page.mainFrame().executionContext();
    const data = getInputData(req.query.fileName);

    async function getPdf(data) {
      return executionContext.evaluate((data) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          const div = window.document.createElement("DIV");
          const workbook = new window.GC.Spread.Sheets.Workbook(div);
          workbook.fromJSON(data);

          workbook.savePDF(
            function (blob) {
              reader.readAsBinaryString(blob);
            },
            function (err) {
              console.log("Error occurred while saving the PDF");
              reject(err);
            }
          );

          reader.onload = () => resolve(reader.result);
          reader.onerror = () =>
            reject("Error occurred while reading binary string");
        });
      }, data);
    }

    try {
      console.time("PDF data generation time");
      const pdfDataAsString = await getPdf(data);
      const pdfData = Buffer.from(pdfDataAsString, "binary");
      console.timeEnd("PDF data generation time");

      res.set("Content-Type", "application/pdf");
      res.set(
        "Content-Disposition",
        `attachment; filename=download-${Date.now()}.pdf`
      );
      res.send(pdfData);
    } catch (err) {
      next(err);
    } finally {
      await page.close();
    }
  },
};
