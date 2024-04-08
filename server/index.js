const path = require('path');
const express = require('express');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const jsonData = require('../usarhubs-419122-ce42a4faf8f7.json');

const PORT = process.env.PORT || 3001;
const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", async (req, res) => {
  try {
    // Load your Google Spreadsheet by providing its ID

    // Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
    const serviceAccountAuth = new JWT({
    // env var values here are copied from service account credentials generated by google
    // see "Authentication" section in docs for more info
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  });

    const doc = new GoogleSpreadsheet('1m43gLy19kFsKE6vsGw9sVD4goG8zL2Mb4TkX-vIlVFg', serviceAccountAuth);

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0]; // Assuming you want to load the first sheet


    // Get all rows from the sheet
    const rows = await sheet.getRows();


    // Get column headers
    const columns = sheet.headerValues;


    // Prepare the response object containing data and columns
    const responseData = {
      columns: columns,
      data: rows.map(row => {
        const rowData = {};
        row._worksheet._headerValues.forEach((column, index) => {
          rowData[column] = row._rawData[index];
        });
        return rowData;
      })
      
    };


    res.json(responseData); // Send the data and columns as JSON response
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
