const path = require('path');
const express = require('express');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

const PORT = process.env.PORT || 3001;
const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

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

// Load your Google Spreadsheet by providing its ID
const doc = new GoogleSpreadsheet('1m43gLy19kFsKE6vsGw9sVD4goG8zL2Mb4TkX-vIlVFg', serviceAccountAuth);

// Initialize an object to store hubs grouped by state
let hubsByState = {};

// Load spreadsheet data when the server starts
(async () => {
  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0]; // Assuming you want to load the first sheet
    const rows = await sheet.getRows();

    rows.forEach(row => {
      // Ensure that required properties exist before accessing them
      // Some rows commented out for now as they're not needed
      const state = row._rawData[0] ? row._rawData[0].trim() : '';
      const city = row._rawData[1] ? row._rawData[1].trim() : '';
      const zipCode = row._rawData[2] ? row._rawData[2].trim() : '';
      // const organizer = row._rawData[3] ? row._rawData[3].trim() : '';
      // const organizerEmail = row._rawData[4] ? row._rawData[4].trim() : '';
      const socialMedia = row._rawData[5] ? row._rawData[5].trim() : '';
      const joinLink = row._rawData[6] ? row._rawData[6].trim() : '';
      // const hubSize = row._rawData[7] ? row._rawData[7].trim() : '';
      // const logo = row._rawData[8] ? row._rawData[8].trim() : '';
    
      if (!hubsByState[state]) {
        hubsByState[state] = [];
      }
      hubsByState[state].push({
        city,
        zipCode,
        // organizer,
        // organizerEmail,
        socialMedia,
        joinLink,
        // hubSize,
        // logo
      });
    });
  } catch (error) {
    console.error('Error loading spreadsheet data:', error);
  }
})();

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  // Send the pre-loaded data as JSON response
  const responseData = Object.entries(hubsByState).map(([state, hubs]) => ({
    state,
    hubs
  }));
  res.json(responseData);
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
