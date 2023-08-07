
const sounds = {
  'click': document.querySelector("#audio audio.click"),
  'rightclick': document.querySelector("#audio audio.rightclick"),
}

var audioPlaying = false;
var settings = JSON.parse(fs.readFileSync(data.cacheDataDir + "/settings.json", "utf-8"));

function playSound(sound) {

  const soundEl = qs(`#audio audio[class="${sound}"]`);
  const source = soundEl.querySelector("source");

  source.volume = settings.sounds.sfx / 100;

  if(!audioPlaying) {
    soundEl.play();
    audioPlaying = true;
  } else {
    soundEl.pause();
    soundEl.currentTime = 0;
    soundEl.play();
  }
}

const clickFuncs = {
  settingsToggle: (el) => {
    if(el.classList.contains("disabled")) return;

    toggleSettings();
  }
}

document.querySelectorAll("a, [click], .button").forEach(button => {
  button.addEventListener("mouseover", (e) => {
    if(!button.classList.contains("disabled")) {
      playSound("rightclick");
    } else {
      e.preventDefault();
    }
  });
  button.addEventListener("click", (e) => {
    if(!button.classList.contains("disabled")) {
      playSound("click");
    } else {
      // cancel onclick

    }
  });

  if(button === qs(".button.close-window.js-settings-toggle")) {

  }
});