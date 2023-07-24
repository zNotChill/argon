
var settingsOpen = false;
var sfxVolume = settings.sounds.sfx;
var theme = settings.main;
var themeAccent = settings.accent;

document.querySelector("html").style.setProperty("--accent-hsl", themeAccent);
document.querySelector("html").style.setProperty("--back-hsl", theme);

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
          <div class="splitter"></div> 

          <div class="settings-subsection">
            <div class="settings-subsection-title">Sounds</div>
            <div class="settings-subsection-content">
              <div class="settings-subsection-content-item">
                <div class="settings-subsection-content-item-title">SFX Volume</div>
                <div class="settings-subsection-content-item-content">
                  <input type="range" min="0" max="100" value="${sfxVolume}" class="slider" id="sfxVolume">
                  <strong><span id="sfxVolumeValue">${sfxVolume}</span>%</strong>
                </div>
              </div>
            </div>
          </div>

          <div class="settings-subsection">
            <div class="settings-subsection-title">Theme</div>
            <div class="settings-subsection-content">
              <div class="settings-subsection-content-item">
                <div class="settings-subsection-content-item-title">Accent Colour</div>
                <div class="settings-subsection-content-item-content">
                  <input type="range" min="0" max="360" value="${themeAccent}" class="slider" id="themeSlider">
                  <strong><span id="themeSliderValue">${themeAccent}</span></strong>
                </div>
              </div>
              <div class="settings-subsection-content-item">
                <div class="settings-subsection-content-item-title">Main Colour</div>
                <div class="settings-subsection-content-item-content">
                  <input type="range" min="0" max="360" value="${theme}" class="slider" id="themeSlider2">
                  <strong><span id="themeSlider2Value">${theme}</span></strong>
                </div>
            </div>
            </div>
          </div>


        </div>
      <div>
    `;

    qs("#sfxVolume").addEventListener("input", () => {
      sfxVolume = qs("#sfxVolume").value;
      qs("#sfxVolumeValue").innerHTML = sfxVolume;
      settings.sounds.sfx = parseInt(sfxVolume);
      
      fs.writeFileSync(data.cacheDataDir + "/settings.json", JSON.stringify(settings, null, 2));
    });

    qs("#themeSlider").addEventListener("input", () => {
      var themeSlider = qs("#themeSlider").value;
      qs("#themeSliderValue").innerHTML = themeSlider;
      settings.accent = parseInt(themeSlider);

      fs.writeFileSync(data.cacheDataDir + "/settings.json", JSON.stringify(settings, null, 2));

      document.querySelector("html").style.setProperty("--accent-hsl", themeSlider);
    });

    qs("#themeSlider2").addEventListener("input", () => {
      var themeSlider2 = qs("#themeSlider2").value;
      qs("#themeSlider2Value").innerHTML = themeSlider2;
      settings.main = parseInt(themeSlider2);

      fs.writeFileSync(data.cacheDataDir + "/settings.json", JSON.stringify(settings, null, 2));

      document.querySelector("html").style.setProperty("--back-hsl", themeSlider2);
    });
  } else {
    qs(".settings-wrapper").querySelector(".settings").classList.add("settings-fade");
    setTimeout(() => {
      qs(".settings-wrapper").style.display = "none";
      qs(".settings-wrapper").style.visibility = "hidden";
    }, 500);

  }
}