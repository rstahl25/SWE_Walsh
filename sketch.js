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
