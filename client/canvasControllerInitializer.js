// window.addEventListener("load", async function () {
//canvascontroller will only be instantiated once

const canvasController = new CanvasController();

const initializePendulums = async () => {
  fetch(`${PROXY}/api/pendulums`)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      canvasController.pendulums = json.data;

      canvasDisplay();
    })
    .catch((err) => {
      console.log("error", err);
    });
};

const initializeTrigger = () => {
  for (let i = 0; i < NUMOFPENDULUMS; i++) {
    canvasController.canvasTriggers[i] = false;
  }
};

initializePendulums();
initializeTrigger();
// });
