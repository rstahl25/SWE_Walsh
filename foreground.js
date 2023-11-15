

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textAlign(CENTER);
  
}


// Game function
function game(){
  // Appearance of game
  background(150, 230, 240);
  // Grass
  noStroke();
  fill(100, 200, 75);
  rect(width/2, 650, width, 200);

  //Wall
  stroke(0);
  strokeWeight(10);
  fill(0);
  rect(1100, 370, 10, 350);

  // Platforms
  stroke(0);
  strokeWeight(3);
  fill(231, 149, 72);
  rect(950, 300, 100, 10)

  stroke(0);
  strokeWeight(3);
  fill(231, 149, 72);
  rect(750, 400, 100, 10)

  stroke(0);
  strokeWeight(3);
  fill(231, 149, 72);
  rect(550, 500, 100, 10)

  // Window frame
  noFill();
  stroke(0);
  strokeWeight(15);
  rect(width/2, height/2, width, height);
  
}