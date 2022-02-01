const { pendulums } = require("../data/pendulums.js");

//singlteton which is instantiated only once. keeps logic for controlling pendulums and setInterval instances.

class PendulumService {
  intervals = [];

  //function that gets all pendulums
  findAllPendulums() {
    try {
      let allPendulums = pendulums;
      return allPendulums;
    } catch (err) {
      if (err.error) {
        const error = new Error(err.error);
        error.code = 404;
        throw error;
      } else {
        throw err;
      }
    }
  }

  //funciton that finds pendulum
  findPendulum(id) {
    try {
      let foundPendulums = pendulums.find((pendulum) => pendulum.id === id);
      if (!foundPendulums) {
        throw { error: `No pendulum with id:${id} found` };
      } else {
        return foundPendulums;
      }
    } catch (err) {
      if (err.error) {
        const error = new Error(err.error);
        error.code = 404;
        throw error;
      } else {
        throw err;
      }
    }
  }

  //funcition that controls pendulum's position. Takes in control (start, pause, stop) and a body for new initial parameters
  controlPendulum(id, body) {
    try {
      const { control } = body;
      //---------CONTROL = START-------------
      if (control === "start") {
        const { origin, armLength, angle, isPaused, isStopped, initialPos } =
          body;

        //if the pendulum is not stopped, throw error
        if (isPaused !== false || isStopped !== false) {
          throw { error: "Pendulum not stopped" };
        }

        //find pendulum
        const foundPendulum = this.findPendulum(id);

        //if paused, continue where left off
        if (foundPendulum.isPaused === true) {
          foundPendulum.isPaused = isPaused;

          //save instance of interval in interval at position relating to id
          this.intervals[id] = setInterval(() => {
            this.updatePosition(foundPendulum);
          }, 15);
        }

        //if stopped, reset parameters from body and start over
        if (foundPendulum.isStopped === true) {
          //set new parameters
          foundPendulum.origin = origin;
          foundPendulum.armLength = armLength;
          foundPendulum.angle = angle;
          foundPendulum.isPaused = isPaused;
          foundPendulum.isStopped = isStopped;
          foundPendulum.gravity = 1;
          foundPendulum.angularAccel = 0;
          foundPendulum.angularVel = 0;
          foundPendulum.massInitialPosition = initialPos;
          foundPendulum.massInitialPosition.radius = initialPos.radius;
          foundPendulum.massCurrentPosition.radius = initialPos.radius;

          //start pendulum movement:
          this.intervals[id] = setInterval(() => {
            this.updatePosition(foundPendulum);
          }, 15);
        }

        return `Pendulum ${id} has started`;
        //---------CONTROL = PAUSE-------------
      } else if (control === "pause") {
        const { isPaused } = body;

        //find pendulum
        const foundPendulum = this.findPendulum(id);

        if (!("isPaused" in body)) {
          throw { error: 'missing in body "isPaused=true"' };
        }

        foundPendulum.isPaused = isPaused;

        //clear interval to stop updating the position
        clearInterval(this.intervals[id]);
        return `Pendulum ${id} has paused`;
        //---------CONTROL = STOP-------------
      } else if (control === "stop") {
        const { isStopped } = body;
        const foundPendulum = this.findPendulum(id);

        if (!("isStopped" in body)) {
          throw { error: 'missing in body "isStopped=true"' };
        }

        //update data
        foundPendulum.isPaused = false;
        foundPendulum.isStopped = isStopped;
        foundPendulum.massCurrentPosition = foundPendulum.massInitialPosition;

        //stop the interval from getting new position data
        clearInterval(this.intervals[id]);

        return `Pendulum ${id} has stopped`;
      }
    } catch (err) {
      if (err.error) {
        const error = new Error(err.error);
        error.code = 404;
        throw error;
      } else {
        throw err;
      }
    }
  }

  //helper that updates position of bob/mass
  updatePosition(foundPendulum) {
    let fp = foundPendulum;
    let force = fp.gravity * Math.sin(Number(fp.angle));

    fp.angularAccel = (-1 * force) / Number(fp.armLength);

    fp.angularVel += fp.angularAccel;
    fp.angle = Number(fp.angle) + fp.angularVel;

    fp.massCurrentPosition.x =
      fp.origin.x + Number(fp.armLength) * Math.sin(Number(fp.angle));
    fp.massCurrentPosition.y =
      fp.origin.y + Number(fp.armLength) * Math.cos(Number(fp.angle));
  }
}

module.exports = { pendulumService: new PendulumService() };
