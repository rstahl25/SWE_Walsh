class Player {
  constructor(x, y,) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 70;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.friction = 0.6;
    this.maxSpeed = 10;
    this.minHeight = 525;
    this.active = true;
  }

  step() {
    // Movement.
    if(this.active) {
      // Horizontal movement.
      if(!leftKey && !rightKey || leftKey && rightKey) {
        // Slow player down;
        this.xSpeed *= this.friction;
      }

      else if(rightKey) {
        // Player moves right.
        this.xSpeed ++;
      }

      else if(leftKey) {
        // Player moves left.
        this.xSpeed --;
      }
      // Vertical movement.
      if(upKey) {
        // Check if on ground.

        this.ySpeed -= 15;
      } 

      else if(!upKey && this.y >= this.minHeight) {
        this.ySpeed = 0;
      }

      else {
        this.ySpeed ++;
      }

      // Correct player speed.
      if(this.xSpeed >= this.maxSpeed) {
        this.xSpeed = this.maxSpeed;
      }

      else if(this.xSpeed <= -this.maxSpeed) {
        this.xSpeed = -this.maxSpeed;
      }

      if(this.ySpeed >= this.maxSpeed) {
        this.ySpeed = this.maxSpeed;
      }

      else if(this.ySpeed <= -this.maxSpeed) {
        this.ySpeed = -this.maxSpeed;
      }

      this.x += this.xSpeed;
      this.y += this.ySpeed;
    }
  }

  draw() {
    stroke(0);
    strokeWeight(5);
    fill(150, 0, 170);
    rect(this.x, this.y, this.width, this.height);
  }
}

// chai test
var should = require('chai').should();

var assert = require('chai').assert;

let player2 = new Player(500, 500);
let p2_active = player2.active;
let p2_height = player2.height;

player2.should.be.a('object')
console.log('pass')

p2_active.should.be.a('boolean')
console.log('pass')

assert.typeOf(p2_height, 'number', 'p2_height is a number')
console.log('pass')