const container = document.querySelector(".app");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const brushWidth = document.querySelector("#brush-width");
const brushColor = document.querySelector("#color-picker");
const eraser = document.querySelector(".eraser");
const brush = document.querySelector(".brush");
const clearBtn = document.querySelector("#clear-btn");
const saveBtn = document.querySelector("#save-btn");

let currentWidth = 5;
let currentColor;
let isDrawing = false;

window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

function startDrawing() {
  isDrawing = true;
  ctx.beginPath();
  ctx.lineWidth = currentWidth;
}
function drawing(e) {
  if (!isDrawing) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = currentColor;
  ctx.stroke();
}
function endDrawing() {
  isDrawing = false;
}
function enterDrawing() {
  ctx.beginPath();
}
function leaveDrawing() {
  ctx.beginPath();
  isDrawing = false;
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", endDrawing);
container.addEventListener("mouseleave", leaveDrawing);
container.addEventListener("mouseenter", enterDrawing);

brushWidth.addEventListener("change", () => {
  currentWidth = brushWidth.value;
});
brushColor.addEventListener("change", () => {
  currentColor = brushColor.value;
});

eraser.addEventListener("click", () => {
  eraser.classList.add("active");
  brush.classList.remove("active");
  currentColor = "#fff";
});
brush.addEventListener("click", () => {
  brush.classList.add("active");
  eraser.classList.remove("active");
  currentColor = brushColor.value;
});

clearBtn.addEventListener("click", () => {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

saveBtn.addEventListener("click", () => {
  let link = document.createElement("a");
  link.download = `${Date.now()}.jpg`;
  link.href = canvas.toDataURL();
  link.click();
});
