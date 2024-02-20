// Set up sprite variables for level
let objects = []
let objectNames = []
let p1, p2, r;

function createObject (name, x, y, width, height, color, friction, image, dynamic) {
    object = {
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
    objects.push(createObject('player', windowWidth/20, (windowHeight - windowHeight/3), 65, 185, 'maroon', 0, '../img/player.png', 'd'))
    objects.push(createObject('platform1', windowWidth/1.75, (windowHeight - windowHeight/1.75), 140, 10, '#E79548', 0, null, 's'))
    objects.push(createObject('platform2', windowWidth/2.25, (windowHeight - windowHeight/2.25), 140, 10, '#E79548', 0, null, 's'))
    objects.push(createObject('platform3', windowWidth/3.25, (windowHeight - windowHeight/3), 140, 10, '#E79548', 0, null, 's'))
    objects.push(createObject('wall', windowWidth/1.45, (windowHeight - windowHeight/2.25), 10, windowHeight/2, 'black', 0, null, 's'))
    objects.push(createObject('wall2', windowWidth/1.3, windowHeight/4, 10, windowHeight/2, 'black', 0, null, 's'))
    objects.push(createObject('grass', windowWidth/2, windowHeight, windowWidth, windowHeight/2.5, 'green', 0, null, 's'))
    objects.push(createObject('goal', windowWidth/1.11, (windowHeight - windowHeight/2.25), 50, 550, 0, 0, '../img/goalT.png', 's'))
    objects.push(createObject('instructions', windowWidth/3.5, (windowHeight - windowHeight/1.5), 200, 200, 0, 0, '../img/arrowInstruction.png', 's'))
    objects.push(createObject('restart', windowWidth/1.05, windowHeight/12, 160, 160, 0, 0, '../img/reload.png', 's'));
    return objects;
}

// Set up variable to allow user to pause and resume game.
var pause = false;

function setupScene(windowWidth, windowHeight, objects) {
    scene = {}
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    textAlign(CENTER);

    for(var i = 0; i < objects.length; i++) {
        var object = objects[i];
        sprite = new Sprite(object.x, object.y, object.width, object.height, object.dynamic);
        sprite.color = object.color;
        sprite.friction = object.friction;
        sprite.bounciness = 0;
        sprite.img = object.image;
        if(object.name == 'restart') {
            sprite.scale = 0.2;
        }
        if(object.name == 'player') {
            sprite.rotationLock = true;
            sprite.img = object.image;
            sprite.scale = 0.65;
        }
        if(object.name == 'goal'){
            sprite.layer = 0;
        }
        if(object.name == 'instructions'){
            sprite.layer = 0;
            sprite.collider = 'none';
        }
        objects[i] = sprite
    }

    console.log(objects)
    console.log(objectNames)
    // console.log(objects[objectNames.indexOf('player')])


    // Establish world gravity
    world.gravity.y = 10;
    
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
//     // console.log(objects[0])
//     // console.log(objects[1])
//     //console.log(objects[7])

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
        objects[objectNames.indexOf('player')].applyForce(6500);
    }
    else if (kb.presses('up') && (objects[objectNames.indexOf('player')].colliding(objects[objectNames.indexOf('platform1')]))) {
        objects[objectNames.indexOf('player')].bearing = -90;
        objects[objectNames.indexOf('player')].applyForce(6500);
    }
    else if (kb.presses('up') && (objects[objectNames.indexOf('player')].colliding(objects[objectNames.indexOf('platform2')]))) {
        objects[objectNames.indexOf('player')].bearing = -90;
        objects[objectNames.indexOf('player')].applyForce(6500);
    }
    else if (kb.presses('up') && (objects[objectNames.indexOf('player')].colliding(objects[objectNames.indexOf('platform3')]))) {
        objects[objectNames.indexOf('player')].bearing = -90;
        objects[objectNames.indexOf('player')].applyForce(6500);
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

    if((objects[objectNames.indexOf('goal')].h/objects[objectNames.indexOf('wall')].h) > 1) {
        objects[objectNames.indexOf('goal')].scale *= (objects[objectNames.indexOf('wall')].h/objects[objectNames.indexOf('goal')].h) + 0.05;
        objects[objectNames.indexOf('instructions')].scale *= (objects[objectNames.indexOf('wall')].h/14)/objects[objectNames.indexOf('instructions')].h;
    }

    // Put in logic for victory condition

    if(objects[objectNames.indexOf('player')].collides(objects[objectNames.indexOf('goal')])) {
        objects[objectNames.indexOf('player')].collider = 's';
        objects[objectNames.indexOf('player')].visible = false;
        let h2 = createElement('h2', 'Victory!');
        h2.position((windowWidth - windowWidth/8), windowHeight/9);
        let a = createA('/gamefiles/level_selection.html', 'Level Selection');
        a.position((windowWidth - windowWidth/6), windowHeight/9 + 50);
        a.style('color', 'maroon');
        a.style('text-decoration', 'none')
        a.style('background-color', 'white')
        a.style('border: 3px solid black')
        a.style('border-radius: 0.5rem')
        a.style('padding: 5px')

        let a2 = createA('/gamefiles/level1.html', 'Level 1');
        a2.position((windowWidth - windowWidth/12), windowHeight/9 + 50)
        a2.style('color', 'maroon');
        a2.style('text-decoration', 'none')
        a2.style('background-color', 'white')
        a2.style('border: 3px solid black')
        a2.style('border-radius: 0.5rem')
        a2.style('padding: 5px')
        
        var timeleft = 5;
        var downloadTimer = setInterval(function(){
          if(timeleft <= 0){
            clearInterval(downloadTimer);
            document.getElementById("countdown").innerHTML = "Finished";
            window.location.href = '/gamefiles/level1.html';
          } else {
            document.getElementById("countdown").innerHTML = "Next level in " + timeleft + " seconds";
          }
          timeleft -= 1;
        }, 1000);
    } 

    //Set up restart button
    if((objects[objectNames.indexOf('restart')]).mouse.hovering()) {
        mouse.cursor = 'pointer';
    } else mouse.cursor = 'default';

    if ((objects[objectNames.indexOf('restart')]).mouse.presses()) {
        objects[objectNames.indexOf('player')].x = p1X;
        objects[objectNames.indexOf('player')].y = p1Y;
    }

    clear();
}

//RUN TESTS//

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
    chai.assert.equal(scene[0].name, 'player')

    for(i = 0; i < scene.length; i++) {
        if(scene[i].name == 'grass') {
            chai.assert.equal(scene[i].color, 'green')
        }
        if(scene[i].name == 'platform1') {
            chai.assert.equal(scene[i].friction, 0)
        }
        if(scene[i].name == 'platform2') {
            chai.assert.equal(scene[i].color, '#E79548')
        }
        if(scene[i].name == 'platform3') {
            chai.assert.equal(scene[i].dynamic, 's')
        }
        if(scene[i].name == 'wall') {
            chai.assert.equal(scene[i].image, null)
        }
        if(scene[i].name == 'wall2') {
            chai.assert.equal(scene[i].color, 'black')
        }
        if(scene[i].name == 'goal') {
            chai.assert.equal(scene[i].image, 'img/goalT.png')
        }
        if(scene[i].name == 'player') {
            chai.assert.equal(scene[i].dynamic, 'd')
        }
        if(scene[i].name == 'instructions') {
            chai.assert.equal(scene[i].image, 'img/arrowInstruction.png')
        }
    }
    console.log('Create scene tested')
}

function test_movement() {
    //console.log(objects)
    let player = objects[0]
    //console.log(player)

    for(var i = 1; i < objects.length - 1; objects++)
    {
        chai.assert.equal(objects[i].dynamic, 's')
    }
    chai.assert.equal(player.dynamic, 'd')

    console.log("Movement properties tested")
}

if(typeof window == "undefined") {
    // test_setup()
    test_createObject();
    test_createObjects();
    test_movement();
    console.log("tutorial.js tests successful")
}