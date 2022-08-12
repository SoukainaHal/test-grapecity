const fs = require("fs");
const path = require("path");

const getInputData = (payloadFileName = "heavy-table") => {
  const fileName = path.join(
    __dirname,
    "..",
    `test-diff/input-files/${payloadFileName}.json`
  );
  return JSON.parse(fs.readFileSync(fileName, "utf8"));
};

module.exports = getInputData;
