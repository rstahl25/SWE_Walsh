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

  // Global foreground variables
  grass_Height = 200;
  ground_Top = height - grass_Height;
  jump_Height = height/12;
  start_x = 1350;
  start_y = (ground_Top - (grass_Height/2) - 150);

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
    drawPlatform(950, (ground_Top - (jump_Height * 3) + 5), 130, 10, "#E79548");
    drawPlatform(750, (ground_Top - (jump_Height * 2) + 5), 130, 10, "#E79548");
    drawPlatform(550, (ground_Top - (jump_Height * 1) + 5), 130, 10, "#E79548");
    drawEndGoal(ground_Top, grass_Height, start_x, start_y);
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
