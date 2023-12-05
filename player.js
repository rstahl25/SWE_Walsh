var pWidth = 30;
var pHeight = 70;
var pX = 50;
var pY = 500;

function displayPlayer() {
    stroke(0);
    strokeWeight(5);
    fill(150, 0, 170);
    rect(pX, pY, pWidth, pHeight);
}

function keyPressed() {
    if(keyIsDown(LEFT_ARROW)) {
        if(pX <= 15) {   // Player reach leftmost boundary; Stop moving left.
            pX = pX
        }

        else {
            pX -= 5;
        }
    }

    if(keyIsDown(RIGHT_ARROW)) {
        pX += 5
    }
}