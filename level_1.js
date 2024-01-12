// Set up sprite variables for level
let platform3, wall, player, grass, grass2;

// Set up variables for player starting position
var p1X = 130;
var p1Y = 525;



function setup() {
    // Create canvas
    canvas = createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    textAlign(CENTER);

    // Global foreground variables
    grass_Height = 200;
    ground_Top = height - grass_Height;
    jump_Height = height/12;
    start_x = 1350;
    start_y = (ground_Top - (grass_Height/2) - 150);
    

    // Create platforms
    platform = new Sprite(windowWidth/3.25, (ground_Top - (jump_Height * 1) + 5), 140, 10, 's');
    platform.color = '#E79548';
    platform.friction = 0;


    // Create player sprite
    player = new Sprite(p1X, p1Y, 30, 40, 'd');
    player.rotationLock = true;
    //player.img = 'img/walsh.JPG'
    player.color = 'blue'

    // Create grass platform
    grass = new Sprite(0, windowHeight, windowWidth/2, windowHeight/2.5, 's');
    grass.color = 'green'


    // Establish world gravity
    world.gravity.y = 10;

}

function draw() {

    // Allow player horizontal movement
    if(kb.pressing('left')) {
        if(player.x < 10) {
            player.vel.x = 5;
        } else {
            player.vel.x = -5;
        }
    } else if (kb.pressing('right')) {
        if(player.x > windowWidth - 10) {
            player.vel.x = -5;
        } else {
            player.vel.x = 5;
        }
    } else {
        player.vel.x = 0;
    }
       
    // Allow player vertical movement with jump limitation
    if (kb.presses('up') && (player.colliding(grass))) {
      player.bearing = -90;
      player.applyForce(700);
    }

    if (kb.presses('up') && (player.colliding(platform))) {
        player.bearing = -90;
        player.applyForce(700);
    }

    clear();

    // Render end goal building
    drawEndGoal(ground_Top, grass_Height, start_x, start_y);
}

