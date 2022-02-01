//this class is instantiated only once and holds all the updated values of the pendulums, the setintervals and the trigger. The trigger just lets the program know if it is the first time in canvas.js for a secific id.
class CanvasController {
  pendulums = [];
  intervals = [];
  canvasTriggers = [];

  setCCInterval = (int, id) => {
    this.intervals[id - 1] = int;
  };

  setTrigger = (id) => {
    this.canvasTriggers[id - 1] = true;
  };
}
