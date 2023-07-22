function createLauncherElement({
  content,
  title,
  path
}) {
  var el = document.createElement("div");
  el.classList.add("app-container");
  el.setAttribute("data-app", title);
  el.setAttribute("data-path", path);
  el.innerHTML = content;

  document.querySelector(".app-launcher").appendChild(el);

  return el;
}

document.querySelectorAll(".app-container").forEach(async (el) => {
  var app = el.attributes["app-name"].value,
      appPath = el.attributes["app-path"].value;

  console.log(`App: ${app} | Path: ${appPath}`);
  
  el.addEventListener("click", async () => {
    if(appPath === "") {
      fadingPopup(`The app <b>${app}</b> is not installed.`);
      return;
    }
    console.log(`Starting ${app}...`);
    const run = process.spawn(`${appPath}`);

    const PID = await findProcessByName(`${app}.exe`) ? await findProcessByName(`${app}.exe`) : run.PID;
    console.log(PID);

    pidusage(PID, (err, stats) => {
      if(err) throw err;
      console.log(stats);
    });
  });
});