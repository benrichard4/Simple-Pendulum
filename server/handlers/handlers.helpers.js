const { pendulums } = require("../data/pendulums.js");

const findPendulum = (id) => {
  return pendulums.find((pendulum) => pendulum.id === id);
};

const updatePosition = (foundPendulum) => {
  console.log("inupdate");
  let fp = foundPendulum;
  let force = fp.gravity * Math.sin(fp.angle);
  fp.angularAccel = (-1 * force) / fp.armLength;
  fp.angularVel += fp.angularAccel;
  fp.angle += fp.angularVel;

  fp.massCurrentPosition.x = fp.origin.x + fp.armLength * Math.sin(fp.angle);
  fp.massCurrentPosition.y = fp.origin.y + fp.armLength * Math.cos(fp.angle);
  console.log(fp.id, fp.massCurrentPosition);
};

const initializePosition = (id) => {};

module.exports = { findPendulum, updatePosition, initializePosition };
