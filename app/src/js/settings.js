
const fs = require('fs');
const path = require('path');

var settingsOpen = false;

function toggleSettings() {

  settingsOpen = !settingsOpen;

  if(settingsOpen) {
    qs(".settings-wrapper").style.display = "block";
    qs(".settings-wrapper").style.visibility = "visible";
    qs(".settings-wrapper").innerHTML = `
    <div class="settings">
      <div class="header rounded element nodrag">
        <div class="left-hang area">
          <div class="header-title" title="Settings">Settings</div>
        </div>
        <div class="right-hang area">
          <div class="header-buttons">
            <span class="button close invert" onclick="toggleSettings()">Close</span>
          </div>
        </div>
      </div>

      <div class="settings-content">
        <div class="settings-section">
          <div class="settings-section-title">General</div>
          <div class="settings-section-content">
            hello
          </div>
        </div>
      <div>
    `;
  } else {
    qs(".settings-wrapper").style.display = "none";
    qs(".settings-wrapper").style.visibility = "hidden";

  }
}