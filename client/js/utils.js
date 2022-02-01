var utils = {
  //function that gets the distance between two points
  distanceXY: function (x0, y0, x1, y1) {
    var dx = x1 - x0;
    var dy = y1 - y0;
    return Math.sqrt(dx * dx + dy * dy);
  },

  //funciton that takes in a point and a circle object (midpoint & radius) and returns true if there is a collission
  circlePointCollision: function (x, y, circle) {
    return utils.distanceXY(x, y, circle.x, circle.y) < circle.radius;
  },

  //function that calculates the offset mouse position related to the size and position of the canvas
  getMousePos: function (canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width, // relationship bitmap vs. element for X
      scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y

    return {
      x: (evt.clientX - rect.left) * scaleX, // scale mouse coordinates after they have
      y: (evt.clientY - rect.top) * scaleY, // been adjusted to be relative to element
    };
  },
};
