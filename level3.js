// Set up sprite variables for level
let objects = []
let objectNames = []
let p1, p2, r;


function createObject (name, x, y, width, height, color, friction, image, dynamic) {
    var object = {
        name: name,
        x: x,
        y: y,
        width: width,
        height: height,
        color: color,
        friction: friction,
        image: image,
        dynamic: dynamic,
    }
    objectNames.push(name)
    return object;
}

function createObjects(windowWidth, windowHeight) {
    objects = []
    objects.push(createObject('grass', windowWidth/8, windowHeight, windowWidth/4, windowHeight/2.5, 'green', 0, null, 's'));
    objects.push(createObject('lava', (windowWidth/8 + windowWidth/4), windowHeight, windowWidth/4, windowHeight/32, 'red', 0, null, 's'))
    objects.push(createObject('grass2', (windowWidth/4 + windowWidth/2), windowHeight, (windowWidth - windowWidth/2), windowHeight/2.5, 'green', 0, null, 's'))
    objects.push(createObject('platform', (windowWidth/8 + windowWidth/4), (windowHeight - windowHeight/5), windowWidth/25, 10, '#E79548', 0, null, 's'))
    objects.push(createObject('platform2', (windowWidth - windowWidth/3.5), (windowHeight - windowHeight/2.75), windowWidth/25, 10, '#E79548', 0, null, 's'))
    objects.push(createObject('platform1', (windowWidth - windowWidth/2.5), (windowHeight - windowHeight/3.5), windowWidth/25, 10, '#E79548', 0, null, 's'))
    objects.push(createObject('goal', (windowWidth - windowWidth/10), (windowHeight - windowHeight/2.25), windowWidth/5, 10, 'black', 0, null, 's'))
    objects.push(createObject('player', windowWidth/20, (windowHeight - windowHeight/3), 30, 40, 'blue', 0, null, 'd'))
    objects.push(createObject('endStructure', (windowWidth - windowWidth/10), (windowHeight - windowHeight/1.65), windowWidth/1.5, windowHeight*2, 0, 0, 'img/goal3.png', 's'))
    return objects;
}

// Set up variable to allow user to pause/resume game.
var pause = false;

function setupScene(windowWidth, windowHeight, objects) {
    scene = {}
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    textAlign(CENTER);


    for(var i = 0; i < objects.length; i++) {
        var new_object = objects[i];
        sprite = new Sprite(new_object.x, new_object.y, new_object.width, new_object.height, new_object.dynamic);
        sprite.color = new_object.color;
        sprite.friction = new_object.friction;
        sprite.img = new_object.image
        if(i == 7) {
            sprite.rotationLock = true;
        }
        if(i == 8) {
            sprite.scale = 0.15
            //sprite.debug = true;
            sprite.layer = 1;
        }
        objects[i] = sprite
    }

    // console.log(objects)
    // console.log(objectNames)
    // console.log(objects[objectNames.indexOf('player')])
}

function setup() {
    scene = createObjects(windowWidth, windowHeight)
    setupScene(windowWidth, windowHeight, scene);

    p1X = windowWidth/20;
    p1Y = windowHeight - windowHeight/3;

    // Create elements to display if the game is paused or not.
    p1 = createElement('h2', 'Game Paused');
    p1.position(windowWidth/2, (windowHeight/2) - 20);
    p1.attribute('align', 'center');
    p1.hide();

    p2 = createElement('h2', 'Press SPACE to Resume');
    p2.position(windowWidth/2, (windowHeight/2) + 20);
    p2.attribute('align', 'center');
    p2.hide();

    r = createElement('h2', 'Press SPACE to Pause');
    r.position(50, 15);
    r.attribute('align', 'center');
    r.show();
}


