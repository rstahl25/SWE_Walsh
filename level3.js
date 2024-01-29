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
    objects.push(createObject('grass', (windowWidth/8), windowHeight, windowWidth/4, windowHeight/2.5, 'green', 0, null, 's'));
    objects.push(createObject('lava', (windowWidth/8 + windowWidth/2.75), (windowHeight +  windowHeight/8), windowWidth/2.1, windowWidth/8, 'red', 0, null, 'k'))
    objects.push(createObject('grass2', (windowWidth - windowWidth/25), windowHeight, (windowWidth - windowWidth/2), windowHeight/0.9, 'green', 0, null, 's'))
    objects.push(createObject('platform', (windowWidth/8 + windowWidth/5), (windowHeight - windowHeight/3.4), windowWidth/25, 10, '#E79548', 0, null, 's'))
    objects.push(createObject('platform2', (windowWidth/8 + windowWidth/2.25), (windowHeight - windowHeight/4), windowWidth/20, 10, '#E79548', 0, null, 's'))
    objects.push(createObject('platform1', (windowWidth/8 + windowWidth/3.3), (windowHeight - windowHeight/2.5), windowWidth/15, 10, '#E79548', 0, null, 's'))
    objects.push(createObject('platform3', (windowWidth/8 + windowWidth/2.4), (windowHeight - windowHeight/2), windowWidth/35, 10, '#E79548', 0, null, 's'))
    objects.push(createObject('platform4', (windowWidth - windowWidth/2.85), (windowHeight - windowHeight/2.2), windowWidth/40, 10, '#21E0F8', 0, null, 's'))
    objects.push(createObject('platform5', (windowWidth - windowWidth/2), (windowHeight - windowHeight/3), windowWidth/25, 10, '#E79548', 0, null, 's'))
    objects.push(createObject('player', windowWidth/20, (windowHeight - windowHeight/3), 30, 40, 'blue', 0, null, 'd'))
    objects.push(createObject('endStructure', (windowWidth - windowWidth/10), (windowHeight - (windowHeight - windowHeight/2.82)), windowWidth/1.5, windowHeight*2, 0, 0, 'img/goal3.png', 's'))
    objects.push(createObject('end_wall', (windowWidth - windowWidth/3.5), (windowHeight - windowHeight/2 - (windowHeight/7.2)), 10, (windowHeight/6), 'black', 0, null, 's'))
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
        sprite.bounciness = 0;
        sprite.img = new_object.image
        if(i == 7) {
            sprite.bounciness = 1.5;
        }
        if(i == 9) {
            sprite.rotationLock = true;
        }
        if(i == 10) {
            sprite.scale = 0.2
            sprite.layer = 1;
            sprite.diameter = windowWidth/13;
        }
        objects[i] = sprite
    }

    // console.log(objects)
    // console.log(objectNames)
    // console.log(objects[objectNames.indexOf('player')])


    // Establish world gravity
    world.gravity.y = 10;
    
}

function setup() {
    windowWidth *= 2;
    scene = createObjects(windowWidth, windowHeight)
    setupScene(windowWidth, windowHeight, scene);

    lava_rise();

    p1X = windowWidth/20;
    p1Y = windowHeight - windowHeight/3;

    // Create elements to display if the game is paused or not.
    p1 = createElement('h2', 'Game Paused');
    p1.position(windowWidth/8, (windowHeight/4) - 20);
    p1.attribute('align', 'center');
    p1.hide();

    p2 = createElement('h2', 'Press SPACE to Resume');
    p2.position(windowWidth/8, (windowHeight/4) + 20);
    p2.attribute('align', 'center');
    p2.hide();

    r = createElement('h2', 'Press SPACE to Pause');
    r.position(windowWidth/8, 15);
    r.attribute('align', 'center');
    r.show();
}

async function lava_rise() {
        for(var i = 0; i < 5; i++) {
            objects[objectNames.indexOf('lava')].scale.y *= 1.1;
            await (objects[objectNames.indexOf('lava')]);   //promise = true
            //await objects[objectNames.indexOf('lava')].move(0.5);
            await delay(500);
        }
        for(var j = 0; j < 5; j++) {
            objects[objectNames.indexOf('lava')].scale.y *= 0.91;
            await (objects[objectNames.indexOf('lava')]);   
            //await objects[objectNames.indexOf('lava')].move(-0.5);
            await delay(500);
        }
        lava_rise();
}


function draw() {

    // console.log(objects[0])
    // console.log(objects[1])
    //console.log(objects[7])

    //overhead camera
    camera.off();

    // Allow player horizontal movement
    if(kb.pressing('left')) {
        if(objects[objectNames.indexOf('player')].x < 0) {
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

    if (kb.presses('up') && (objects[objectNames.indexOf('player')].colliding(objects[objectNames.indexOf('platform3')]))) {
        objects[objectNames.indexOf('player')].bearing = -90;
        objects[objectNames.indexOf('player')].applyForce(550);
    }

    if (kb.presses('up') && (objects[objectNames.indexOf('player')].colliding(objects[objectNames.indexOf('platform4')]))) {
        objects[objectNames.indexOf('player')].bearing = -90;
        objects[objectNames.indexOf('player')].applyForce(550);
    }

    if (kb.presses('up') && (objects[objectNames.indexOf('player')].colliding(objects[objectNames.indexOf('platform5')]))) {
        objects[objectNames.indexOf('player')].bearing = -90;
        objects[objectNames.indexOf('player')].applyForce(550);
    }


    if (kb.presses('up') && (objects[objectNames.indexOf('player')].colliding(objects[objectNames.indexOf('grass2')]))) {
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

    // Fix bounce bug for platform
    if(objects[objectNames.indexOf('player')].collides(objects[objectNames.indexOf('platform4')])) {
        objects[objectNames.indexOf('player')].vel.y = -10
    }

    // Put in logic for victory condition

    if(objects[objectNames.indexOf('player')].collides(objects[objectNames.indexOf('endStructure')])) {
        objects[objectNames.indexOf('player')].collider = 's';
        let h2 = createElement('h2', 'Victory!');
        h2.position((windowWidth - windowWidth/1.2), windowHeight/9);
        let a = createA('https://rstahl25.github.io/SWE_Walsh/level_selection.html', 'Level Selection');
        a.position((windowWidth - windowWidth/1.25), windowHeight/9 + 50);
        a.style('color', 'maroon');
        a.style('text-decoration', 'none')
        a.style('background-color', 'white')
        a.style('border: 3px solid black')
        a.style('border-radius: 0.5rem')
        a.style('padding: 5px')

        let a2 = createA('https://rstahl25.github.io/SWE_Walsh/level4.html', 'Level 4');
        a2.position((windowWidth - windowWidth/1.15), windowHeight/9 + 50)
        a2.style('color', 'maroon');
        a2.style('text-decoration', 'none')
        a2.style('background-color', 'white')
        a2.style('border: 3px solid black')
        a2.style('border-radius: 0.5rem')
        a2.style('padding: 5px')
    } 

    

    if(camera.x >= ((objects[objectNames.indexOf('endStructure')]).x + windowWidth/2)) {
        camera.x = camera.x;
    }

    else if(camera.x <= (objects[objectNames.indexOf('endStructure')]).x + windowWidth/3) {
        camera.x = objects[objectNames.indexOf('player')].x + windowWidth/2.2;
    }

    camera.y = (objects[objectNames.indexOf('player')].y - windowWidth/45)

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
    let player = objects[9]
    let endGoal = objects[10]
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

