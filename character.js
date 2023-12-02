// Player variables
pX = 100;
pY = 525;
pWidth = 30;
pHeight = 70;

function drawPlayer() {
    stroke(0);
    strokeWeight(5);
    fill(150, 0, 170);
    rect(pX, pY, pWidth, pHeight);
}

function keyPressed() {
    if(keyIsDown(LEFT_ARROW)){
        p1X -= 5; // Player will move left
      }
      
    if(keyIsDown(RIGHT_ARROW)){
        p1X += 5;  // Player will move right
    }
}