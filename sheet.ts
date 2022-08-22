import { google } from "googleapis";
const keys = require("./credentials.json");

const client = new google.auth.JWT(keys.client_email, null!, keys.private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

client.authorize((err, tokens) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Connected!");
    gsrun(client);
  }
});

async function gsrun(cl: any) {
  const gsapi = google.sheets({ version: "v4", auth: cl });

  const GetOptions: object = {
    spreadsheetId: "13-mtl-yOVP1S2zB4sR-7yUXPzXrafg3cUbxoGP5sVQw",
    range: "Sheet1!A2:Z10",
  };

  let data: any = await gsapi.spreadsheets.values.get(GetOptions);

  let dataArray: any = data.data.values;
  let newDataArray: [] = dataArray.map((r: []) => {
    return r;
  });

  const AppendOptions: object = {
    spreadsheetId: "1tUjq9Pb81TIoOX-EZ0n6JX3f9d1D3wb4csbB9ZJn-AI",
    range: "Sheet1",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: newDataArray,
    },
  };

  let res = await gsapi.spreadsheets.values.append(AppendOptions);
  //   console.log(res);
  console.log("Append data successfully");
}
