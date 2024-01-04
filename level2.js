// Set up sprite variables for level
let platform1, platform2, platform3, wall, player, grass;

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

    platform1 = new Sprite(windowWidth/1.75, (ground_Top - (jump_Height * 3) + 5), 140, 10, 's');
    platform1.color = '#E79548';

    platform2 = new Sprite(windowWidth/2.25, (ground_Top - (jump_Height * 2) + 5), 140, 10, 's');
    platform2.color = '#E79548';

    platform3 = new Sprite(windowWidth/3.25, (ground_Top - (jump_Height * 1) + 5), 140, 10, 's');
    platform3.color = '#E79548';

    wall = new Sprite(windowWidth/1.4, (ground_Top - height/6), 10, height/2, 's');
    wall.color = 'black';

    player = new Sprite(p1X, p1Y, 30, 'd');

    grass = new Sprite(windowWidth/2, windowHeight, windowWidth, windowHeight/2.5, 's');
    grass.color = 'green'


    world.gravity.y = 10;
}

function draw() {
    if(kb.pressing('left')) {
        player.vel.x = -5;
    } else if (kb.pressing('right')) {
        player.vel.x = 5;
    } else {
        player.vel.x = 0;
    }

    if(kb.pressing('up')) {
        player.vel.y = -10;
    } else {
        player.vel.y = 5;
    }

    clear()
}