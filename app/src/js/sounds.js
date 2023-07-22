
const sounds = {
  'click': new Audio('../src/audio/click.wav'),
  'hovers': new Audio('../src/audio/hover2.wav'),
  'rightclick': new Audio('../src/audio/rightclick.wav'),
}

function playSound(sound) {
  qs("#audio").innerHTML = `
    <audio autoplay>
      <source src="${sounds[sound].src}" type="audio/wav">
    </audio>
  `;
}

document.querySelectorAll("a, [click], .button").forEach(button => {
  button.addEventListener("mouseover", () => playSound("rightclick"));
  button.addEventListener("click", () => playSound("click"));
});