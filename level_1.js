// Set up sprite variables for level
let platform3, wall, player, grass, grass2, lava;

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
    let windowWidthRemaining = windowWidth;
    

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
    // the positioning of the separated platform must be a starting x value 
    //    of half the platform's width since the (x,y) is based on the center of the sprite
    grass = new Sprite(windowWidth/8, windowHeight, windowWidth/4, windowHeight/2.5, 's');
    grass.color = 'green'
    grass.friction = 0;
    let grassEnd = (windowWidth - (windowWidth/8 + windowWidth/4))
    windowWidthRemaining -= (windowWidth/4);

    grass2 = new Sprite(windowWidth, windowHeight, windowWidthRemaining, windowHeight/2.5, 's')
    grass2.color = 'grey'

    lava = new Sprite(grassEnd, windowHeight, windowWidthRemaining, windowHeight/32, 's')
    lava.color = 'red'


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

