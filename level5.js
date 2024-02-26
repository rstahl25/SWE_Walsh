// Set up sprite variables for level
let objects = []
let objectNames = []
let c_states = ['#E79548', '#F0000F', '#75F9FD'];
let current_colors = [];
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
    objects.push(createObject('player', windowWidth/15, (windowHeight - windowHeight/1.002), 30, windowHeight/5, 'maroon', 0, 'img/player.png', 'd'))
    objects.push(createObject('start', windowWidth/18, (windowHeight - windowHeight/1.005), 250, 10, 'black', 0, null, 's'))
    objects.push(createObject('platform1', windowWidth/7, (windowHeight - windowHeight/1.15), 170, 10, '#E79548', 0, null, 'k'))
    objects.push(createObject('platform2', windowWidth/7.25, (windowHeight - windowHeight/1.55), 170, 10, '#E79548', 0, null, 'k'))
    objects.push(createObject('platform3', windowWidth/7.5, (windowHeight - windowHeight/2.25), 170, 10, '#E79548', 0, null, 'k'))
    objects.push(createObject('goal', windowWidth + windowWidth/6, (windowHeight + windowHeight/2.25), 1200, 875, 0, 0, 'img/goal5.png', 'd'))
    objects.push(createObject('end', windowWidth + windowWidth/7, (windowHeight + windowHeight/1.68), 560, 10, 'black', 0, null, 's'))
    objects.push(createObject('step', windowWidth, (windowHeight + windowHeight/3.8), 120, 10, '#E79548', 0, null, 's'))
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
        var index = 0;
        if((object.name).match(/platform/)) {
                group = new Group();
                group.x = (i) => object.x + (i * 300);
                group.y = (i) => object.y + (i * 75); 
                group.width = (i) => object.width * random(0.25, 1);
                group.height = object.height; 
                group.color = (i) => c_states[Math.floor(Math.random() * 3)];
                group.collider = object.dynamic;
                group.amount = 9;

            objects[i] = group;
        }
        else {
            sprite = new Sprite(object.x, object.y, object.width, object.height, object.dynamic);
            sprite.color = object.color;
            sprite.friction = object.friction;
            sprite.bounciness = 0;
            sprite.drag = 0;

        if(object.name == 'player') {
            sprite.rotationLock = true;
            sprite.image = object.image;
            sprite.debug = false;
        }
        if(object.name == 'goal'){
            sprite.layer = 0;
            sprite.img = object.image;
            //sprite.debug = true;
        }
        objects[i] = sprite
    }
}
    // Establish world gravity
    world.gravity.y = 10;
    
}

function setup() {
    windowWidth *= 2;
    scene = createObjects(windowWidth, windowHeight)
    setupScene(windowWidth, windowHeight, scene);

    p1X = windowWidth/18; 
    p1Y = windowHeight - windowHeight;

    var count1 = Math.floor(Math.random() * 3);
    var count2 = ((count1 + 1) % 3);
    var count3 = ((count1 - 1) % 3);
    var speed = 0;

      async function change_c() {
        count1++;
        count2++;
        count3++;
        for(var i = 0; i < 9; i++) {
            (objects[objectNames.indexOf('platform1')])[i].color = c_states[((count1 + i) % 3)];
            switch(((count1 + i) % 3)) {
                case 0: 
                    (objects[objectNames.indexOf('platform1')])[i].friction = 0;
                    (objects[objectNames.indexOf('platform1')])[i].bounciness = 0;
                    break;
                case 1: 
                    (objects[objectNames.indexOf('platform1')])[i].bounciness = 0;
                    (objects[objectNames.indexOf('platform1')])[i].friction = 1;
                    break;
                case 2: 
                    (objects[objectNames.indexOf('platform1')])[i].friction = 0;
                    (objects[objectNames.indexOf('platform1')])[i].bounciness = 1.05;
                    break;
            }

            (objects[objectNames.indexOf('platform2')])[i].color = c_states[((count2 + i) % 3)];
            switch(((count2 + i) % 3)) {
                case 0: 
                    (objects[objectNames.indexOf('platform2')])[i].friction = 0;
                    (objects[objectNames.indexOf('platform2')])[i].bounciness = 0;
                    break;
                case 1: 
                    (objects[objectNames.indexOf('platform2')])[i].bounciness = 0;
                    (objects[objectNames.indexOf('platform2')])[i].friction = 1;
                    break;
                case 2: 
                    (objects[objectNames.indexOf('platform2')])[i].friction = 0;
                    (objects[objectNames.indexOf('platform2')])[i].bounciness = 1.05;
                    break;
            }

            (objects[objectNames.indexOf('platform3')])[i].color = c_states[((count3 + i) % 3)];
            switch(((count3 + i) % 3)) {
                case 0: 
                    (objects[objectNames.indexOf('platform3')])[i].friction = 0;
                    (objects[objectNames.indexOf('platform3')])[i].bounciness = 0;
                    break;
                case 1: 
                    (objects[objectNames.indexOf('platform3')])[i].bounciness = 0;
                    (objects[objectNames.indexOf('platform3')])[i].friction = 1;
                    break;
                case 2: 
                    (objects[objectNames.indexOf('platform3')])[i].friction = 0;
                    (objects[objectNames.indexOf('platform3')])[i].bounciness = 1.05;
                    break;
            }

            current_colors.push(c_states[((count1 + i) % 3)]);
            current_colors.push(c_states[((count2 + i) % 3)]);
            current_colors.push(c_states[((count3 + i) % 3)]);

            speed += 3;
            if(speed >= 500) {
                speed -= 500;
            }
        }
        await delay(2000 - speed);
        change_c();
      }

      change_c();

    // Create elements to display if the game is paused or not.
    p1 = createElement('h2', 'Game Paused');
    p1.position(500, 200);
    p1.attribute('align', 'center');
    p1.hide();

    p2 = createElement('h2', 'Press SPACE to Resume');
    p2.position(500, 250);
    p2.attribute('align', 'center');
    p2.hide();

    r = createElement('h2', 'Press SPACE to Pause');
    r.position(50, 15);
    r.attribute('align', 'center');
    r.show();

    (objects[objectNames.indexOf('goal')]).scale *= 0.25;
    (objects[objectNames.indexOf('player')]).scale *= 0.5;
}

