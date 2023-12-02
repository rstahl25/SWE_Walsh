var stage = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textAlign(CENTER);
  
}
function draw() {
  // call function
  if(stage == 1){
    game();
    drawPlayer();
    keypressed();
  }
}
