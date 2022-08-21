const express = require("express");
const { google } = require("googleapis");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  const {
    date,
    time,
    depositAuto,
    depositMoneyAuto,
    depositOnHand,
    depositMoneyOnHand,
  } = req.body;

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = "13-mtl-yOVP1S2zB4sR-7yUXPzXrafg3cUbxoGP5sVQw";

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  // Read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1!A:Z",
  });

  // Write row(s) to spreadsheet
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A:Z",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [
        [
          date,
          time,
          depositAuto,
          depositMoneyAuto,
          depositOnHand,
          depositMoneyOnHand,
        ],
      ],
    },
  });

  res.send("บันทึกข้อมูลสำเร็จ");
});

app.listen(1337, (req, res) => console.log("running on 1337"));
