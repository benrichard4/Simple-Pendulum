canvasDisplay = function () {
  //get active canvas
  let currentCanvas = document.getElementsByClassName("tab-pane active");
  let id = currentCanvas[0].id.charAt(currentCanvas[0].id.length - 1);

  playButton = document.getElementById(`play-button-${id}`);
  pauseButton = document.getElementById(`pause-button-${id}`);
  stopButton = document.getElementById(`stop-button-${id}`);

  //canvases

  let canvas = document.getElementById(`P${id}`);

  canvas.width = 754; //window.innerWidth * (2 / 3);
  canvas.height = 566; //window.innerWidth * 0.5;

  let c = canvas.getContext("2d");
  c.lineWidth = 3;

  let cc = canvasController.pendulums[id - 1];

  // if (!currentPendulumTrigger) {
  //pendulum values
  //MASS POSITIONING

  // var mass = {};
  // mass.x = canvas.width / 2;
  // mass.y = canvas.width / 2;
  // mass.radius = 30;

  //ORIGIN
  // var origin = { x: canvas.width / 2, y: canvas.width / 4 };

  //ANGLE
  angleRad = Math.atan(
    (cc.massCurrentPosition.x - cc.origin.x) /
      (cc.massCurrentPosition.y - cc.origin.y)
  );

  var angleInput = document.getElementById(`angle-input-${id}`);
  angleInput.value = angleRad;

  //LENGTH
  var length = Math.sqrt(
    Math.pow(cc.massCurrentPosition.x - cc.origin.x, 2) +
      Math.pow(cc.massCurrentPosition.y - cc.origin.y, 2)
  );

  var lengthInput = document.getElementById(`length-input-${id}`);
  lengthInput.value = length.toFixed(2);

  //OTHER
  var angularVel = 0;
  var angularAccel = 0;
  var gravity = 3;

  draw();
  // }

  //draw function
  function draw() {
    c.clearRect(0, 0, innerWidth, innerHeight);

    //horizontal plan
    c.beginPath();
    c.moveTo(cc.origin.x - 20, cc.origin.y);
    c.lineTo(cc.origin.x + 20, cc.origin.y);
    c.strokeStyle = "blue";
    c.stroke();

    // Arm;
    c.beginPath();

    c.moveTo(cc.origin.x, cc.origin.y);
    c.lineTo(cc.massCurrentPosition.x, cc.massCurrentPosition.y);
    c.strokeStyle = "blue";
    c.stroke();

    // mass
    c.beginPath();
    c.arc(
      cc.massCurrentPosition.x,
      cc.massCurrentPosition.y,
      30, //cc.massCurrentPosition.radius,
      0,
      Math.PI * 2,
      false
    );
    c.strokeStyle = "blue";
    c.stroke();
  }

  //adjusting position
  onMouseMove = (event) => {
    let mousePos = utils.getMousePos(canvas, event);
    cc.massCurrentPosition.x = mousePos.x;
    cc.massCurrentPosition.y = mousePos.y;
    draw();
  };

  onMouseUp = (event) => {
    document.body.removeEventListener("mousemove", onMouseMove);
    document.body.removeEventListener("mouseup", onMouseUp);
    lengthInput.value = Math.sqrt(
      Math.pow(cc.massCurrentPosition.x - cc.origin.x, 2) +
        Math.pow(cc.massCurrentPosition.y - cc.origin.y, 2)
    ).toFixed(2);
    length = lengthInput.value;
    angleInput.value = Math.atan(
      (cc.massCurrentPosition.x - cc.origin.x) /
        (cc.massCurrentPosition.y - cc.origin.y)
    );
    angleRad = angleInput.value;
    draw();
  };

  document.body.addEventListener("mousedown", (event) => {
    let mousePos = utils.getMousePos(canvas, event);
    if (
      utils.circlePointCollision(mousePos.x, mousePos.y, {
        ...cc.massCurrentPosition,
        radius: 30,
      })
    ) {
      document.body.addEventListener("mousemove", onMouseMove);
      document.body.addEventListener("mouseup", onMouseUp);
    }
  });

  lengthInput.addEventListener("input", (event) => {
    length = Number(event.target.value).toFixed(2);
    angleRad = angleInput.value;
    cc.massCurrentPosition.x = cc.origin.x + length * Math.sin(angleRad);
    cc.massCurrentPosition.y = cc.origin.y + length * Math.cos(angleRad);
    draw();
  });

  angleInput.addEventListener("input", (event) => {
    angleRad = event.target.value;
    length = lengthInput.value;
    cc.massCurrentPosition.x = cc.origin.x + length * Math.sin(angleRad);
    cc.massCurrentPosition.y = cc.origin.y + length * Math.cos(angleRad);
    draw();
  });

  //////////////////////////////////////////////////////////////
  //CONTROLS                                                  //
  //////////////////////////////////////////////////////////////

  if (!canvasController.canvasTriggers[id - 1]) {
    playButton.addEventListener("click", onClickPlay);
    pauseButton.addEventListener("click", onClickPause);
    stopButton.addEventListener("click", onStop);
    canvasController.setTrigger(id);
  }

  //PLAY button controls:
  function onClickPlay(event) {
    //onPlay returns a setInterval for the specific canvas
    onPlay(event).then((res) => canvasController.setCCInterval(res, id));
  }

  const onPlay = async (event) => {
    return await fetch(`${PROXY}/api/pendulum/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        origin: cc.origin,
        armLength: length,
        angle: angleRad,
        isPaused: false,
        isStopped: false,
        control: "start",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        return setInterval(() => {
          getUpdatedPosition(id).then((res) => {
            cc = res;
            // length = res.armLength;
            // angleRad = res.angle;
            // mass.x = res.massCurrentPosition.x;
            // mass.y = res.massCurrentPosition.y;
            draw();
          });
        }, 200);
      })
      .catch((err) => {});
  };

  const getUpdatedPosition = async (id) => {
    return await fetch(`${PROXY}/api/pendulum/${id}`)
      .then((res) => res.json())
      .then((json) => {
        return json.data;
      })
      .catch((err) => {});
  };

  //pause button controls

  function onClickPause(event) {
    onPause();
  }
  async function onPause(event) {
    fetch(`${PROXY}/api/pendulum/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        isPaused: true,
        control: "pause",
      }),
    })
      .then(() => {
        getUpdatedPosition(id).then((res) => {
          cc = res;
          // mass.x = res.massCurrentPosition.x;
          // mass.y = res.massCurrentPosition.y;
          draw();
        });
        clearInterval(canvasController.intervals[id - 1]);
        canvasController.intervals[id - 1] = undefined;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //stop button

  async function onStop(event) {
    fetch(`${PROXY}/api/pendulum/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        isStopped: true,
        control: "stop",
      }),
    })
      .then(() => {
        getUpdatedPosition(id).then((res) => {
          cc = res;
          // mass.x = res.massCurrentPosition.x;
          // mass.y = res.massCurrentPosition.y;
          draw();
        });

        clearInterval(canvasController.intervals[id - 1]);

        canvasController.intervals[id - 1] = undefined;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // animate();
};
