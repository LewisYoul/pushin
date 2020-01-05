import Phaser from "phaser";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import Player from './Player';

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game',
  physics: {
      default: 'matter'
  },
  scene: {
      preload: preload,
      create: create,
      update: update,
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin, // The plugin class
        key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
        mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
      }
    ]
  }
};

let game = new Phaser.Game(config);

function preload() {
  this.load.spritesheet(
    "player",
    "src/assets/images/player.png",
    {
      frameWidth: 32,
      frameHeight: 32,
      margin: 1,
      spacing: 2
    }
  );
}

function create() {
  this.matter.world.setBounds();
  this.player = new Player(this, 400, 300);

  this.cursors = this.input.keyboard.createCursorKeys();
  this.matter.world.on('collisionstart', function (event,a,b) {

    // console.log('start', event, a, b)

  });

  this.matter.world.on('collisionstart', function (event,a,b) {
    // console.log('end', event, a, b)
  });
    // Smoothly follow the player
    // this.cameras.main.startFollow(this.player.sprite, false, 0.5, 0.5);
}

function update() {
  this.player.update()
}
