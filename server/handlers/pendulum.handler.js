const { pendulumService } = require("../services/pendulum.service.js");

//gets all pendulums
getAllPendulums = (req, res) => {
  try {
    const allPendulums = pendulumService.findAllPendulums();
    res.status(200).json({ status: 200, data: allPendulums });
  } catch (err) {
    res.status(err.code ?? 500).json({
      status: err.code,
      ErrMsg: err.message,
    });
  }
};

//gets pendulums by id
getPendulumById = (req, res) => {
  try {
    const foundPendulum = pendulumService.findPendulum(Number(req.params.id));
    res.status(200).json({ status: 200, data: foundPendulum });
  } catch (err) {
    res.status(err.code ?? 500).json({
      status: err.code,
      ErrMsg: err.message,
    });
  }
};

//controls the pendulum, takes in a start, pause or stop control and a body for updating data
controlPendulum = (req, res) => {
  try {
    const message = pendulumService.controlPendulum(
      Number(req.params.id),
      req.body
    );
    res.status(200).json({ status: 200, message: message });
  } catch (err) {
    console.log(err);
    res.status(err.code ?? 500).json({
      status: err.code,
      ErrMsg: err.message,
    });
  }
};

module.exports = {
  getAllPendulums,
  getPendulumById,
  controlPendulum,
};
