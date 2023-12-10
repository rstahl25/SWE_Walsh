// Drawing variables.
var canvas;
var ctx;

// Input variables.
var upKey;
var downKey;
var rightKey;
var leftKey;

// Game variables
var stage = 1;
var p1X = 30;
var p1Y = 525;
let player1;
var gameloop;

function setup() {
  // Create canvas and context elements.
  canvas = createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textAlign(CENTER);
  ctx = canvas.drawingContext;

  // Set up key listeners.
  setupInputs();

  // Create new player object.
  player1 = new Player(p1X, p1Y,);

  // Start game loop.
  gameloop = setInterval(step, 1000/30);
}

function step() {
  // Step player.
  player1.step();

  // Draw everything.
  draw();
}

function draw() {
  // Call function
  if(stage == 1){
    ctx.clearRect(0, 0, canvas.width, 560);
    game();
    player1.draw();
  }
}

function setupInputs() {
  document.addEventListener("keydown", function(event) {
    if(event.key === "ArrowUp") {
      upKey = true;
    }

    else if(event.key === "ArrowLeft") {
      leftKey = true;
    }

    else if(event.key === "ArrowDown") {
      downKey = true;
    }

    else if(event.key === "ArrowRight") {
      rightKey = true;
    }
  });

  document.addEventListener("keyup", function(event) {
    if(event.key === "ArrowUp") {
      upKey = false;
    }

    else if(event.key === "ArrowLeft") {
      leftKey = false;
    }

    else if(event.key === "ArrowDown") {
      downKey = false;
    }

    else if(event.key === "ArrowRight") {
      rightKey = false;
    }
  });
}
