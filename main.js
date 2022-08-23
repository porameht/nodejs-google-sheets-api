const { google } = require("googleapis");
const keys = require("./credentials.json");
const cron = require("node-cron");

const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

// Schedule tasks to be run on the server.

cron.schedule("* */1 * * *", function () {
  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

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
    spreadsheetId: "1NuDsgjzr93D3we9721k5E6ASGN5BI-ZS19lVLF7_d2g",
    range: "Sheet1!A2:Z",
  };

  const data = await gsapi.spreadsheets.values.get(GetOptions);
  const dataArray = data.data.values;

  if (!dataArray) {
    return console.log("Not Found Data");
  } else {
    const newDataArray = dataArray.map((r) => {
      r.push(time);
      return r;
    });

    const ClearOptions = {
      spreadsheetId: "1NuDsgjzr93D3we9721k5E6ASGN5BI-ZS19lVLF7_d2g",
      range: "Sheet1!A2:Z",
    };
    const clear = await gsapi.spreadsheets.values.clear(ClearOptions);

    const AppendOptions = {
      spreadsheetId: "1tUjq9Pb81TIoOX-EZ0n6JX3f9d1D3wb4csbB9ZJn-AI",
      range: "Sheet1",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: newDataArray,
      },
    };
    const res = await gsapi.spreadsheets.values.append(AppendOptions);

    console.log(`Append data successfully ${newDataArray.length}`);
  }
}
