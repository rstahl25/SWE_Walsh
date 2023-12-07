//global variables for constructing end level building
start_x = 1350;
start_y = (groundTop - (grassHeight/2) - 150);

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textAlign(CENTER);
}

function brick(x, y, w, h) {
  noStroke();
  fill(202, 134, 95);
  rectMode(CENTER);
  rect(x, y, w, h);
}

// Game function
function game(){
  // Grass
  var grassHeight = 200;
  noStroke();
  fill(100, 200, 75);
  rect(width/2, height-(grassHeight/2), width, grassHeight);

  var groundTop = height - grassHeight;
  var jumpHeight = height/12;
  // Wall
  noStroke();
  fill(0)
  rect(1100, groundTop - height/6, 10, height/3)

  // Window frame
  noFill();
  stroke(0);
  strokeWeight(15);
  rect(width/2, height/2, width, height);

  //end building
  noStroke();
  fill(247, 194, 164);
  rect(1425, (groundTop - (grassHeight/2) - 25), 150, 250);

  noStroke();
  noFill();
  beginShape();
  vertex(1350, (groundTop - (grassHeight/2) - 150));
  vertex(1425, ((groundTop - (grassHeight/2)) - 150) - 100);
  vertex(1500, (groundTop - (grassHeight/2)) - 150);
  endShape();

  noStroke();
  fill(212, 219, 222);
  for(let i = 1; i < 8; i++)
  {
    beginShape();
    vertex(start_x + ((20 * i)/2), ((groundTop - (grassHeight/2) - 150)) - (((20 * i)/2) * 1.333));
    vertex((start_x + (20 * i)), ((groundTop - (grassHeight/2) - 150)));
    vertex((start_x + (20 * i) + 10), ((groundTop - (grassHeight/2) - 150)));
    vertex(start_x + (((20 * i) + 10)/2), ((groundTop - (grassHeight/2) - 150)) - ((((20 * i) + 10)/2) * 1.333));
    endShape(CLOSE);
  }

  brick(1415, (groundTop - (grassHeight/2) - 80), 30, 15);
  brick(1390, (groundTop - (grassHeight/2) - 120), 30, 15);
  brick(1480, (groundTop - (grassHeight/2) - 25), 30, 15);
  brick(1485, (groundTop - (grassHeight/2) - 100), 30, 15);
  brick(1375, (groundTop - (grassHeight/2) - 25), 30, 15);
  brick(1430, (groundTop - (grassHeight/2) + 10), 30, 15);
}




