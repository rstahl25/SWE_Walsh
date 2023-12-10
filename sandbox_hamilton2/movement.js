// Global

// Game control
var stage = 0;

// Player variables
var p1X = 400;
var p1Y = 375;
var p1Width = 30;
var p1Height = 70;

// Platform variables
var b1X = 200;
var b1Y = 300;
var b1Width = 200;
var b1Height = 20;

// Gravity
var jump = false; // Are we jumping?
var direction = 1; // Force of gravity in the y-direction
var velocity = 2; // Speed of player
var jumpPower = 15; // Enegery or strength of player
var fallingSpeed = 5; // Equal to velocity
var minHeight = 375; // Height of ground
var maxHeight = 50; // Height of sky
var jumpCounter = 0; // Keeps track of how much player jumps

function setup() {
  createCanvas(800, 500);
  rectMode(CENTER);
  textAlign(CENTER);
  
}

function draw() {
  background(220);
  
  // call function
  keyPressed();
  gravity();
  
  
  if(stage == 0){
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
  rect(width/2, 450, width, 100);
  // Window frame
  noFill();
  stroke(0);
  strokeWeight(15);
  rect(width/2, height/2, width, height);
  
  // Draw platform
  stroke(0);
  strokeWeight(5);
  fill(255, 120, 0);
  rect(b1X, b1Y, b1Width, b1Height);
  
  // Draw player
  stroke(0);
  fill(150, 0, 170);
  rect(p1X, p1Y, p1Width, p1Height);
}

function gravity(){
  if(p1Y >= minHeight && jump == false){ // At minimum height; Stop falling
    p1Y = p1Y;
  }
  
  else{
    p1Y = p1Y + (direction*velocity) // Makes gravity work
  }
  
  if(jump == true){
    if(p1Y < maxHeight ){
      velocity = fallingSpeed;
      jump = false;
    }
    
    else{
      velocity = -jumpPower;
      jumpCounter = jumpCounter + 1;
    }
  }
  
  else{
    velocity = fallingSpeed;
  }
}

function keyPressed(){
  if(keyIsDown(LEFT_ARROW)){
    p1X -= 5; // Player will move left
  }
  
  if(keyIsDown(RIGHT_ARROW)){
    p1X += 5;  // Player will move right
  }
  
  if(keyIsDown(UP_ARROW)){
    jump = true;  // Player will jump
  }
  
}