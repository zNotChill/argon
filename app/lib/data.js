const path = require("path");
const fs = require("fs");

const appDataPath =
  process.env.APPDATA ||
  (process.platform === "darwin"
    ? "~/Library/Preferences"
    : "~/argon-app");

const appDataDir = appDataPath + "/argon";
const cacheDataDir = appDataPath + "/argon/cache";

exports.cacheDataDir = cacheDataDir;
exports.appDataDir = appDataDir;

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

const settings = {
  sounds: {
    sfx: 100,
  },
  test: true,
}

function updateSettings() {

  var sett = JSON.parse(fs.readFileSync(cacheDataDir + "/settings.json", "utf-8"));
  var clone = settings;
  for (const setting in clone) {
    if(!(setting in sett)) {
      sett[setting] = clone[setting];
    }
  }
}

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
if(!fs.existsSync(cacheDataDir + "/settings.json")) {
  fs.writeFileSync(cacheDataDir + "/settings.json", JSON.stringify(settings, null, 2));
} else {
  updateSettings();
}