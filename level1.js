// Global variables for platforms
height = 1100;
grass_Height = 200;
ground_Top = height - grass_Height;
jump_Height = height/12;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textAlign(CENTER);
  
}


function draw() {
  // call function
    game();
    drawPlatform(950, (ground_Top - (jump_Height * 3) + 5), 130, 10, "#E79548")
    displayPlayer();
    keyPressed();
}


function drawPlatform(x, y, width, height, colorHex) {
  stroke(0);
  strokeWeight(3);
  fill(colorHex)
  rect(x, y, width, height);
}