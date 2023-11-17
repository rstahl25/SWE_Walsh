
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textAlign(CENTER);
}

// Game function
function game(){
  // Grass
  var grassHeight = 200;
  noStroke();
  fill(100, 200, 75);
  rect(width/2, height-(grassHeight/2), width, grassHeight);

  var groundTop = height - grassHeight;
  var jumpHeight = height/12;
  // Wall
  noStroke();
  fill(0)
  rect(1100, groundTop - height/6, 10, height/3)
  
  drawPlatform(950, (groundTop - (jumpHeight * 3) + 5), 130, 10, "#E79548");

  drawPlatform(750, (groundTop - (jumpHeight * 2) + 5), 130, 10, "#E79548");

  drawPlatform(550, (groundTop - (jumpHeight * 1) + 5), 130, 10, "#E79548");

  // Window frame
  noFill();
  stroke(0);
  strokeWeight(15);
  rect(width/2, height/2, width, height);
}