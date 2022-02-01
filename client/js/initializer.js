//this file initializes the app components and controls what happens when tabs are clicked

//first and only instantiation of the canvasController
const canvasController = new CanvasController();

//function that gets all the pendulum data from the backend and pushes to the pendulum array. It gets pushed in a promise, so when the promise is complete, canvasDisplay is run
const initializePendulums = async () => {
  fetch(`${PROXY}/api/pendulums`)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      canvasController.pendulums = json.data;
      canvasDisplay();
    })
    .catch((err) => {
      console.log("error", err);
    });
};

//initializes the trigger based on the numofpendulums defined in data.
const initializeTrigger = () => {
  for (let i = 0; i < NUMOFPENDULUMS; i++) {
    canvasController.canvasTriggers[i] = false;
  }
};

//call initialization functions
initializePendulums();
initializeTrigger();

//get array of all tabs
var myTabs = document.querySelectorAll("ul.nav-tabs > li");

//function that handles what happens when a tab is clicked
function myTabClicks(tabClickEvent) {
  //removes all active class names from list tabs
  for (var i = 0; i < myTabs.length; i++) {
    myTabs[i].classList.remove("active");
  }

  var clickedTab = tabClickEvent.currentTarget;

  //add class "active" to clicked tab
  clickedTab.classList.add("active");

  tabClickEvent.preventDefault();

  //select all divs with class tab-pane
  var myContentPanes = document.querySelectorAll(".tab-pane");

  ///removes all active class names from tab-pane dives
  for (i = 0; i < myContentPanes.length; i++) {
    myContentPanes[i].classList.remove("active");
  }

  //get anchor reference and use it's href value to target the active pane
  var anchorReference = tabClickEvent.target;

  var activePaneId = anchorReference.getAttribute("href");

  var activePane = document.querySelector(activePaneId);

  //add class active to active pane
  activePane.classList.add("active");

  //call canvas load
  canvasDisplay();
}

//for each tab, add a click event listener
for (i = 0; i < myTabs.length; i++) {
  myTabs[i].addEventListener("click", myTabClicks);
}

// });
