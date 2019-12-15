import Phaser from "phaser";

const height = 800;
const width = 480;
const title = 'Boing!';

const half_height = height / 2;
const half_width = width / 2;
const player_speed = 6;
const max_ai_speed = 6;

class Ball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene,x, y, key, width = 24, height = 24) {
    super(scene, x, y, key);
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setVelocityX(-100)
    this.setCollideWorldBounds(true);
    this.setSize(width, height)
  }
}

class Bat extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, width = 16, height = 120) {
    super(scene, x, y, key);
    scene.add.existing(this);
    scene.physics.add.existing(this)
    this.speed = 6;
    this.anchor
    this.setCollideWorldBounds(true);
    this.setSize(width, height)
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
    physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 0 },
          debug: true
      }
    },
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
    this.load.image('ball', 'src/assets/images/ball.png');
}

function create () {
  console.log('fiz', this.physics)
    this.add.image(400, 240, 'table');
    this.bat1 = new Bat(this, 40, 240, 'bat00')
    this.bat2 = new Bat(this, 760, 240, 'bat10')
    this.ball = new Ball(this, 400, 240, 'ball')
    this.bats = [this.bat1, this.bat2]

    this.physics.add.collider(this.bat1, this.ball);
    this.physics.add.collider(this.bat2, this.ball);

    this.keys = this.input.keyboard.createCursorKeys();
    console.log('scene', this.keys)
}

function update () {
  this.bats.forEach(bat => { bat.update(this.keys) })
}
