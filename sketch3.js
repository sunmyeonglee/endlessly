function setup() {
  createCanvas(windowWidth - 15, windowHeight - 100);
}

var x = 400;
var y = 0;
var speed = 0;
var acc = 0.5;
var caught = false;
var waterLevel = 0;
var isGameEnded = false;
var rectSize = 60;
var score = 0;

function draw() {
  background(0);
  // Draw generative art
  for (var i = 0; i < 10; i++) {
    var x1 = random(width);
    var y1 = random(height);
    var x2 = random(width);
    var y2 = random(height);
    stroke(random(255), random(255), random(255));
  }

  // Draw water droplet
  if (!caught) {
    for (var i = 2; i < 8; i++) {
      var rainbowColor = color(random(255), random(255), random(255));
      fill(rainbowColor);
      ellipse(x, y + i * 4, i * 2, i * 2);
    }
  }

  // Update droplet position
  speed += acc;
  y += speed;

  if (y > height) {
    // Update water level
    if (caught) {
      waterLevel += 3;
      score++; // Increase the score
    }

    // Generate new water drop
    y = 0;
    x = random(20, width - 20);
    speed = 0;
    caught = false;
  }

  // Draw box
  strokeWeight(3);
  stroke(255);
  noFill();
  rect(mouseX - rectSize / 2, mouseY - rectSize / 2, rectSize, rectSize);

  // Draw water level in the box
  noStroke();
  fill(255);
  rect(
    mouseX - rectSize / 2,
    mouseY + rectSize / 2 - waterLevel,
    rectSize,
    waterLevel
  );

  // Check if the box caught the water drop
  if (abs(mouseX - x) < rectSize / 2 && abs(mouseY - y) < rectSize / 2) {
    caught = true;
  }

  // Check if the water level matches the rectangle size
  if (waterLevel >= rectSize - 3 && !isGameEnded) {
    rectSize *= 2; // Double the rectangle size
    waterLevel = 0; // Reset the water level
  }

  // Display the score
  fill(255);
  textFont("Noto Serif Display");
  textSize(24);
  textAlign(LEFT, TOP);
  text("Score: " + score, 10, 10);
}