function draw() {

    // console.log(objects[0])
    // console.log(objects[1])
    //console.log(objects[7])

    // Allow player horizontal movement
    if(kb.pressing('left')) {
        if(objects[objectNames.indexOf('player')].x < 10) {
            objects[objectNames.indexOf('player')].vel.x = 5;
        } else {
            objects[objectNames.indexOf('player')].vel.x = -5;
        }
    } else if (kb.pressing('right')) {
        if(objects[objectNames.indexOf('player')].x > windowWidth - 10) {
            objects[objectNames.indexOf('player')].vel.x = -5;
        } else {
            objects[objectNames.indexOf('player')].vel.x = 5;
        }
    } else {
        objects[objectNames.indexOf('player')].vel.x = 0;
    }
       
    // Allow player vertical movement with jump limitation
    if (kb.presses('up') && (objects[objectNames.indexOf('player')].colliding(objects[objectNames.indexOf('grass')]))) {
        objects[objectNames.indexOf('player')].bearing = -90;
        objects[objectNames.indexOf('player')].applyForce(550);
    }

    if (kb.presses('up') && (objects[objectNames.indexOf('player')].colliding(objects[objectNames.indexOf('platform')]))) {
        objects[objectNames.indexOf('player')].bearing = -90;
        objects[objectNames.indexOf('player')].applyForce(550);
    }

    if (kb.presses('up') && (objects[objectNames.indexOf('player')].colliding(objects[objectNames.indexOf('platform1')]))) {
        objects[objectNames.indexOf('player')].bearing = -90;
        objects[objectNames.indexOf('player')].applyForce(550);
    }

    if (kb.presses('up') && (objects[objectNames.indexOf('player')].colliding(objects[objectNames.indexOf('platform2')]))) {
        objects[objectNames.indexOf('player')].bearing = -90;
        objects[objectNames.indexOf('player')].applyForce(550);
    }

    if (kb.presses('up') && (objects[objectNames.indexOf('player')].colliding(objects[objectNames.indexOf('grass2')]))) {
        objects[objectNames.indexOf('player')].bearing = -90;
        objects[objectNames.indexOf('player')].applyForce(550);
    }

    if (kb.presses('up') && (objects[objectNames.indexOf('player')].colliding(objects[objectNames.indexOf('goal')]))) {
        objects[objectNames.indexOf('player')].bearing = -90;
        objects[objectNames.indexOf('player')].applyForce(550);
    }

    if(objects[objectNames.indexOf('player')].collides(objects[objectNames.indexOf('lava')])) {
        objects[objectNames.indexOf('player')].x = p1X;
        objects[objectNames.indexOf('player')].y = p1Y;
    }

    // Allow user to pause and resume game using SPACE.
    if (kb.presses('Space')) {
        if (pause === true) {
            pause = false;
        }

        else {
            pause = true;
        }
    }

    if (pause === true) {
        objects[objectNames.indexOf('player')].sleeping = true;
        p1.show();
        p2.show();
        r.hide();
    }

    else {
        objects[objectNames.indexOf('player')].sleeping = false;
        p1.hide();
        p2.hide();
        r.show();
    }

    // Put in logic for victory condition

    if(objects[objectNames.indexOf('player')].collides(objects[objectNames.indexOf('endStructure')])) {
        objects[objectNames.indexOf('player')].collider = 's';
        let h2 = createElement('h2', 'Victory!');
        h2.position((windowWidth - windowWidth/8), windowHeight/9);
        let a = createA('https://rstahl25.github.io/SWE_Walsh/level_selection.html', 'Level Selection');
        a.position((windowWidth - windowWidth/6), windowHeight/9 + 50);
        a.style('color', 'maroon');
        a.style('text-decoration', 'none')
        a.style('background-color', 'white')
        a.style('border: 3px solid black')
        a.style('border-radius: 0.5rem')
        a.style('padding: 5px')

        let a2 = createA('https://rstahl25.github.io/SWE_Walsh/level2.html', 'Level 2');
        a2.position((windowWidth - windowWidth/12), windowHeight/9 + 50)
        a2.style('color', 'maroon');
        a2.style('text-decoration', 'none')
        a2.style('background-color', 'white')
        a2.style('border: 3px solid black')
        a2.style('border-radius: 0.5rem')
        a2.style('padding: 5px')
    } 


    clear();
}

let assert, should, chai;

if(typeof window == 'undefined') {

    chai = require('chai')
    assert = chai.assert
    should = chai.should();

    test_createObject();
    test_createObjects();
    test_sprite_qualities();
}

function test_setup() {
    setup();
    console.log('Setup tested')
}

function test_createObject () {
    var myObject = createObject('grass', 500, 700, 250, 320, 'green', 0, null, false)
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

function test_sprite_qualities() {
    //console.log(objects)
    let player = objects[7]
    let endGoal = objects[8]
    //console.log(player)
    //console.log(endGoal)

    for(var i = 0; i < objects.length - 1; objects++)
    {
        chai.assert.equal(objects[i].dynamic, 's')
    }
    chai.assert.equal(player.dynamic, 'd')

    console.log("Player movement properties tested")
    console.log("Static collider of all other sprites tested")

    chai.assert.equal(endGoal.image, 'img/goal3.png')

    console.log("End goal tested")

}

