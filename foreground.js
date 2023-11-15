

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
  // Window frame
  noFill();
  stroke(0);
  strokeWeight(15);
  rect(width/2, height/2, width, height);
}