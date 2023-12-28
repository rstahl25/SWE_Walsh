let platform, ball, grass;

function setup() {
    // Create canvas
    canvas = createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    textAlign(CENTER);

    platform = new Sprite();
    platform.width = 100;
    platform.height = 20;
    platform.collider = 's';
    platform.rotation = 15;

    ball = new Sprite();
    ball.diameter = 100;
    ball.x = windowWidth/2;
    ball.y = windowHeight/3;
    ball.collider = "d";

    grass = new Sprite();
    grass.width = windowWidth;
    grass.height = windowHeight/2.5;
    grass.x = windowWidth/2;
    grass.y = windowHeight;
    grass.collider = 's';
    grass.color = 'green'


    world.gravity.y = 10;
}

function draw() {
    clear()
}