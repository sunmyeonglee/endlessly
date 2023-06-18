let rectWidth;
let rectHeight;
let rectX;
let rectY;
let angle = 0;
let dragging = false;
let pivotX;
let pivotY;
let circleRadius;

let rectangles = [];
let rectangleWidth = 100;
let rectangleHeight = 200;
let currentColumn = 0;
let currentRow = 0;
let lastRectangleTime = 0;
let delayy = 500;

function setup() {
  createCanvas(windowWidth - 15, windowHeight - 100);
  rectWidth = 10;
  rectHeight = height * (1 / 4);
  rectX = width - rectHeight;
  rectY = height - rectHeight;
  pivotX = rectX;
  pivotY = height;
  circleRadius = rectWidth * 1.5;
}

function draw() {
  background(0);

  if (dragging) {
    let dx = mouseX - pivotX;
    let dy = mouseY - pivotY;
    angle = atan2(dy, dx);
    if (angle > 0) {
      angle = 0;
    }
  } else {
    angle = lerp(angle, 0, 0.1);
  }

  push();
  translate(pivotX, pivotY);
  rotate(angle);
  noStroke();
  fill(255, 255, 255);
  rect(0, -rectHeight, rectWidth, rectHeight);
  noStroke();
  fill(255, 255, 255);
  ellipse(5, -rectHeight, circleRadius, circleRadius);
  pop();

  if (angle <= -PI / 2 && millis() - lastRectangleTime > delayy) {
    if (!checkOverlap()) {
      addRectangle();
      lastRectangleTime = millis();
    }
  }

  displayRectangles();
}

function mousePressed() {
  let d = dist(mouseX, mouseY, rectX, rectY);
  if (d < circleRadius) {
    dragging = true;
    setTimeout(addRectangle, delayy); // 0.5초 후에 사각형 추가
    lastRectangleTime = millis();
  }
}

function mouseReleased() {
  dragging = false;
}

function addRectangle() {
  let x = currentColumn * rectangleWidth;
  let y = currentRow * rectangleHeight;

  rectangles.push({
    x: x,
    y: y,
    width: rectangleWidth,
    height: rectangleHeight,
  });

  currentColumn++;
  if (currentColumn * rectangleWidth >= width) {
    currentColumn = 0;
    currentRow++;
    rectangleWidth *= 0.5; // 가로 줄의 사각형 크기를 줄임
    rectangleHeight *= 0.5; // 가로 줄의 사각형 크기를 줄임
  }
}

function displayRectangles() {
  for (let i = 0; i < rectangles.length; i++) {
    let x = rectangles[i].x;
    let y = rectangles[i].y;
    let width = rectangles[i].width;
    let height = rectangles[i].height;
    let fillColor = color(random(255), random(255), random(255));
    noStroke();
    fill(fillColor);
    rect(x, y, width, height);
  }
}

function checkOverlap() {
  let x = currentColumn * rectangleWidth;
  let y = currentRow * rectangleHeight;

  for (let i = 0; i < rectangles.length; i++) {
    let rect = rectangles[i];
    if (
      x + rectangleWidth > rect.x &&
      x < rect.x + rect.width &&
      y + rectangleHeight > rect.y &&
      y < rect.y + rect.height
    ) {
      return true;
    }
  }

  return false;
}
