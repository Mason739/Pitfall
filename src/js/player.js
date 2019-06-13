let player = {
  /**
   * X position of the player
   * @type {Number}
   */
  x: 0,

  /**
   * y position of the player
   * @type {Number}
   */
  y: 0,

  start: clock.now(),


  /**
   * y velocity of the player
   * @note there is only a y velocity, so no need to specify
   * @type {Number}
   */
  velocity: 0,

  jumpXvelocity: 0,

  groundLevel: 0,

  ladder: false,

  score: 2000,

  /**
   * Stores which screen the player is on.
   * @type {Number}
   */
  screen: 3,

  /**
   * Is the player inside a jump (because they can't move when inside a jump)
   * @type {Boolean}
   */
  inJump: false,

  /**
   * Moves the player one step based on current controls
   * @return {undefined} no return value
   */
  move: function() {


    if (!this.inJump) {
      if (controls.isControlPressed('MOVE_RIGHT')) {
        this.x += 5;
        this.jumpXvelocity = 5;
      } else if (controls.isControlPressed('MOVE_LEFT')) {
        this.x -= 5;
        this.jumpXvelocity = -5;
      } else {
        this.jumpXvelocity = 0;
      }
    } else {
      this.x += this.jumpXvelocity;
    }


    if (controls.isControlPressed("BUTTON") && this.inJump == false) {
      this.inJump = true;
      this.velocity += 10;
    }

    if(!this.ladder) {
      this.y -= this.velocity;

    }

    // TODO: This should be if(player.isTouchingGround)
    if (this.y < this.groundLevel) {
      this.velocity -= 0.5;
    } else {
      this.velocity = 0;
      this.inJump = false;
    }


    // Finish climbing ladder?
    if (this.ladder && this.y < 0) {
      this.velocity = -10;
      this.groundLevel = 0;
      this.inJump = true;
      this.jumpXvelocity = 10;
      this.ladder = false;
    }


    // Don't fall through the ground
    if (!this.inJump && this.y > this.groundLevel) {
      this.y = this.groundLevel + 1;
    }

    // Move to new screens
    if (this.x > 820) {
      this.screen++;
      this.x = 20;
    } else if (this.x < 0) {
      this.screen--;
      this.x = 780;
    }


    //===========================================
    //    SCREEN SPECIFIC STUFF STARTS HERE
    //===========================================

    if (this.screen == 1) {

      // Brick wall
      if (this.x > 700 && this.y > 30) {
        this.x = 700;
      }

      // TODO: This should be if (player.isTouchingHole)
      // Fall through pit
      if (this.x > 210 && this.x < 270 && this.y < 10 && !this.ladder && !this.inJump) {
        this.inJump = true;
        this.groundLevel = 163;
        this.jumpXvelocity = 0;
      }


      // Take damage if on log
      if (this.x > 565 && this.x < 615 && this.y > -10) {
        this.score -= 1;
        this.log = true;
      } else {
        this.log = false;
      }

      // Climb ladder
      if (this.x > 210 && this.x < 270 && controls.isControlPressed("UP")) {
        this.ladder = true;
        this.y -= 10;
        this.velocity = 0;
        console.log("Ladder up");
      }


    } else if (this.screen == 2) {
      // Brick wall
      if (this.x > 700 && this.y > 30) {
        this.x = 700;
      }

      // FALLING IN PITS
      // Pit #1 (left to right)
      if (this.x > 125 && this.x < 185 && this.y < 10 && !this.ladder && !this.inJump) {
        this.inJump = true;
        this.groundLevel = 163;
        this.jumpXvelocity = 0;
      }

      // Pit #2
      if (this.x > 295 && this.x < 340 && this.y < 10 && !this.ladder && !this.inJump) {
        this.inJump = true;
        this.groundLevel = 163;
        this.jumpXvelocity = 0;
      }
      // Climb pit 2
      if (this.x > 295 && this.x < 340 && controls.isControlPressed("UP")) {
        this.ladder = true;
        this.y -= 10;
        this.velocity = 0;
        console.log("Ladder up");
      }

      // Pit #3
      if (this.x > 460 && this.x < 525 && this.y < 10 && !this.ladder && !this.inJump) {
        this.inJump = true;
        this.groundLevel = 163;
        this.jumpXvelocity = 0;
      }


    } else if (this.screen == 3) {
      var pitl = 140;
      var pitr = 610;
      // MIDPOINT: 375
      // LENGTH:   235

      if (this.x > pitl && this.x < pitr && this.y > -10) {
        this.x = 30;
        this.y = -200
        this.inJump = true;
        this.jumpXvelocity = 0;
      }
    }

    //===========================================
    //    SCREEN SPECIFIC STUFF ENDS HERE
    //===========================================

  }
}
