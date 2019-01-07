const canvas = document.querySelector('#signature');
const ctx = canvas.getContext('2d');

ctx.lineWidth = 1;
ctx.strokeStyle = '#262626';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hasSigned = false;

function draw(e) {
  if(!isDrawing) return;
  hasSigned = true;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
