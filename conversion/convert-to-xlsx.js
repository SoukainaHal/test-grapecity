"use strict";

const config = require("../config");
const getInputData = require("../utils/file-to-json");

const domHtml = `<!DOCTYPE html><html lang="en">
    <head>
      <meta charset="utf-8">
      <script src="http://localhost:${config.port}/static/sheets/gc.spread.sheets.all.min.js"></script>
      <script src="http://localhost:${config.port}/static/excelio/gc.spread.excelio.min.js"></script>
      <script language='JavaScript'>GC.Spread.Sheets.LicenseKey='${config.spreadLicenseKey}'</script>
     </head><body></body></html>`;

module.exports = {
  createXlsxFromJson: async function (req, res, next) {
    const browser = req.app.get("browser");
    const page = await browser.newPage();
    await page.setContent(domHtml);
    const executionContext = await page.mainFrame().executionContext();
    const data = getInputData();

    async function getXlsx(data) {
      return executionContext.evaluate((data) => {
        return new Promise((resolve, reject) => {
          const excelIO = new window.GC.Spread.Excel.IO();
          const reader = new FileReader();

          try {
            excelIO.save(
              data,
              (blob) => {
                reader.readAsBinaryString(blob);
              },
              (err) => {
                const div = window.document.createElement("DIV");
                const workbook = new window.GC.Spread.Sheets.Workbook(div);
                workbook.fromJSON(data);
                const convertedToNewVersion = workbook.toJSON();

                excelIO.save(
                  convertedToNewVersion,
                  (blob) => {
                    reader.readAsBinaryString(blob);
                  },
                  (err) => {
                    reject(err);
                  }
                );
              }
            );
          } catch (err) {
            reject(err);
          }

          reader.onload = () => resolve(reader.result);
          reader.onerror = () =>
            reject("Error occurred while reading binary string");
        });
      }, data);
    }

    try {
      console.time("XLSX data generation time");
      const xlsxString = await getXlsx(data);
      const xlsxData = Buffer.from(xlsxString, "binary");
      console.timeEnd("XLSX data generation time");

      res.set(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.send(xlsxData);
    } catch (err) {
      const additionalErrorMessage =
        "Failed to convert the submitted JSON to XLSX binary:";
      err.message = `${additionalErrorMessage} ${err.message}`;
      next(err);
    } finally {
      await page.close();
    }
  },
};
