const { pendulums } = require("../data/pendulums.js");

class PendulumService {
  intervals = [];

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

  controlPendulum(id, body) {
    try {
      const { control } = body;
      //---------CONTROL = START-------------
      if (control === "start") {
        const { origin, armLength, angle, isPaused, isStopped } = body;

        if (isPaused !== false || isStopped !== false) {
          throw { error: "Pendulum not stopped" };
        }

        //find pendulum
        const foundPendulum = this.findPendulum(id);

        //if paused, continue where left off
        if (foundPendulum.isPaused === true) {
          foundPendulum.isPaused = isPaused;

          this.intervals[id] = setInterval(() => {
            this.updatePosition(foundPendulum);
          }, 15);
        }

        //if stopped, reset parameters and start over
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
        // if (
        //   foundPendulum.isStopped === true ||
        //   foundPendulum.isPaused === true
        // ) {
        //   throw { error: "Pendulum is already stopped" };
        // }

        foundPendulum.isPaused = isPaused;

        clearInterval(this.intervals[id]);
        return `Pendulum ${id} has paused`;
        //---------CONTROL = STOP-------------
      } else if (control === "stop") {
        const { isStopped } = body;
        const foundPendulum = this.findPendulum(id);

        if (!("isStopped" in body)) {
          throw { error: 'missing in body "isStopped=true"' };
        }
        // if (foundPendulum.isStopped === true) {
        //   throw { error: "Pendulum is already stopped" };
        // }

        foundPendulum.isPaused = false;
        foundPendulum.isStopped = isStopped;

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
    console.log(fp.id, fp.massCurrentPosition);
  }
}

module.exports = { pendulumService: new PendulumService() };
