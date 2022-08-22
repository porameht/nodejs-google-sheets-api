const { google } = require("googleapis");
const keys = require("./credentials.json");
const cron = require("node-cron");

const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

// Schedule tasks to be run on the server.

cron.schedule("* * * * *", function () {
  var timestamp = new Date();
  client.authorize((err, tokens) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log(`Connected!`);
      gsrun(client, timestamp);
    }
  });
  console.log(`Running a task on ${timestamp}`);
});

async function gsrun(cl, time) {
  const gsapi = google.sheets({ version: "v4", auth: cl });

  const GetOptions = {
    spreadsheetId: "13-mtl-yOVP1S2zB4sR-7yUXPzXrafg3cUbxoGP5sVQw",
    range: "Sheet1!A2:Z10",
  };

  let data = await gsapi.spreadsheets.values.get(GetOptions);
  let dataArray = data.data.values;
  let newDataArray = dataArray.map((r) => {
    r.push(time);
    return r;
  });

  const AppendOptions = {
    spreadsheetId: "1tUjq9Pb81TIoOX-EZ0n6JX3f9d1D3wb4csbB9ZJn-AI",
    range: "Sheet1",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: newDataArray,
    },
  };

  let res = await gsapi.spreadsheets.values.append(AppendOptions);
  //   console.log(res);
  console.log(`Append data successfully ${newDataArray.length}`);
}
