// window.addEventListener("load", function () {
// store tabs variable

const unorderedList = document.getElementById("list-holder");
const tabContent = document.getElementById("tab-content");

for (let i = 1; i <= NUMOFPENDULUMS; i++) {
  //attach the tab list items
  const listItem = document.createElement("li");
  if (i === 1) {
    listItem.classList.add("active");
  }
  unorderedList.appendChild(listItem);

  const anchorTag = document.createElement("a");
  anchorTag.href = `#tab-${i}`;
  anchorTag.innerText = `P${i}`;
  listItem.appendChild(anchorTag);

  const smallCanvas = document.createElement("canvas");
  smallCanvas.id = `PS${1}`;
  smallCanvas.classList.add("tab-canvas");
  listItem.appendChild(smallCanvas);

  //attach the tab content
  const tabContainer = document.createElement("div");
  tabContainer.id = `tab-${i}`;
  tabContainer.classList.add("tab-pane");
  if (i === 1) {
    tabContainer.classList.add("active");
  }
  tabContent.appendChild(tabContainer);

  const tabContentSpecific = document.createElement("div");
  tabContentSpecific.id = `tab-contents-${i}`;
  tabContentSpecific.classList.add("canvas-input-container");
  tabContainer.appendChild(tabContentSpecific);

  const canvasContainer = document.createElement("div");
  canvasContainer.id = `canvas-container-${i}`;
  canvasContainer.classList.add("canvas-container");
  tabContentSpecific.appendChild(canvasContainer);

  const pendulumTitle = document.createElement("h3");
  pendulumTitle.innerText = `Pendulum ${i}`;
  canvasContainer.appendChild(pendulumTitle);

  const largeCanvas = document.createElement("canvas");
  largeCanvas.id = `P${i}`;
  largeCanvas.classList.add("full-canvas");
  canvasContainer.appendChild(largeCanvas);

  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");
  tabContentSpecific.appendChild(inputContainer);

  const lengthInputGroup = document.createElement("div");
  lengthInputGroup.classList.add("input-group");
  inputContainer.appendChild(lengthInputGroup);

  const lengthLabel = document.createElement("label");
  lengthLabel.htmlFor = `length-input-${i}`;
  lengthLabel.innerText = "Length";
  lengthInputGroup.appendChild(lengthLabel);

  const lengthInput = document.createElement("input");
  lengthInput.id = `length-input-${i}`;
  lengthInput.setAttribute("type", "range");
  lengthInput.setAttribute("min", "40");
  lengthInput.setAttribute("max", "300");
  lengthInput.setAttribute("step", "0.1");
  lengthInput.setAttribute("value", "200");
  lengthInput.setAttribute(
    "oninput",
    "this.nextElementSibling.value = this.value"
  );
  lengthInputGroup.appendChild(lengthInput);

  const lengthOutput = document.createElement("output");
  lengthOutput.innerText = "200";
  lengthInputGroup.appendChild(lengthOutput);

  const angleInputGroup = document.createElement("div");
  angleInputGroup.classList.add("input-group");
  inputContainer.appendChild(angleInputGroup);

  const angleLabel = document.createElement("label");
  angleLabel.htmlFor = `angle-input-${i}`;
  angleLabel.innerText = "Angle";
  angleInputGroup.appendChild(angleLabel);

  const angleInput = document.createElement("input");
  angleInput.id = `angle-input-${i}`;
  angleInput.setAttribute("type", "range");
  angleInput.setAttribute("min", `${-Math.PI / 2}`);
  angleInput.setAttribute("max", `${Math.PI / 2}`);
  angleInput.setAttribute("step", "0.1");
  angleInput.setAttribute("value", "0");
  angleInput.setAttribute(
    "oninput",
    "this.nextElementSibling.value = Number(this.value).toFixed(3)"
  );
  angleInputGroup.appendChild(angleInput);

  const angleOutput = document.createElement("output");
  angleOutput.innerText = "0";
  angleInputGroup.appendChild(angleOutput);

  const playButton = document.createElement("button");
  playButton.id = `play-button-${i}`;
  playButton.classList.add("play-button");
  playButton.innerText = "Play";
  inputContainer.appendChild(playButton);

  const pauseButton = document.createElement("button");
  pauseButton.id = `pause-button-${i}`;
  pauseButton.classList.add("pause-button");
  pauseButton.innerText = "Pause";
  inputContainer.appendChild(pauseButton);

  const stopButton = document.createElement("button");
  stopButton.id = `stop-button-${i}`;
  stopButton.classList.add("stop-button");
  stopButton.innerText = "Stop";
  inputContainer.appendChild(stopButton);
}
// });

//TAB CONTENT TEMPLATE
/* <div id="tab-content" class="tab-content">
          <div id="tab-1" class="tab-pane active">
            <div id="tab-contents-1" class="canvas-input-container">
              <div id="canvas-container-1" class="canvas-container">
                <h3>Pendulum 1</h3>
                <canvas id="P1" class="full-canvas"></canvas>
              </div>
              <div class="input-container">
                <div class="input-group">
                  <label for="length-input-1">Length</label>
                  <input
                    id="length-input-1"
                    type="range"
                    min="40"
                    max="300"
                    step="0.1"
                    value="200"
                    oninput="this.nextElementSibling.value = this.value"
                  />
                  <output>200</output>
                </div>
                <div class="input-group">
                  <label for="angle-input-1">Angle</label>
                  <input
                    id="angle-input-1"
                    type="range"
                    min="-1.5"
                    max="1.5"
                    step="0.01"
                    value="0"
                    oninput="this.nextElementSibling.value = this.value"
                  />
                  <output>0</output>
                </div>
                <button id="play-button-1" class="play-button">play</button>
                <button id="pause-button-1" class="pause-button">pause</button>
              </div>
            </div>
          </div> */
