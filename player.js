var pWidth = 30;
var pHeight = 70;
var pX = 50;
var pY = 500;


function displayPlayer() {
    stroke(0);
    strokeWeight(5);
    fill(250);
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
        platformBounds(1100);

        if(pX >= (screen.width - pWidth)) {   //Player reaches rightmost boundary
            pX = pX;
        }
        else {
            pX += 5;
        }
    }
}

//function to set movement boundary of far right platform
//only deals with x values for now until we get vertical movement
function platformBounds(xpos) {
    while(pX == xpos - pWidth/2) {
        pX = pX
    }
}