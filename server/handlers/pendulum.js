const { pendulums } = require("../data/pendulums");

const { findPendulum, updatePosition } = require("./handlers.helpers.js");
// createPendulum = (payload) => {
//   let newPendulum = new Pendulum(payload);
//   pendulums.push({
//     id: newPendulum.id,
//     name:newPendulum.name,
//   });
// };

getPendulumById = (req, res) => {
  const id = Number(req.params.id);

  const foundPendulum = findPendulum(id);

  res.status(200).json({ pendulum: foundPendulum });
};

// getInitialPosition = (req, res) => {
//   const { id } = req.params;
//   const foundPendulum = pendulums.find((pendulum) => pendulum.id === id);
//   foundPendulum.massInitialPosition.x =
//     foundPendulum.origin.x +
//     foundPendulum.armLength * Math.sin(foundPendulum.angle);
//   foundPendulum.massInitialPosition.y =
//     foundPendulum.origin.y +
//     foundPendulum.armLength * Math.cos(foundPendulum.angle);
//   res.status(200).json({ pendulum: foundPendulum });
// };

getCurrentPosition = (req, res) => {
  const { id } = req.params;
  const foundCurrentPosition = pendulums.find((pendulum) => {
    if (pendulum.id === id) {
      return pendulum.massCurrentPosition;
    }
  });
  res.status(200).json({ status: 200, data: foundCurrentPosition });
};

//gets new params from fe and starts setinterval
//req.body ={
// armLength
// angle
// isPaused = false
// isStopped = false
//}
const intervals = [];
controlPendulum = (req, res) => {
  const id = Number(req.params.id);
  const control = req.params.control;

  if (control === "start") {
    const { armLength, angle, isPaused, isStopped } = req.body;
    if (isPaused !== false || isStopped !== false) {
      return res.status(400).json({ ErrMsg: "need to stop pendulum" });
    }
    //find pendulum
    const foundPendulum = findPendulum(id);
    //set new parameters
    foundPendulum.armLength = armLength;
    foundPendulum.angle = angle;
    foundPendulum.isPaused = isPaused;
    foundPendulum.isStopped = isStopped;
    //start pendulum movement:

    intervals[id] = setInterval(() => {
      updatePosition(foundPendulum);
    }, 1000);

    console.log("after", intervals);
    res.status(200).json({ status: 200, message: `${id} has started` });
  }
  if (control === "pause") {
    console.log(intervals);
    clearInterval(intervals[id]);
    res.status(200).json({ status: 200, message: `${id} has paused` });
  }
};

//gets new params from fe and starts setinterval
//req.body ={
// isPaused = true
//}
pause = (req, res) => {
  const id = Number(req.params.id);
  const { isPaused } = req.body;
  const foundPendulum = findPendulum(id);
  if (isPaused !== true || foundPendulum.isStopped !== true) {
    return res.status(400).json({ ErrMsg: "need to stop pendulum" });
  }
  clearInterval(currentPosition);
};

// let Pendulum1 = new Pendulum({
//   x: 300,
//   y: 300,
//   length: 300,
//   angle: Math.PI / 4,
//   interval: 1000,
//   isPaused: false,
//   isStopped: false,
// });

module.exports = { getPendulumById, controlPendulum };
