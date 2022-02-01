//this file builds the html through the dom. It relies on the NUMOFPENDULUMS so that the interface can potentially be dynamic.

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

  //defining small canvas for future pendulum display in tab, for now, just using it as spacer to size tab (see styles.css)
  const smallCanvas = document.createElement("canvas");
  smallCanvas.id = `PS${1}`;
  smallCanvas.classList.add("tab-canvas");
  listItem.appendChild(smallCanvas);

  //attach the tab content (see template below)
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

  const adjustableInputGroup = document.createElement("div");
  adjustableInputGroup.classList.add("adjustable-input");
  inputContainer.appendChild(adjustableInputGroup);

  const lengthInputGroup = document.createElement("div");
  lengthInputGroup.classList.add("input-group");
  adjustableInputGroup.appendChild(lengthInputGroup);

  const lengthLabel = document.createElement("label");
  lengthLabel.htmlFor = `length-input-${i}`;
  lengthLabel.innerText = "Length";
  lengthInputGroup.appendChild(lengthLabel);

  const lengthInput = document.createElement("input");
  lengthInput.id = `length-input-${i}`;
  lengthInput.setAttribute("type", "range");
  lengthInput.setAttribute("min", "40");
  lengthInput.setAttribute("max", "300");
  lengthInput.setAttribute("step", "1");
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
  adjustableInputGroup.appendChild(angleInputGroup);

  const angleLabel = document.createElement("label");
  angleLabel.htmlFor = `angle-input-${i}`;
  angleLabel.innerText = "Angle";
  angleInputGroup.appendChild(angleLabel);

  const angleInput = document.createElement("input");
  angleInput.id = `angle-input-${i}`;
  angleInput.setAttribute("type", "range");
  // angleInput.setAttribute("min", `0`);
  // angleInput.setAttribute("max", `${2.01 * Math.PI}`);
  angleInput.setAttribute("min", `${-Math.PI / 2}`);
  angleInput.setAttribute("max", `${Math.PI / 2}`);
  angleInput.setAttribute("step", `${Math.PI / 32400}`);
  angleInput.setAttribute("value", "0");
  angleInput.setAttribute(
    "oninput",
    "this.nextElementSibling.value = (Number(this.value) * 57.2958).toFixed(1)"
  );
  angleInputGroup.appendChild(angleInput);

  const angleOutput = document.createElement("output");
  angleOutput.innerText = "0";
  angleInputGroup.appendChild(angleOutput);

  const massInputGroup = document.createElement("div");
  massInputGroup.classList.add("input-group");
  adjustableInputGroup.appendChild(massInputGroup);

  const massLabel = document.createElement("label");
  massLabel.htmlFor = `mass-input-${i}`;
  massLabel.innerText = "Mass";
  massInputGroup.appendChild(massLabel);

  const massInput = document.createElement("input");
  massInput.id = `mass-input-${i}`;
  massInput.setAttribute("type", "range");
  // massInput.setAttribute("min", `0`);
  // massInput.setAttribute("max", `${2.01 * Math.PI}`);
  massInput.setAttribute("min", `5`);
  massInput.setAttribute("max", `50`);
  massInput.setAttribute("step", "5");
  massInput.setAttribute("value", "25");
  massInput.setAttribute(
    "oninput",
    "this.nextElementSibling.value = Number(this.value)"
  );
  massInputGroup.appendChild(massInput);

  const massOutput = document.createElement("output");
  massOutput.innerText = "25";
  massInputGroup.appendChild(massOutput);

  const buttonsInputGroup = document.createElement("div");
  buttonsInputGroup.classList.add("input-group");
  buttonsInputGroup.style.gap = "20px 0";
  inputContainer.appendChild(buttonsInputGroup);

  const playButton = document.createElement("button");
  playButton.id = `play-button-${i}`;
  playButton.classList.add("play-button");
  playButton.innerText = "Play";
  buttonsInputGroup.appendChild(playButton);

  const pauseButton = document.createElement("button");
  pauseButton.id = `pause-button-${i}`;
  pauseButton.classList.add("pause-button");
  pauseButton.innerText = "Pause";
  pauseButton.disabled = true;
  buttonsInputGroup.appendChild(pauseButton);

  const stopButton = document.createElement("button");
  stopButton.id = `stop-button-${i}`;
  stopButton.classList.add("stop-button");
  stopButton.innerText = "Stop";
  stopButton.disabled = true;
  buttonsInputGroup.appendChild(stopButton);
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
                <div class="adjustable-input">
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
                </div>  
                <div class="input-group">
                <button id="play-button-1" class="play-button">play</button>
                <button id="pause-button-1" class="pause-button">pause</button>
                <button id="stop-button-1" class="stop-button">stop</button>
                </div>
              </div>
            </div>
          </div> */
