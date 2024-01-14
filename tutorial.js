// Set up sprite variables for level
let platform1, platform2, platform3, wall, player, grass;



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
    p1X = windowWidth/20;
    p1Y = windowHeight - windowHeight/3;

    // Create platforms
    platform1 = new Sprite(windowWidth/1.75, (windowHeight - windowHeight/1.75), 140, 10, 's');
    platform1.color = '#E79548';
    platform1.friction = 0;

    platform2 = new Sprite(windowWidth/2.25, (windowHeight - windowHeight/2.25), 140, 10, 's');
    platform2.color = '#E79548';
    platform2.friction = 0;

    platform3 = new Sprite(windowWidth/3.25, (windowHeight - windowHeight/3), 140, 10, 's');
    platform3.color = '#E79548';
    platform3.friction = 0;

    // Create wall obstacle
    wall = new Sprite(windowWidth/1.4, (windowHeight - windowHeight/2.25), 10, windowHeight/2, 's');
    wall.color = 'black';
    wall.friction = 0;

    // Create player sprite
    player = new Sprite(p1X, p1Y, 30, 40, 'd');
    player.rotationLock = true;
    //player.img = 'img/walsh.JPG'
    player.color = 'maroon'

    // Create grass platform
    grass = new Sprite(windowWidth/2, windowHeight, windowWidth, windowHeight/2.5, 's');
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
      player.applyForce(650);
    }

    if (kb.presses('up') && (player.colliding(platform3))) {
        player.bearing = -90;
        player.applyForce(600);
    }

    if (kb.presses('up') && (player.colliding(platform2))) {
        player.bearing = -90;
        player.applyForce(600);
    }

    if (kb.presses('up') && (player.colliding(platform1))) {
        player.bearing = -90;
        player.applyForce(600);
    }

    clear();

    // Render end goal building
    drawEndGoal(ground_Top, grass_Height, start_x, start_y);
}

