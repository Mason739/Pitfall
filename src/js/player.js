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

  /**
   * y velocity of the player
   * @note there is only a y velocity, so no need to specify
   * @type {Number}
   */
  velocity: 0,

  jumpXvelocity: 0,

  groundLevel: 0,

  ladder: false,

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

    // TODO: This should be if (player.isTouchingHole)
    if (this.x > 210 && this.x < 270 && this.y < 10 && !this.ladder && !this.inJump) {
      this.inJump = true;
      this.groundLevel = 163;
      this.jumpXvelocity = 0;
    }

    // console.log(this.x);

    if (this.x > 210 && this.x < 270 && controls.isControlPressed("UP")) {
      this.ladder = true;
      this.y -= 10;
      this.velocity = 0;
      console.log("Ladder up");
    }

    if (this.ladder && this.y < 0) {
      this.velocity = -10;
      this.groundLevel = 0;
      this.inJump = true;
      this.jumpXvelocity = 10;
      this.ladder = false;
    }

    if (this.x > 700 && this.y > 30) {
      this.x = 700;
    }



  }
}
