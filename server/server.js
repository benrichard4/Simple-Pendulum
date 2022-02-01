const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const PORT = 8000;

const {
  getAllPendulums,
  getPendulumById,
  controlPendulum,
} = require("./handlers/pendulum.handler");

express()
  .use(cors())
  .use(morgan("tiny"))
  .use(express.json())

  //routes
  .get("/api/pendulums", getAllPendulums)
  .get("/api/pendulum/:id", getPendulumById)
  .patch("/api/pendulum/:id", controlPendulum)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is not what you're looking for",
    });
  })

  .listen(PORT, function () {
    console.info("🌍 Listening on port " + PORT);
  });
