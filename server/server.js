const express = require("express");
const morgan = require("morgan");

const PORT = 8000;

const { getPendulumById, controlPendulum } = require("./handlers/pendulum");

express()
  .use(morgan("tiny"))
  .use(express.json())

  //routes

  // .get("/", (req, res) => {
  //   res.status(200).json({ status: 200, message: "Welcome" });
  // }

  .get("/pendulum/:id", getPendulumById)
  .get("/pendulum/:id/position", getCurrentPosition)
  // .patch("/pendulum/:id", updatePosition)
  .patch("/pendulum/:id/:control", controlPendulum) //updates with most up to date
  // .patch("/pendulum/:id/pause", pausePendulum)
  // .patch("/pendulum/:id/stop", stopPendulum)

  //.use(require("./routes/pendulum"))

  .get("*", (req, res) => {
    console.log("inside");
    res.status(404).json({
      status: 404,
      message: "This is not what you're looking for",
    });
  })

  .listen(PORT, function () {
    console.info("🌍 Listening on port " + PORT);
  });
