let game = {};

function startGame() {


  requestAnimationFrame(game.mainLoop);

  /**
  * The canvas element.
  * @type {Object}
  */
  game.canvas = {
    element: document.getElementById("myCanvas")
  }

  game.canvas.ctx = game.canvas.element.getContext("2d");

  game.start();

}


/**
* Define the namespace for all game operations
* @namespace
*/
game = {
  lastFrameTimeMs: 0,
  delta: 0,

  started: false,
  start: function() {
    this.started = true;
  },

  /**
  * True if the game is running. False if not (ie paused)
  * @type {Boolean}
  */
  running: true,

  pause: function() {
    // BUG: Will delayed function calls mess up the pause? Yes. Better question, are there any important delayed function calls. I forget what they are called
    if(this.running) {
      this.running = false;
      clock.pause();
    }
  },

  play: function() {
    if(!this.running) {
      this.running = true;
      clock.play();
    }
  },

  togglePlayPause: function() {
    if(this.running) {
      this.pause();
    } else {
      this.play();
    }
  },


  /**
  * The object that contains all of the data about the current level.
  * @type {Object}
  */
  world: {},

  /**
  * Has the pause key been released since being pressed?
  * Prevents very fast switching between paused and unpaused
  * @type {Boolean}
  */
  pauseKeyReleased: true,

  update: function(delta) {
    if(!this.started) {
      return;
    }
    camera.updateSize();
    camera.updatePosition();

    if(controls.isControlPressed('PAUSE')) {
      if(this.pauseKeyReleased) {
        this.pauseKeyReleased = false;
        this.togglePlayPause();
      }
    } else {
      this.pauseKeyReleased = true;
    }

    if(this.running) {
      // Game step code
    }

  },

  mainLoop: function(timestamp) {
    // Throttle the frame rate.
    if (timestamp < game.lastFrameTimeMs + (1000 / MAX_FPS)) {
      requestAnimationFrame(game.mainLoop);
      return;
    }
    game.delta += timestamp - game.lastFrameTimeMs;
    game.lastFrameTimeMs = timestamp;

    while (game.delta >= TIMESTEP) {
      game.update(TIMESTEP);
      game.delta -= TIMESTEP;
    }
    camera.draw();
    requestAnimationFrame(game.mainLoop);
  },


};

window.onload = function() {
  assetManager.downloadImages();
}





/**
* Stores the maximum number of frames to render per second.
* @type {Number}
* @default
* @constant
*/
const MAX_FPS = 60;

/**
* The time constant for each render step of the world
* @type {Number}
* @constant
* @default
*/
const TIMESTEP = 1000 / 60;
