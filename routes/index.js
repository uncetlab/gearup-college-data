// Google apis tutorial: https://www.youtube.com/watch?v=PFJNJQCU_lo&t=1224s

const express = require('express')
const router = express.Router()
const { google } = require('googleapis')

/* GET home page. */
router.get('/', async (req, res) => {
  // run npm i googleapis@latest to fix GoogleAuth is not a constructor error
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.gogleapis.come/auth/spreadsheets'
  })

  const client = await auth.getClient()

  const googleSheets = google.sheets({ version: 'v4', auth: client })

  // put the id of the spreadsheet
  const spreadsheetId = ''

  const metadata = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId
  })

  // Read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1!A:A" // read first column
  })

  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: 'Sheet1!A:B', // write to first two columns
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [
        ["Make a tutorial", "test"]
      ]
    }
  })
  res.send(getRows.data)
})

module.exports = router
