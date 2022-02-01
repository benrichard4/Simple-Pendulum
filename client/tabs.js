// window.addEventListener("load", function () {
//   // store tabs variable
var myTabs = document.querySelectorAll("ul.nav-tabs > li");
// canvasDisplay();

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

  var anchorReference = tabClickEvent.target;

  var activePaneId = anchorReference.getAttribute("href");

  var activePane = document.querySelector(activePaneId);

  activePane.classList.add("active");

  //call canvas load
  canvasDisplay();
}

for (i = 0; i < myTabs.length; i++) {
  myTabs[i].addEventListener("click", myTabClicks);
}

// });
