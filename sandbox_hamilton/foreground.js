// Game Control
var stage = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textAlign(CENTER);
  
}

function draw() {
  background(220);
  
  // call function
  
  
  if(stage == 1){
    game();
  }
}

// Game function
function game(){
  // Appearance of game
  background(150, 230, 240);
  // Grass
  noStroke();
  fill(100, 200, 75);
  rect(width/2, 650, width, 200);
  // Window frame
  noFill();
  stroke(0);
  strokeWeight(15);
  rect(width/2, height/2, width, height);
  
}