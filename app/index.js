const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');
const ejse = require('ejs-electron');
const { cacheData, cacheDataDir } = require('./lib/data');

ejse.data("app", {
  name: "argon",
  version: "0.0.1",

  store: JSON.parse(cacheData()),
});

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    frame: false,
    resizable: false,
    fullscreenable: false,
    fullscreen: false,
    hasShadow: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  win.loadURL(`file://${__dirname}/views/main.ejs`);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})