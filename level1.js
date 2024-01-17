// Set up sprite variables for level
let platform, platform1, platform2, goal, wall, player, grass, grass2, lava;


function createSprite (x, y, width, height, collider, colorString, friction, image) {

    sprite = new Sprite (
        x,
        y,
        width,
        height,
        collider,
    );
    sprite.color = colorString;
    sprite.friction = friction;
    sprite.image = image;
    return sprite;
    // object = {
    //     name: name,
    //     x: x,
    //     y: y,
    //     width: width,
    //     height: height,
    //     color: color,
    //     friction: friction,
    //     image: image,
    //     dynamic: dynamic,
    //     vel_x: vel_x,
    //     vel_y: vel_y
    // }
    // return object;
}

function createObjects(windowWidth, windowHeight) {
    let objects = []
    objects.push(createSprite(windowWidth/8, windowHeight, windowWidth/4, windowHeight/2.5, 's', "green", 0, null)); //grass
    objects.push(createSprite((windowWidth/8 + windowWidth/4), windowHeight, windowWidth/4, windowHeight/32, 's', 'red', 0, null)) //lava
    objects.push(createSprite((windowWidth/4 + windowWidth/2), windowHeight, (windowWidth - windowWidth/2), windowHeight/2.5, 's', 'green', 0, null)) // lava2
    objects.push(createSprite((windowWidth/8 + windowWidth/4), (windowHeight - windowHeight/5), windowWidth/25, 10, 's', '#E79548', 0, null)) //platform
    objects.push(createSprite((windowWidth - windowWidth/3.5), (windowHeight - windowHeight/2.75), windowWidth/25, 10, 's', '#E79548', 0, null)) // platform2
    objects.push(createSprite((windowWidth - windowWidth/2.5), (windowHeight - windowHeight/3.5), windowWidth/25, 10, 's', '#E79548', 0, null))
    objects.push(createSprite((windowWidth - windowWidth/10), (windowHeight - windowHeight/2.25), windowWidth/5, 10, 's', 'black', 0, null)) //platform1
    //objects.push(createObject('player', windowWidth/20, (windowHeight - windowHeight/3), 30, 40, 'blue', 0, null, 'd', 0, 0))
    return objects;
}

// Set up variable to allow user to pause/resume game.
var pause = false;

function setupScene(windowWidth, windowHeight, objects) {
    scene = {}
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    textAlign(CENTER);

    player = new Sprite(windowWidth/20, (windowHeight - windowHeight/3), 30, 40, 'd');
    player.rotationLock = true;
    //player.img = 'img/walsh.JPG'
    player.color = 'blue'



    // for(var i = 0; i < objects.length; i++) {
    //     var object = objects[i];
    //     sprite = new Sprite(object.x, object.y, object.width, object.height, object.dynamic);
    //     sprite.color = object.color;
    //     sprite.friction = object.friction;
    // }



    // Establish world gravity
    world.gravity.y = 10;
    
}

function setup() {
    scene = createObjects(windowWidth, windowHeight)
    setupScene(windowWidth, windowHeight, scene);

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
    // if (kb.presses('up') && (player.colliding(grass))) {
    //   player.bearing = -90;
    //   player.applyForce(550);
    // }

    // if (kb.presses('up') && (player.colliding(platform))) {
    //     player.bearing = -90;
    //     player.applyForce(550);
    // }

    // if (kb.presses('up') && (player.colliding(platform1))) {
    //     player.bearing = -90;
    //     player.applyForce(550);
    // }

    // if (kb.presses('up') && (player.colliding(platform2))) {
    //     player.bearing = -90;
    //     player.applyForce(550);
    // }

    // if (kb.presses('up') && (player.colliding(grass2))) {
    //     player.bearing = -90;
    //     player.applyForce(550);
    // }

    // if (kb.presses('up') && (player.colliding(goal))) {
    //     player.bearing = -90;
    //     player.applyForce(550);
    // }

    // if(player.collides(lava)) {
    //     player.x = p1X;
    //     player.y = p1Y;
    // }

    // // Allow user to pause and resume game using SPACE.
    // if (kb.presses('Space')) {
    //     if (pause === true) {
    //         pause = false;
    //     }

    //     else {
    //         pause = true;
    //     }
    // }

    // if (pause === true) {
    //     player.sleeping = true;
    //     removeElements();
    //     let p1 = createElement('h2', 'Game Paused');
    //     p1.position(windowWidth/2, (windowHeight/2) - 20);
    //     p1.attribute('align', 'center');
    //     let p2 = createElement('h2', 'Press SPACE to Resume');
    //     p2.position(windowWidth/2, (windowHeight/2) + 20);
    //     p2.attribute('align', 'center');
    // }

    // else {
    //     player.sleeping = false;
    //     removeElements();
    //     let r = createElement('h2', 'Press SPACE to Pause');
    //     r.position(50, 10);
    //     r.attribute('align', 'center');
    // }


    clear();
}

let assert, should, chai;

if(typeof window == 'undefined') {

    chai = require('chai')
    assert = chai.assert
    should = chai.should();
}

function test_setup() {
    setup();
    console.log('Setup tested')
}

function test_createSprite () {
    var myObject = createSprite('grass', 500, 700, 250, 320, 'green', 0, null, false)
    chai.assert.typeOf(myObject, 'object')
    chai.assert.equal(myObject.name, 'grass')
    chai.assert.equal(myObject.x, 500)
    chai.assert.equal(myObject.y, 700)
    chai.assert.equal(myObject.width, 250)
    chai.assert.equal(myObject.height, 320)
    chai.assert.equal(myObject.color, 'green')
    chai.assert.equal(myObject.friction, 0)
    chai.assert.equal(myObject.image, null)
    chai.assert.equal(myObject.dynamic, false)

    console.log('Create object tested')
}

function test_createObjects() {
    windowWidth = 1100
    windowHeight = 900
    let scene = createObjects(windowWidth, windowHeight)
    chai.assert.typeOf(scene, 'array')
    chai.assert.typeOf(scene[0], 'object')
    chai.assert.equal(scene[0].name, 'grass')

    for(i = 0; i < scene.length; i++) {
        if(scene[i].name == 'lava') {
            chai.assert.equal(scene[i].color, 'red')
        }
        
    }
    console.log('Create scene tested')
}

if(typeof window == "undefined") {
    //test_setup()
    test_createSprite();
    test_createObjects();
}
