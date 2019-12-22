import Phaser from "phaser";
import Bat from './Bat';
import Ball from './Ball';

export default class Play extends Phaser.Scene {
	constructor() {
		super('Play')
	}

	preload () {
    this.load.image('table', 'src/assets/images/table.png');
    this.load.image('left_bat', 'src/assets/images/bat00.png');
    this.load.image('right_bat', 'src/assets/images/bat10.png');
    this.load.image('ball', 'src/assets/images/ball.png');
    this.load.image('digit00', 'src/assets/images/digit00.png');
  }

  create () {
      this.add.image(400, 240, 'table');
      this.add.image(340, 83, 'digit00');
      this.add.image(460, 83, 'digit00')
      this.bat1 = new Bat(this, 40, 240, 'left_bat')
      this.bat2 = new Bat(this, 760, 240, 'right_bat')
      this.ball = new Ball(this, 400, 240, 'ball')
      this.objects = [this.bat1, this.bat2, this.ball]
      this.halfWidth = 400;
      this.halfHeight = 240;
      this.physics.add.collider(this.ball, this.bat1, this.collideBall, null, this);
      this.physics.add.collider(this.ball, this.bat2, this.collideBall, null, this);

      this.keys = this.input.keyboard.createCursorKeys();

      this.physics.world.checkCollision.left = false;
      this.physics.world.checkCollision.right = false;
    }

  update () {
    if (this.ball.isOutLeft()) {
      this.bat1.score += 1;
    } else if (this.ball.isOutRight()) {
      this.bat2.score += 1;
    } else {
      this.ball.update()
      this.objects.forEach(object => object.update(this.keys));
    }
  }

  collideBall(ball, bat) {
    ball.collideWithBat(bat)
  }
}