var canvas = document.getElementById("P1");
console.log(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerWidth;

// fitToContainer(canvas);

// function fitToContainer(canvas) {
//   // Make it visually fill the positioned parent
//   canvas.style.width = "100%";
//   canvas.style.height = "100%";
//   // ...then set the internal size to match
//   canvas.width = canvas.offsetWidth;
//   canvas.height = canvas.offsetHeight;
// }

var c = canvas.getContext("2d");

// c.fillStyle = "rgba(255, 0, 0, 0.5)";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "rgba(0, 0, 255, 0.5)";
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = "rgba(0, 255, 0, 0.5)";
// c.fillRect(300, 300, 100, 100);

//Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "blue";
// c.stroke();

//arc/circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "red";
// c.stroke();

// for (let i = 0; i < 100; i++) {
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
//   colorNumR = Math.random() * 255;
//   colorNumG = Math.random() * 255;
//   colorNumB = Math.random() * 255;
//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI * 2, false);
//   c.strokeStyle = `rgba(${colorNumR}, ${colorNumG}, ${colorNumB})`;
//   c.stroke();
// }

// c.beginPath();
// c.arc(200, 200, 30, 0, Math.PI * 2, false);
// c.strokeStyle = `blue`;
// c.stroke();

// function Circle(x, y) {
//   this.x = x;
//   this.y = y;

//   this.draw = function () {
//     c.beginPath();
//     c.arc(x, y, radius, 0, Math.PI * 2, false);
//     c.strokeStyle = `blue`;
//     c.stroke();
//   };

//   this.update = function () {};
// }

// var circle = new Circle(200, 200);
// circle.draw();

// var x = Math.random() * innerWidth;
// var y = Math.random() * innerHeight;
// var dx = (Math.random() - 0.5) * 20;
// var dy = (Math.random() - 0.5) * 20;
// var radius = 30;
// function animate() {
//   requestAnimationFrame(animate);

//   c.clearRect(0, 0, innerWidth, innerHeight);

//   circle.draw();

//   c.beginPath();
//   c.arc(x, y, radius, 0, Math.PI * 2, false);
//   c.strokeStyle = `blue`;
//   c.stroke();

//   if (x + radius > innerWidth || x - radius < 0) {
//     dx = -dx;
//   }

//   if (y + radius > innerHeight || y - radius < 0) {
//     dy = -dy;
//   }

//   x += dx;
//   y += dy;
// }

let angleRad = Math.PI / 4; //30;
let angularVel = 0;
let angularAccel = 0;
let gravity = 3;
let length = 300;
let massRadius = 30;
let origin = { x: 300, y: 300 };
let mass = {};

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  // let angleRad = (angle * Math.PI) / 180;

  let force = gravity * Math.sin(angleRad);
  angularAccel = (-1 * force) / length;
  angularVel += angularAccel;
  angleRad += angularVel;

  mass.x = origin.x + length * Math.sin(angleRad);
  mass.y = origin.y + length * Math.cos(angleRad);

  // Arm;
  c.beginPath();
  c.moveTo(origin.x, origin.y);
  c.lineTo(mass.x, mass.y);
  c.strokeStyle = "blue";
  c.stroke();

  // mass
  c.beginPath();
  c.arc(mass.x, mass.y, massRadius, 0, Math.PI * 2, false);
  c.strokeStyle = "blue";
  c.stroke();
}

animate();
