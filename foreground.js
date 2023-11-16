

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

  // Wall
  noStroke();
  fill(0)
  rect(1100, height - (grassHeight * 1.62), 10, height/3)

  // Platforms
  stroke(0);
  strokeWeight(3)
  fill(231, 149, 72)
  rect(950, height - (grassHeight * 2), 130, 10)

  stroke(0);
  strokeWeight(3);
  fill(231, 149, 72);
  rect(750, height - (grassHeight * 1.6), 130, 10)

  stroke(0);
  strokeWeight(3);
  fill(231, 149, 72);
  rect(525, height - (grassHeight * 1.2), 130, 10)

  // Window frame
  noFill();
  stroke(0);
  strokeWeight(15);
  rect(width/2, height/2, width, height);
}