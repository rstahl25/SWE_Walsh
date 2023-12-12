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

        if(this.x >= screen.width - this.width) {
          this.xSpeed = 0;
        }
      }

      else if(leftKey) {
        // Player moves left.
        this.xSpeed --;

        if(this.x <= this.width) {
          this.xSpeed = 0;
        }
      }
      // Vertical movement.
      if(upKey) {
        // Check if on ground.
        if(this.y <= this.minHeight && this.y >= (screen.height - (screen.height - 50))) {
          this.ySpeed -= 100;
        }
        else {
          this.ySpeed = 0;
        }
      } 

      if(this.y >= this.minHeight) {
        this.y = this.minHeight;
      }

      if(upKey) {
        // Check if on ground.
        if(this.y <= this.minHeight && this.y >= (screen.height - (screen.height - 50))) {
          this.ySpeed -= 100;
        }
        else {
          this.ySpeed = 0;
        }
      } 

      else {
        this.ySpeed ++;
      }

      if(this.x >= (950 - 130/2) && this.x <= (1080 - 130/2) && this.y <= this.minHeight - 200 && this.y >= this.minHeight - 300) {
          this.y = this.minHeight - 200;
          if(upKey) {
            this.y = this.y - 100;
          }
          else if(!upKey) {
            this.ySpeed = 0;
          }
      }

      if(this.x >= (750 - 130/2) && this.x <= (880 - 130/2) && this.y <= this.minHeight - 140 && this.y >= this.minHeight - 180) {
        this.y = this.minHeight - 140;
        if(upKey) {
          this.y = this.y - 100;
        }
        else if(!upKey) {
          this.ySpeed = 0;
        }
    }

    if(this.x >= (550 - 130/2) && this.x <= (680 - 130/2) && this.y <= this.minHeight - 80 && this.y >= this.minHeight - 110) {
      this.y = this.minHeight - 80;
      if(upKey) {
        this.y = this.y - 100;
      }
      else if(!upKey) {
        this.ySpeed = 0;
      }
    }

    if(this.x >= 1070)
    {
      this.x = 1070;
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
    fill(100);
    rect(this.x, this.y, this.width, this.height);
  }
}