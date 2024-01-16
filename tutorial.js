// Set up sprite variables for level
let platform1, platform2, platform3, wall, player, grass;

// creates tutorial image
let imgTutorial

// Set up variables for player starting position
var p1X = 130;
var p1Y = 525;

// Set up variable to allow user to pause and resume game.
var pause = false;

function preload() {
    imgTutorial = loadImage('img/arrowInstruction.png');
}


function setup() {
    // Create canvas
    canvas = createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    textAlign(CENTER);

    // Global foreground variables
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

    end_struct = new Sprite(windowWidth/1.11, (windowHeight - windowHeight/2.25), 200, 550);
    end_struct.collider = 'none';
    end_struct.debug = true;
    end_struct.layer = 1;
    end_struct.img = 'img/goal1.png';
    if((end_struct.h/wall.h) > 1) {
        end_struct.scale *= (wall.h/end_struct.h) + 0.05;
    }
    if((end_struct.h/wall.h) > 1) {
        end_struct.scale *= (wall.h/end_struct.h) + 0.05;
    }

    // Create Instructions for Tutorial
    imgTutorial.resize(350, 0);
    arrowKeyInstructions = new Sprite(windowWidth/3, windowHeight/3, 'static');
    arrowKeyInstructions.img = imgTutorial;
    arrowKeyInstructions.layer = 0;

    // Establish world gravity
    world.gravity.y = 10;

}

function draw() {
    // Allow player to pass through the tutorial
    player.overlaps(arrowKeyInstructions);

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

    if (kb.presses('up') && (player.colliding(platform3))) {
        player.bearing = -90;
        player.applyForce(700);
    }

    if (kb.presses('up') && (player.colliding(platform2))) {
        player.bearing = -90;
        player.applyForce(700);
    }

    if (kb.presses('up') && (player.colliding(platform1))) {
        player.bearing = -90;
        player.applyForce(700);
    }


    //Allow user to pause and resume game using SPACE.
    if (kb.presses('Space')) {
        if (pause === true) {
            pause = false;
        }

        else {
            pause = true;
        }
    }

    if (pause === true) {
        player.sleeping = true;
        removeElements();
        let p1 = createElement('h2', 'Game Paused');
        p1.position(windowWidth/2, (windowHeight/2) - 20);
        p1.attribute('align', 'center');
        let p2 = createElement('h2', 'Press SPACE to Resume');
        p2.position(windowWidth/2, (windowHeight/2) + 20);
        p2.attribute('align', 'center');
    }

    else {
        player.sleeping = false;
        removeElements();
        let r = createElement('h2', 'Press SPACE to Pause');
        r.position(50, 10);
        r.attribute('align', 'center');
    }

    if(player.collides(platform1)) {
        let div = createDiv('Victory!');
        div.position(windowWidth/2, windowHeight/2);
        div.style('color', 200);
        let a = createA('https://literate-adventure-vxj7744qqpjh7x4-8000.app.github.dev/level_selection.html', 'Level Selection', );
        a.position(windowWidth/2, windowHeight/2 + 20);
    } else {
     clear()
    }

}