function draw() {
    clear();
    camera.off();
    camera.zoom = (1/1.5);
    camera.x = objects[objectNames.indexOf('player')].x + windowWidth/3;
    camera.y = objects[objectNames.indexOf('player')].y;
      
    // Allow player horizontal movement
    if(kb.pressing('left')) {
        if(objects[objectNames.indexOf('player')].x < 10) {
            objects[objectNames.indexOf('player')].vel.x = 5;
        } else {
            objects[objectNames.indexOf('player')].vel.x = -5;
        }
    } else if (kb.pressing('right')) {
        if(objects[objectNames.indexOf('player')].x > windowWidth + 500) {
            objects[objectNames.indexOf('player')].vel.x = -5;
        } else {
            objects[objectNames.indexOf('player')].vel.x = 5;
        }
    } else {
        objects[objectNames.indexOf('player')].vel.x = 0;
    }
       
    // Allow player vertical movement with jump limitation
    /*if(kb.presses('up') && (objects[objectNames.indexOf('player')].x < (windowWidth - 250))) {
        objects[objectNames.indexOf('player')].bearing = -90;
        objects[objectNames.indexOf('player')].applyForce(2400);
    }*/
    if(kb.presses('up') &&  objects[objectNames.indexOf('player')].colliding(objects[objectNames.indexOf('start')])) {
        objects[objectNames.indexOf('player')].bearing = -90;
        objects[objectNames.indexOf('player')].applyForce(2400);
    }
    
    else if(kb.presses('up') &&  objects[objectNames.indexOf('player')].colliding(objects[objectNames.indexOf('step')])) {
        objects[objectNames.indexOf('player')].bearing = -90;
        objects[objectNames.indexOf('player')].applyForce(2400);
    }
    for(var i = 0; i < (objects[objectNames.indexOf('platform1')]).length; i++) {
        for(var j = 2; j < 5; j++) {
            if(kb.presses('up') && objects[objectNames.indexOf('player')].colliding((objects[j])[i])) {
                objects[objectNames.indexOf('player')].bearing = -90;
                objects[objectNames.indexOf('player')].applyForce(2400);
            }
        }
    }
    for(var i = 0; i < (objects[objectNames.indexOf('platform1')]).length; i++) {
        for(var j = 2; j < 5; j++) {
            if(objects[objectNames.indexOf('player')].colliding((objects[j])[i]) && (objects[j][i]).friction > 0) {
                objects[objectNames.indexOf('player')].x = p1X;
                objects[objectNames.indexOf('player')].y = p1Y;
            }
        }
    }
    if(objects[objectNames.indexOf('player')].y > (windowHeight + 500)) {
        objects[objectNames.indexOf('player')].x = windowWidth/18; 
        objects[objectNames.indexOf('player')].y = ((windowHeight - windowHeight) - 125);
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

    if(objects[objectNames.indexOf('player')].collides(objects[objectNames.indexOf('goal')])) {
        objects[objectNames.indexOf('player')].collider = 's';
        objects[objectNames.indexOf('player')].visible = false;

        document.getElementById("shine").innerHTML = "Game Completed";
        var glim = document.getElementById("shine");
        glim.style.fontSize = '30px';
        glim.style.left = '51vw';
        glim.style.top = '17vh';

        let a = createA('/level_selection.html', 'Level Selection');
        a.position((windowWidth - windowWidth/1.375), windowHeight/4);
        a.style('color', 'maroon');
        a.style('text-decoration', 'none')
        a.style('background-color', 'white')
        a.style('border: 3px solid black')
        a.style('border-radius: 0.5rem')
        a.style('padding: 5px')
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
        if(scene[i].name == 'platform1') {
            chai.assert.equal(scene[i].friction, 0)
        }
        if(scene[i].name == 'platform2') {
            chai.assert.equal(scene[i].color, '#E79548')
        }
        if(scene[i].name == 'platform3') {
            chai.assert.equal(scene[i].dynamic, 'k')
        }
        if(scene[i].name == 'goal') {
            chai.assert.equal(scene[i].image, 'img/goal5.png')
        }
        if(scene[i].name == 'player') {
            chai.assert.equal(scene[i].dynamic, 'd')
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