import Phaser from "phaser";
import Bat from './Bat';
import Ball from './Ball';

export default class Play extends Phaser.Scene {
	constructor() {
		super('Play')
  }

  init(data) {
    this.numPlayers = data.numPlayers
  }

	preload () {
    this.load.image('table', 'src/assets/images/table.png');
    this.load.image('left_bat', 'src/assets/images/bat00.png');
    this.load.image('right_bat', 'src/assets/images/bat10.png');
    this.load.image('ball', 'src/assets/images/ball.png');

    for (let i = 0; i < 10; i++) {
      this.load.image(`digit0${i}`, `src/assets/images/digit0${i}.png`);
    }
  }

  create () {
      this.add.image(400, 240, 'table');
      this.player1Score = this.add.image(340, 83, 'digit00');
      this.player2Score = this.add.image(460, 83, 'digit00')

      this.keys = this.input.keyboard.addKeys({
        up: 'up',
        down: 'down',
        space: 'space',
        w: 'W',
        s: 'S'
      })

      if (this.numPlayers === 1) {
        this.bat1 = new Bat(this, 40, 240, 'left_bat', { up: this.keys.up, down: this.keys.down })
        this.bat2 = new Bat(this, 760, 240, 'right_bat', { up: this.keys.w, down: this.keys.s })
      } else if (this.numPlayers === 2) {
        this.bat1 = new Bat(this, 40, 240, 'left_bat', { up: this.keys.w, down: this.keys.s })
        this.bat2 = new Bat(this, 760, 240, 'right_bat', { up: this.keys.up, down: this.keys.down })
      }

      this.ball = new Ball(this, 400, 240, 'ball')
      this.objects = [this.bat1, this.bat2, this.ball]
      this.halfWidth = 400;
      this.halfHeight = 240;
      this.physics.add.collider(this.ball, this.bat1, this.collideBall, null, this);
      this.physics.add.collider(this.ball, this.bat2, this.collideBall, null, this);

      this.physics.world.checkCollision.left = false;
      this.physics.world.checkCollision.right = false;
    }

  update () {
    if (this.ball.isOutLeft()) {
      this.bat2.score += 1;
      this.player2Score.destroy()
      if (this.bat2.isWinner()) { this.scene.start('GameOver'); };
      this.player2Score = this.add.image(460, 83, `digit0${this.bat2.score}`);
      this.ball.kickOff()
    } else if (this.ball.isOutRight()) {
      this.bat1.score += 1;
      this.player1Score.destroy()
      if (this.bat1.isWinner()) { this.scene.start('GameOver'); };
      this.player1Score = this.add.image(340, 83, `digit0${this.bat1.score}`);
      this.ball.kickOff()
    } else {
      this.ball.update()
      this.objects.forEach(object => object.update(this.keys));
    }
  }

  collideBall(ball, bat) {
    ball.collideWithBat(bat)
  }
}
