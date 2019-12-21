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
    this.speed = 4;
    this.velocityMultiplier = 100;
    this.setVelocity(this.speed * this.velocityMultiplier, -20)
    this.setCollideWorldBounds(true);
    this.setBounce(1)
    this.setSize(width, height)
  }

  // increaseVelocity() {
  //   console.log('velocity', this.body.velocity.normalize())
  //   this.body.velocity.normalize().scale(1000);
  // }

  collideWithBat(bat) {
    const vector = this.body.velocity.clone()
    
    if ((this.y <= (bat.y + 20)) && (this.y >= bat.y - 20)) {
      const dx = vector.x
      const dy = (vector.y / 2)

      const length = Math.hypot(dx, dy)

      const xvec = dx / length;
      const yvec = dy / length;
      this.body.velocity.set(xvec, yvec).scale(400)
    } else if (this.y < (bat.y + 20)) {
      const dx = bat.isLeft ? 1 : -1;
      const dy = -0.5
      const length = Math.hypot(dx, dy)

      const xvec = dx / length;
      const yvec = dy / length;
      this.body.velocity.set(xvec, yvec).scale(400)
    } else if (this.y > (bat.y - 20)) {
      const dx = bat.isLeft ? 1 : -1;
      const dy = 0.5
      const length = Math.hypot(dx, dy)

      const xvec = dx / length;
      const yvec = dy / length;
      this.body.velocity.set(xvec, yvec).scale(400)
    }
  }

  update () {
    if (this.body.x <= this.scene.physics.world.bounds.left) {
      console.log('PLAYER 2 WINS!')
    } else if (this.body.x >= this.scene.physics.world.bounds.right) {
      console.log('PLAYER 1 WINS!')
    }
  }
}

class Bat extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, width = 16, height = 120) {
    super(scene, x, y, key);
    scene.add.existing(this);
    scene.physics.add.existing(this)
    this.isLeft = (x < half_width);
    this.speed = 6;
    this.anchor
    this.setCollideWorldBounds(true);
    this.setImmovable(1)
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
          debug: false
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
    this.load.image('left_bat', 'src/assets/images/bat00.png');
    this.load.image('right_bat', 'src/assets/images/bat10.png');
    this.load.image('ball', 'src/assets/images/ball.png');
}

function create () {
    this.add.image(400, 240, 'table');
    this.bat1 = new Bat(this, 40, 240, 'left_bat')
    this.bat2 = new Bat(this, 760, 240, 'right_bat')
    this.ball = new Ball(this, 400, 240, 'ball')
    this.bats = [this.bat1, this.bat2]
    this.halfWidth = 400;
    this.halfHeight = 240;
    this.physics.add.collider(this.ball, this.bat1, collideBall, null, this);
    this.physics.add.collider(this.ball, this.bat2, collideBall, null, this);

    this.keys = this.input.keyboard.createCursorKeys();

    this.physics.world.checkCollision.left = false;
    this.physics.world.checkCollision.right = false;
  }

function update () {
  this.ball.update()
  this.bats.forEach(bat => { bat.update(this.keys) })
}

function collideBall (ball, bat) {
  ball.collideWithBat(bat)
  // ball.body.velocity.normalize(

  // ball.increaseVelocity()
  // var diff = 0;
  // console.log('vector', ball.body.velocity)

  // if (ball.y < bat.y) {
  //     //  Ball is on the left-hand side of the bat
  //     // if (leftBat) {
  //       diff = bat.y - ball.y;
  //       ball.setVelocityY(10 * diff);
  //     // }
  // } else if (ball.y > bat.y) {
  //     //  Ball is on the right-hand side of the bat
  //     diff = ball.y -bat.y;
  //     ball.setVelocityY(10 * diff);
  // } else {
  //     //  Ball is perfectly in the middle
  //     //  Add a little random X to stop it bouncing straight up!
  //     ball.setVelocityY(2 + Math.random() * 8);
  // }
}