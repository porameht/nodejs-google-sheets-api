"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var googleapis_1 = require("googleapis");
var keys = require("./credentials.json");
var client = new googleapis_1.google.auth.JWT(keys.client_email, null, keys.private_key, [
    "https://www.googleapis.com/auth/spreadsheets",
]);
client.authorize(function (err, tokens) {
    if (err) {
        console.log(err);
        return;
    }
    else {
        console.log("Connected!");
        gsrun(client);
    }
});
function gsrun(cl) {
    return __awaiter(this, void 0, void 0, function () {
        var gsapi, GetOptions, data, dataArray, newDataArray, AppendOptions, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    gsapi = googleapis_1.google.sheets({ version: "v4", auth: cl });
                    GetOptions = {
                        spreadsheetId: "13-mtl-yOVP1S2zB4sR-7yUXPzXrafg3cUbxoGP5sVQw",
                        range: "Sheet1!A2:Z10"
                    };
                    return [4 /*yield*/, gsapi.spreadsheets.values.get(GetOptions)];
                case 1:
                    data = _a.sent();
                    dataArray = data.data.values;
                    newDataArray = dataArray.map(function (r) {
                        return r;
                    });
                    AppendOptions = {
                        spreadsheetId: "1tUjq9Pb81TIoOX-EZ0n6JX3f9d1D3wb4csbB9ZJn-AI",
                        range: "Sheet1",
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            values: newDataArray
                        }
                    };
                    return [4 /*yield*/, gsapi.spreadsheets.values.append(AppendOptions)];
                case 2:
                    res = _a.sent();
                    //   console.log(res);
                    console.log("Append data successfully");
                    return [2 /*return*/];
            }
        });
    });
}
