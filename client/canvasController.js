class CanvasController {
  pendulums = [];
  intervals = [];
  canvasTriggers = [];

  updatePendulum = async () => {
    pendulums = await data();
  };

  setCCInterval = (int, id) => {
    this.intervals[id - 1] = int;
  };

  setTrigger = (id) => {
    this.canvasTriggers[id - 1] = true;
  };

  //play

  //pause

  //stop
}
