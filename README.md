# test-grapecity

This repo's intended at testing the Spread JS XLSX and PDF generation and comparing execution times for the two.

##### Prerequisites:

Node JS

##### How to use:

1. clone repo
2. navigate to the project's directory `test-grapecity`
3. open a terminal and run `yarn` to install its dependencies
4. set a valid spread js license key in `test-grapecity/config.js` under `spreadLicenseKey`
5. start the server by running `node server.js` or `yarn start`. The server will run on port 3008, the port can be configured in `config.js` as well under `port`
6. test the XLSX and PDF conversions as explained below:


###### Option A:

Call the endpoints directly in your browser or with POSTMAN

- `GET http://localhost:3008/json2xlsx`: returns an XLSX file
- `GET http://localhost:3008/json2pdf`: returns a PDF file
- you can include an optional query param `fileName` with possible values: `heavy-table` and `light-table` to test out different input files. It defaults to heavy-table for the test

###### Option B:

- open another terminal and run to `yarn run-script`
- see the execution time for XLSX creation compared to PDF. The script reads data for a test table (a heavy one) located under `test-grapecity/test-diff/input-files/heavy-table.json`, makes two calls to the server (one that converts the table to XLSX and one that coverts it to PDF) and records the execution times for both.

###### Option C:

- open another terminal and run to `test-grapecity/test-diff`
- run the script `sh compare.sh` and see the execution time for XLSX creation compared to PDF. The script reads data for a test table (a heavy one) located under `test-grapecity/test-diff/input-files/heavy-table.json`, makes two calls to the server (one that converts the table to XLSX and one that coverts it to PDF) and records the execution times for both.