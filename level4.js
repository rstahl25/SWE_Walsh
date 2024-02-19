// Set up sprite variables for level
let objects = []
let objectNames = []
let p1, p2, r, h3, h3_2;


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
    objects.push(createObject('grass', 0, windowHeight, windowWidth/2.7, windowHeight/2.5, 'green', 0, null, 's'));
    objects.push(createObject('lava', windowWidth/2.85, windowHeight, windowWidth/3, windowHeight/32, 'red', 0, null, 's'))
    objects.push(createObject('grass2', (windowWidth/2 + windowWidth/4), windowHeight/1.5, (windowWidth - windowWidth/2), windowHeight/1.5, 'green', 0, null, 's'))
    objects.push(createObject('platform', windowWidth/3, (windowHeight - windowHeight/6), windowWidth/25, 10, 'blue', 0, null, 'k'))
    objects.push(createObject('lava2', windowWidth * 1.5, windowHeight, windowWidth, windowHeight/32, 'red', 0, null, 's'));
    objects.push(createObject('platform2', windowWidth + (windowWidth/12), windowHeight/1.25, windowWidth/25, 10, 'blue', 0, null, 'k'));
    objects.push(createObject('platform3', windowWidth + (windowWidth/4), windowHeight/1.25, windowWidth/25, 10, 'yellow', 10, null, 'k'));
    objects.push(createObject('platform4', (windowWidth + (windowWidth/1.45)), windowHeight/1.15, windowWidth/25, 10, 'blue', 0, null, 'k'));
    objects.push(createObject('platform5', (windowWidth + (windowWidth/1.15)), windowHeight/2, windowWidth/20, 10, 'orange', 0, null, 's'));
    objects.push(createObject('levelEnd', (windowWidth *2) + windowWidth/2, windowHeight * 0.75, windowWidth, windowHeight /2, 'green', 0, null, 's'));
    objects.push(createObject('player', windowWidth/20, (windowHeight - windowHeight/1.5), 65, 185, 'blue', 10, 'img/player.png', 'd'));
    objects.push(createObject('endStructure', (windowWidth * 2) + windowWidth/4, windowHeight/3, windowWidth/6, windowHeight/3, 0, 0, 'img/goal4.png', 's'));
    // objects.push(createObject('restart', windowWidth/1.05, windowHeight/12, 160, 160, 0, 0, 'img/reload.png', 's'));
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
        if(new_object.name == 'player') {
            sprite.rotationLock = true;
            sprite.scale = 0.65;
        }
        if(new_object.name == 'endStructure') {
            sprite.scale = 0.2;
            //sprite.debug = true;
            sprite.layer = 1;
        }
        // if(new_object.name == 'restart') {
        //     sprite.scale = 0.2;
        // }
        objects[i] = sprite
    }

    // console.log(objects)
    // console.log(objectNames)
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
    p1.position(windowWidth/8, (windowHeight/4) - 20);
    p1.attribute('align', 'center');
    p1.hide();

    p2 = createElement('h2', 'Press SPACE to Resume');
    p2.position(windowWidth/8, (windowHeight/4) + 20);
    p2.attribute('align', 'center');
    p2.hide();

    r = createElement('h2', 'Press SPACE to Pause');
    r.position(50, 15);
    r.attribute('align', 'center');
    r.show();

    h3 = createElement('h3', 'Dark blue platforms lift you vertically')
    h3.position(windowWidth/64, 75)

    h3_2 = createElement('h3', "Yellow platforms move you horizontally")
    h3_2.position(windowWidth/64, 125)

    // reload = createButton('hikhvkhvkhvh');
    // reload.position(windowWidth/1.05, windowHeight/12);
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
        if(objects[objectNames.indexOf('player')].x > (windowWidth * 2) + windowWidth/2) {
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
    else if (kb.presses('up') && (objects[objectNames.indexOf('player')].colliding(objects[objectNames.indexOf('platform')]))) {
        objects[objectNames.indexOf('player')].bearing = -90;
        objects[objectNames.indexOf('player')].applyForce(6500);
        
    }
    else if (kb.presses('up') && (objects[objectNames.indexOf('player')].colliding(objects[objectNames.indexOf('platform3')]))) {
        objects[objectNames.indexOf('player')].bearing = -90;
        objects[objectNames.indexOf('player')].applyForce(6500);
    }
    else if (kb.presses('up') && (objects[objectNames.indexOf('player')].colliding(objects[objectNames.indexOf('platform4')]))) {
        objects[objectNames.indexOf('player')].bearing = -90;
        objects[objectNames.indexOf('player')].applyForce(6500);
    }
    else if (kb.presses('up') && (objects[objectNames.indexOf('player')].colliding(objects[objectNames.indexOf('platform2')]))) {
        objects[objectNames.indexOf('player')].bearing = -90;
        objects[objectNames.indexOf('player')].applyForce(6500);
    }
    else if (kb.presses('up') && (objects[objectNames.indexOf('player')].colliding(objects[objectNames.indexOf('platform5')]))) {
        objects[objectNames.indexOf('player')].bearing = -90;
        objects[objectNames.indexOf('player')].applyForce(6500);
    }
    else if (kb.presses('up') && (objects[objectNames.indexOf('player')].colliding(objects[objectNames.indexOf('grass2')]))) {
        objects[objectNames.indexOf('player')].bearing = -90;
        objects[objectNames.indexOf('player')].applyForce(6500);
    }
    else if (kb.presses('up') && (objects[objectNames.indexOf('player')].colliding(objects[objectNames.indexOf('levelEnd')]))) {
        objects[objectNames.indexOf('player')].bearing = -90;
        objects[objectNames.indexOf('player')].applyForce(6500);
    }
    else if(objects[objectNames.indexOf('player')].collides(objects[objectNames.indexOf('lava')]) || objects[objectNames.indexOf('player')].collides(objects[objectNames.indexOf('lava2')])) {
        objects[objectNames.indexOf('player')].x = p1X;
        objects[objectNames.indexOf('player')].y = p1Y;
    }

    if(frameCount> 500) {
        h3.hide();
        h3_2.hide();
    }


    // Checkpoint.
    if (objects[objectNames.indexOf('player')].x >= (windowWidth/2 + windowWidth/4)) {
        p1X = (windowWidth/2 + windowWidth/4);
        p1Y = (windowHeight/4);
    }
    else {
        p1X = windowWidth/20;
        p1Y = windowHeight - windowHeight/3;
    }

    // Moving platforms.
    if (objects[objectNames.indexOf('player')].colliding(objects[objectNames.indexOf('platform')])) {
        if (objects[objectNames.indexOf('platform')].y < (windowHeight/3)) {
            objects[objectNames.indexOf('platform')].vel.y = 0;
        }
        else {
            objects[objectNames.indexOf('platform')].vel.y = -1.5;
        }
    }
    else {
        if (objects[objectNames.indexOf('platform')].y > (windowHeight - windowHeight/6)) {
            objects[objectNames.indexOf('platform')].vel.y = 0;
        }
        else {
            objects[objectNames.indexOf('platform')].vel.y = 1.5;
        }
    }

    if (objects[objectNames.indexOf('platform2')].y <= windowHeight/3) {
        objects[objectNames.indexOf('platform2')].vel.y = 1;
    }
    else if(objects[objectNames.indexOf('platform2')].y >= windowHeight/1.5) {
        objects[objectNames.indexOf('platform2')].vel.y = -1;
    }

    if (objects[objectNames.indexOf('platform3')].x <= (windowWidth + (windowWidth/4))) {
        objects[objectNames.indexOf('platform3')].vel.x = 1.5;
        if (objects[objectNames.indexOf('player')].colliding(objects[objectNames.indexOf('platform3')])) {
            objects[objectNames.indexOf('player')].vel.x = 1.5;
        }
    }
    else if(objects[objectNames.indexOf('platform3')].x >= (windowWidth + (windowWidth/1.75))) {
        objects[objectNames.indexOf('platform3')].vel.x = -1;
        if (objects[objectNames.indexOf('player')].colliding(objects[objectNames.indexOf('platform3')])) {
            objects[objectNames.indexOf('player')].vel.x = -1;
        }
    }

    if (objects[objectNames.indexOf('platform4')].y <= windowHeight/2) {
        objects[objectNames.indexOf('platform4')].vel.y = 1;
    }
    else if(objects[objectNames.indexOf('platform4')].y >= windowHeight/1.15) {
        objects[objectNames.indexOf('platform4')].vel.y = -1;
    }

    // Camera following player.
    if((objects[objectNames.indexOf('player')]).x >=(objects[objectNames.indexOf('platform5')]).x) {
        camera.x = camera.x;
    }

    else {
        camera.x = objects[objectNames.indexOf('player')].x + windowWidth/3;
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
        objects[objectNames.indexOf('player')].visible = false;
        let h2 = createElement('h2', 'Victory!');
        h2.position((windowWidth - windowWidth/8), windowHeight/9);
        let a = createA('/level_selection.html', 'Level Selection');
        a.position((windowWidth - windowWidth/6), windowHeight/9 + 50);
        a.style('color', 'maroon');
        a.style('text-decoration', 'none')
        a.style('background-color', 'white')
        a.style('border: 3px solid black')
        a.style('border-radius: 0.5rem')
        a.style('padding: 5px')

        let a2 = createA('/maintenance.html', 'Level 5');
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
            window.location.href = '/maintenance.html';
          } else {
            document.getElementById("countdown").innerHTML = "Next level in " + timeleft + " seconds";
          }
          timeleft -= 1;
        }, 1000);
    } 

    //Set up restart button
    // if((objects[objectNames.indexOf('restart')]).mouse.hovering()) {
    //     mouse.cursor = 'pointer';
    // } else mouse.cursor = 'default';

    // if ((objects[objectNames.indexOf('restart')]).mouse.presses()) {
    //     objects[objectNames.indexOf('player')].x = p1X;
    //     objects[objectNames.indexOf('player')].y = p1Y;
    // }

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

        if(scene[i].name == 'platform') {
            chai.assert.equal(scene[i].color, 'blue')
        }
        
    }
    console.log('Create scene tested')
}

function test_sprite_qualities() {
    //console.log(objects)
    let player = objects[10]
    let endGoal = objects[11]
    //console.log(player)
    //console.log(endGoal)

    for(var i = 0; i < objects.length - 1; objects++)
    {
        chai.assert.equal(objects[i].dynamic, 's')
    }
    chai.assert.equal(player.dynamic, 'd')

    console.log("Player movement properties tested")
    console.log("Static collider of all other sprites tested")

    chai.assert.equal(endGoal.image, 'img/goal4.png')

    console.log("End goal tested")

}