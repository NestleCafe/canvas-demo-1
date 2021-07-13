const color = document.querySelector(".color");
const pixSize = document.querySelector(".pixSize");
const clearButton = document.querySelector("button");

color.addEventListener("change", () => {
  ctx.strokeStyle = `${color.value}`;
});
pixSize.addEventListener("change", () => {
  ctx.lineWidth = `${pixSize.value}`;
});

const canvas = document.getElementById("canvas");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight * 0.8;

let offsetTop = canvas.getBoundingClientRect().top; // 计算顶部偏移量

var ctx = canvas.getContext("2d");
ctx.strokeStyle = `${color.value}`;
ctx.lineWidth = `${pixSize.value}`;
ctx.lineCap = "round";

let lastPoint;
let paintingStatus = false;

clearButton.onclick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1 - offsetTop);
  ctx.lineTo(x2, y2 - offsetTop);
  ctx.stroke();
}
var isTouchDevice = "ontouchstart" in document.documentElement;
if (isTouchDevice) {
  canvas.ontouchstart = (e) => {
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    lastPoint = [x, y];
  };
  canvas.ontouchmove = (e) => {
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    drawLine(lastPoint[0], lastPoint[1], x, y);
    lastPoint = [x, y];
  };
} else {
  canvas.onmousedown = (e) => {
    paintingStatus = true;
    drawLine(e.clientX, e.clientY, e.clientX, e.clientY); //按下也要画出来
    lastPoint = [e.clientX, e.clientY];
  };

  canvas.onmouseup = () => {
    paintingStatus = false;
  };
  canvas.onmousemove = (e) => {
    if (paintingStatus === true) {
      drawLine(lastPoint[0], lastPoint[1], e.clientX, e.clientY);
      lastPoint = [e.clientX, e.clientY];
    }
  };
}

document.body.addEventListener('touchmove', function (e) {
  e.preventDefault(); 
}, {passive: false});