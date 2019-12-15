import Phaser from "phaser";

const height = 800;
const width = 480;
const title = 'Boing!';

const half_height = height / 2;
const half_width = width / 2;
const player_speed = 6;
const max_ai_speed = 6;

class Bat extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    scene.add.existing(this);
    this.speed = 6;
  }


  update(keys) {
    let movement = 0;
    if (keys.up.isDown) { movement = -this.speed; };
    if (keys.down.isDown) { movement = this.speed; };

    this.y = Math.min(400, Math.max(80, this.y + movement))
  }
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 480,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload () {
    this.load.image('table', 'src/assets/images/table.png');
    this.load.image('bat00', 'src/assets/images/bat00.png');
    this.load.image('bat10', 'src/assets/images/bat10.png');
}

function create () {
    this.add.image(400, 240, 'table');
    this.bat1 = new Bat(this, 40, 240, 'bat00')
    this.bat2 = new Bat(this, 760, 240, 'bat10')
    this.bats = [this.bat1, this.bat2]

    this.keys = this.input.keyboard.createCursorKeys();
    console.log('scene', this.keys)
}

function update () {
  this.bats.forEach(bat => { bat.update(this.keys) })
}
