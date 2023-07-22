const path = require("path");
const fs = require("fs");

const appDataPath =
  process.env.APPDATA ||
  (process.platform === "darwin"
    ? process.env.HOME + "/Library/Preferences"
    : process.env.HOME + "/argon-app");

const appDataDir = appDataPath + "/argon";
const cacheDataDir = appDataPath + "/argon/cache";

exports.cacheDataDir = appDataDir;
exports.appDataDir = cacheDataDir;

const store = {
  installations: [
    {
      name: "Steam",
      path: "",
      displayName: "Steam",
      id: "steam",
      color: "#0b578c",
    },
    {
      name: "Epic Games",
      path: "",
      displayName: "Epic Games",
      id: "epic",
      color: "#343432",
    },
    {
      name: "Origin",
      path: "",
      displayName: "Origin",
      id: "origin",
      color: "#ee5820",
    },
    {
      name: "Uplay",
      path: "",
      displayName: "Uplay",
      id: "uplay",
      color: "#0071fe",
    },
    {
      name: "Battle.net",
      path: "",
      displayName: "Battle.net",
      id: "battlenet",
      color: "#148eff",
    },
    {
      name: "Riot Games",
      path: "",
      displayName: "Riot Games",
      id: "riot",
      color: "#ec0830",
    },
  ]
};

function checkRootDir() {
  if (!fs.existsSync(appDataDir)) {
    fs.mkdirSync(appDataDir);
  }
}
function rootDirExists() {
  return fs.existsSync(appDataDir);
}
function checkSavedData() {
  if (!fs.existsSync(cacheDataDir + "/data.json")) {
    fs.writeFileSync(cacheDataDir + "/data.json", JSON.stringify(store, null, 2));
  }
}
function savedDataExists() {
  return fs.existsSync(cacheDataDir + "/data.json");
}
function saveData() {
  fs.writeFileSync(cacheDataDir + "/data.json", JSON.stringify(store, null, 2));
}

function cacheData() {
  return fs.readFileSync(cacheDataDir + "/data.json", "utf-8");
}
exports.cacheData = cacheData;

if (!rootDirExists() || !savedDataExists()) {
  checkRootDir();
  fs.mkdirSync(cacheDataDir);
  checkSavedData();

  saveData();
}
