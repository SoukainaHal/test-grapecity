const fs = require("fs");
const path = require("path");

const getInputData = () => {
  const fileName = path.join(
    __dirname,
    "..",
    "test-diff/input-files/heavy-table.json"
  );
  return JSON.parse(fs.readFileSync(fileName, "utf8"));
};

module.exports = getInputData;
