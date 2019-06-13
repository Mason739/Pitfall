let assets = {
  images: {},
  sounds: {},
};

let assetManager = {
  successCount: 0,
  errorCount: 0,
  weaponsLoaded: 0,
  imageSources: {
    'trees': '/assets/trees.png',
    'trunk': '/assets/treetrunk.png',
    'brick': '/assets/bricks.png',
    'log': '/assets/log.png',
    'idle': '/assets/idle.png',

    'runa': '/assets/runa.png',
    'runb': '/assets/runb.png',
    'runc': '/assets/runc.png',
    'rund': '/assets/rund.png',
    'rune': '/assets/rune.png',

    'runaflip': '/assets/flipped/runa.png',
    'runbflip': '/assets/flipped/runb.png',
    'runcflip': '/assets/flipped/runc.png',
    'rundflip': '/assets/flipped/rund.png',
    'runeflip': '/assets/flipped/rune.png',

    'jump': '/assets/jump.png',
    'jumpflip': '/assets/flipped/jump.png',

    'hurt': '/assets/hurt.png',

    // 'runa': '/assets/tile000.png',
    // 'runb': '/assets/tile001.png',
    // 'runc': '/assets/tile002.png',
    // 'rund': '/assets/tile003.png',
    // 'rune': '/assets/tile004.png',

  },

  isDone: function() {
    return (Object.keys(this.imageSources).length === this.successCount + this.errorCount);

  },

  downloadWeapons: function() {
    for (var name in this.weaponSources) {
      console.log("Begin downloading", this.weaponSources[name])
      $.getJSON(this.weaponSources[name], function(data) {
        console.log("Weapon downloaded");
        weapons[data.name] = data;
        assetManager.weaponsLoaded++;
        if(assetManager.isDone()) {
          startGame();
        }
      })
    }
  },

  downloadImages: function() {
    for (var name in this.imageSources) {
      if (this.imageSources.hasOwnProperty(name)) {
          var path = this.imageSources[name];
          var img = new Image();

          img.addEventListener("load", function() {
            assetManager.successCount++;
            if(assetManager.isDone()) {
              startGame();
            }
          }, false);

          img.addEventListener("error", function() {
              assetManager.errorCount++;

              if(assetManager.isDone()) {
                startGame();
              }
          }, false);

          img.src = path;
          assets.images[name] = img;
          console.log("Loading Asset: " + name);

      }
    }
  },

  downloadSounds: function() {
    // Example:
    // assets.sounds.newsound = new Howl({
    //   src: ['/soundsourec.wav'],
    // });

  }


}
