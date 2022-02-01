const { pendulumService } = require("../services/pendulum.service.js");

// createPendulum = (payload) => {
//   let newPendulum = new Pendulum(payload);
//   pendulums.push({
//     id: newPendulum.id,
//     name:newPendulum.name,
//   });
// };

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
