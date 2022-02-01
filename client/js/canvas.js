//function that controls the large canvas displayed in the tab
canvasDisplay = function () {
  //get active canvas id
  let currentCanvas = document.getElementsByClassName("tab-pane active");
  let id = currentCanvas[0].id.charAt(currentCanvas[0].id.length - 1);

  //define canvases
  let canvas = document.getElementById(`P${id}`);

  canvas.width = 750;
  canvas.height = 560;

  let c = canvas.getContext("2d");
  c.lineWidth = 3;

  //define control buttons
  playButton = document.getElementById(`play-button-${id}`);
  pauseButton = document.getElementById(`pause-button-${id}`);
  stopButton = document.getElementById(`stop-button-${id}`);

  //define shortcut for location in pendulums in canvasController
  let cc = canvasController.pendulums[id - 1];

  //set the angleInput value to the angle
  let angleInput = document.getElementById(`angle-input-${id}`);
  angleInput.value = cc.angle;
  angleInput.nextElementSibling.value = (
    Number(angleInput.value) * 57.2958
  ).toFixed(1);

  //set the lengthInput value to the armLength
  let lengthInput = document.getElementById(`length-input-${id}`);
  lengthInput.value = Number(cc.armLength).toFixed(2);
  lengthInput.nextElementSibling.value = Number(lengthInput.value).toFixed(0);

  //set the mass.radius to the mass
  let massInput = document.getElementById(`mass-input-${id}`);
  massInput.value = Number(cc.massCurrentPosition.radius);
  massInput.nextElementSibling.value = Number(massInput.value);

  //OTHER not used for now
  var angularVel = 0;
  var angularAccel = 0;
  var gravity = 3;

  //call draw function
  draw();

  //draw function
  function draw() {
    c.clearRect(0, 0, innerWidth, innerHeight);

    //horizontal plane
    c.beginPath();
    c.moveTo(cc.origin.x - 20, cc.origin.y);
    c.lineTo(cc.origin.x + 20, cc.origin.y);
    c.strokeStyle = "rgb(0, 39, 124)";
    c.stroke();

    // Arm;
    c.beginPath();
    c.moveTo(cc.origin.x, cc.origin.y);
    c.lineTo(cc.massCurrentPosition.x, cc.massCurrentPosition.y);
    c.strokeStyle = "rgb(0, 39, 124)";
    c.stroke();

    // mass
    c.beginPath();
    c.arc(
      cc.massCurrentPosition.x,
      cc.massCurrentPosition.y,
      cc.massCurrentPosition.radius,
      0,
      Math.PI * 2,
      false
    );
    c.strokeStyle = "rgb(0, 39, 124)";
    c.fillStyle = "rgb(0, 39, 124)";
    c.fill();
    c.stroke();
  }

  //event listener for canvas when clicked inside
  canvas.addEventListener("mousedown", onMouseDown);

  //controls what happens when the mass/bob is clicked. If there is a collision, continue to mousemove and mouseup functions
  function onMouseDown(event) {
    let mousePos = utils.getMousePos(canvas, event);
    if (
      utils.circlePointCollision(mousePos.x, mousePos.y, {
        ...cc.massCurrentPosition,
        radius: 30,
      })
    ) {
      canvas.addEventListener("mousemove", onMouseMove);
      canvas.addEventListener("mouseup", onMouseUp);
    }
  }

  //function that redraws on mousemove when you have the mass clicked
  function onMouseMove(event) {
    let mousePos = utils.getMousePos(canvas, event);
    cc.massCurrentPosition.x = mousePos.x;
    cc.massCurrentPosition.y = mousePos.y;
    draw();
  }

  //when mouse button is released, remove event listeners, set the approriate varibales to the pendulum array. draw the final outcome
  function onMouseUp(event) {
    canvas.removeEventListener("mousemove", onMouseMove);
    canvas.removeEventListener("mouseup", onMouseUp);
    let mousePos = utils.getMousePos(canvas, event);

    cc.massCurrentPosition.x = mousePos.x;
    cc.massCurrentPosition.y = mousePos.y;
    lengthInput.value = Math.sqrt(
      Math.pow(cc.massCurrentPosition.x - cc.origin.x, 2) +
        Math.pow(cc.massCurrentPosition.y - cc.origin.y, 2)
    ).toFixed(2);
    lengthInput.nextElementSibling.value = Number(lengthInput.value).toFixed(0);
    cc.armLength = lengthInput.value;
    angleInput.value = Math.atan(
      (cc.massCurrentPosition.x - cc.origin.x) /
        (cc.massCurrentPosition.y - cc.origin.y)
    );
    angleInput.nextElementSibling.value = (
      Number(angleInput.value) * 57.2958
    ).toFixed(1);
    cc.angle = angleInput.value;
    cc.massCurrentPosition.x = cc.origin.x + cc.armLength * Math.sin(cc.angle);
    cc.massCurrentPosition.y = cc.origin.y + cc.armLength * Math.cos(cc.angle);
    cc.massInitialPosition.x = cc.origin.x + cc.armLength * Math.sin(cc.angle);
    cc.massInitialPosition.y = cc.origin.y + cc.armLength * Math.cos(cc.angle);
    draw();
  }

  //when the lengthinput is adjusted, set values and redraw the pendulum
  lengthInput.addEventListener("input", (event) => {
    cc.armLength = Number(event.target.value).toFixed(2);
    cc.angle = angleInput.value;
    cc.massCurrentPosition.x = cc.origin.x + cc.armLength * Math.sin(cc.angle);
    cc.massCurrentPosition.y = cc.origin.y + cc.armLength * Math.cos(cc.angle);
    cc.massInitialPosition.x = cc.origin.x + cc.armLength * Math.sin(cc.angle);
    cc.massInitialPosition.y = cc.origin.y + cc.armLength * Math.cos(cc.angle);
    draw();
  });

  //when the angleinput is adjusted, set values and redraw the pendulum
  angleInput.addEventListener("input", (event) => {
    cc.angle = event.target.value;
    cc.armLength = lengthInput.value;
    cc.massCurrentPosition.x = cc.origin.x + cc.armLength * Math.sin(cc.angle);
    cc.massCurrentPosition.y = cc.origin.y + cc.armLength * Math.cos(cc.angle);
    cc.massInitialPosition.x = cc.origin.x + cc.armLength * Math.sin(cc.angle);
    cc.massInitialPosition.y = cc.origin.y + cc.armLength * Math.cos(cc.angle);
    draw();
  });

  massInput.addEventListener("input", (event) => {
    cc.massCurrentPosition.radius = event.target.value;
    cc.massInitialPosition.radius = event.target.value;
    draw();
  });
  //////////////////////////////////////////////////////////////
  //CONTROLS                                                  //
  //////////////////////////////////////////////////////////////

  //only add an event listener the first time, the tab is click and canvas function is called
  if (!canvasController.canvasTriggers[id - 1]) {
    playButton.addEventListener("click", onClickPlay);
    pauseButton.addEventListener("click", onClickPause);
    stopButton.addEventListener("click", onClickStop);
    canvasController.setTrigger(id);
  }

  //PLAY button controls:
  function onClickPlay(event) {
    event.preventDefault();
    canvas.removeEventListener("mousedown", onMouseDown);
    playButton.disabled = true;
    pauseButton.disabled = false;
    stopButton.disabled = false;
    lengthInput.disabled = true;
    angleInput.disabled = true;
    massInput.disabled = true;
    //onPlay returns a setInterval for the specific canvas
    onPlay(event).then((res) => canvasController.setCCInterval(res, id));
  }

  const onPlay = async () => {
    return await fetch(`${PROXY}/api/pendulum/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        origin: cc.origin,
        armLength: cc.armLength,
        angle: cc.angle,
        initialPos: cc.massInitialPosition,
        isPaused: false,
        isStopped: false,
        control: "start",
      }),
    })
      .then(() => {
        return setInterval(() => {
          getUpdatedPosition(id).then((res) => {
            //set the pendulum array element to the response(pendulum received from backend), then draw
            cc = res;
            draw();
          });
        }, 200);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //async function that gets the updated position from the back end
  const getUpdatedPosition = async (id) => {
    return await fetch(`${PROXY}/api/pendulum/${id}`)
      .then((res) => res.json())
      .then((json) => {
        return json.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //pause button controls

  function onClickPause() {
    playButton.disabled = false;
    pauseButton.disabled = true;
    stopButton.disabled = false;
    lengthInput.disabled = true;
    angleInput.disabled = true;
    massInput.disabled = true;
    onPause();
  }
  async function onPause() {
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
          //set the pendulum array element to the response(pendulum received from backend), then draw
          cc = res;
          draw();
        });
        //clear the interval
        clearInterval(canvasController.intervals[id - 1]);
        canvasController.intervals[id - 1] = undefined;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //stop button

  function onClickStop() {
    canvas.addEventListener("mousedown", onMouseDown);
    playButton.disabled = false;
    pauseButton.disabled = true;
    stopButton.disabled = true;
    lengthInput.disabled = false;
    angleInput.disabled = false;
    massInput.disabled = false;
    onStop();
  }

  async function onStop() {
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
          //set the pendulum array element to the response(pendulum received from backend), then draw
          cc = res;
          draw();
        });

        //clear the interval
        clearInterval(canvasController.intervals[id - 1]);

        canvasController.intervals[id - 1] = undefined;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
