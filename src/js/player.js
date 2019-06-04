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

  /**
   * Moves the player one step based on current controls
   * @return {undefined} no return value
   */
  move: function() {

    if (controls.isControlPressed('MOVE_RIGHT')) {
      this.x += 10;
    } else if (controls.isControlPressed('MOVE_LEFT')) {
      this.x -= 10;
    }

    if (controls.isControlPressed("BUTTON") && this.velocity < 1) {
      this.velocity += 10;
    }

    // TODO: This should be if(player.isTouchingGround)
    if (1) {
      this.velocity -= 0.5;
    }

    this.y -= this.velocity;

  }
}
