const { cacheDataDir } = require("../../lib/data.js");

const sounds = {
  'click': new Audio('../src/audio/click.wav'),
  'hovers': new Audio('../src/audio/hover2.wav'),
  'rightclick': new Audio('../src/audio/rightclick.wav'),
}

var settings = fs.readFileSync(cacheDataDir + "/settings.json", "utf-8");

function playSound(sound) {
  qs("#audio").innerHTML = `
    <audio autoplay>
      <source volume="${settings.sounds.sfx / 100}" src="${sounds[sound].src}" type="audio/wav">
    </audio>
  `;
}

document.querySelectorAll("a, [click], .button").forEach(button => {
  button.addEventListener("mouseover", () => playSound("rightclick"));
  button.addEventListener("click", () => playSound("click"));
});