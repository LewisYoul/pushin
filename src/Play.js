import Phaser from "phaser";
import Bat from './Bat';
import Ball from './Ball';
import Impact from './Impact';

export default class Play extends Phaser.Scene {
	constructor() {
    super('Play')
    this.timer = 0;
  }

  init(data) {
    this.numPlayers = data.numPlayers
  }

	preload () {
    this.loadAssets();
  }

  create () {
    this.configureInput();
    this.createTable();
    this.createObjects();
    this.addColliders();
  }

  scoreGoal(attacker, defender, effect) {
    this.sound.play('score_goal0');
    this[attacker].score++;
    this[defender].displayImage('score', 12);
    this.scoreEffect = this.add.image(400, 240, effect)
    let position;

    attacker === 'bat1' ? position = [340, 83] : position = [460, 83];

    this.pointEffect = this.add.image(...position, `${attacker}_digit${this[attacker].score}`);
    this.timer = 12;
    if (this[attacker].isWinner()) { this.scene.start('GameOver'); };
    this[`${attacker}Score`].destroy();
    this[`${attacker}Score`] = this.add.image(...position, `digit0${this[attacker].score}`);
  }

  update () {
    if (this.ball.isOut()) {
      if (this.ball.isOutLeft()) {
        this.scoreGoal('bat2', 'bat1', 'effect0')
      } else {
        this.scoreGoal('bat1', 'bat2', 'effect1')
      }
      this.ball.kickOff()
    } else {
      if (this.timer > 0) {
        this.timer--;
      } else if (this.scoreEffect || this.pointEffect){
        this.scoreEffect.destroy();
        this.pointEffect.destroy();
      }
      this.objects.forEach(obj => obj.update(this.ball));
    }
  }

  loadAssets() {
    this.loadImages();
    this.loadAudio();
  }

  loadImages() {
    this.load.image('table', 'src/assets/images/table.png');
    this.load.image('effect0', 'src/assets/images/effect0.png');
    this.load.image('effect1', 'src/assets/images/effect1.png');
    this.load.image('left_bat', 'src/assets/images/bat00.png');
    this.load.image('left_bat_hit', 'src/assets/images/bat01.png');
    this.load.image('left_bat_score', 'src/assets/images/bat02.png');
    this.load.image('right_bat', 'src/assets/images/bat10.png');
    this.load.image('right_bat_hit', 'src/assets/images/bat11.png');
    this.load.image('right_bat_score', 'src/assets/images/bat12.png');
    this.load.image('ball', 'src/assets/images/ball.png');
    for (let i = 0; i < 10; i++) {
      this.load.image(`digit0${i}`, `src/assets/images/digit0${i}.png`);
    };
    for (let i = 0; i < 5; i++) {
      this.load.image(`impact${i}`, `src/assets/images/impact${i}.png`);
    };
    for (let i = 1; i < 10; i++) {
      this.load.image(`bat2_digit${i}`, `src/assets/images/digit1${i}.png`);
      this.load.image(`bat1_digit${i}`, `src/assets/images/digit2${i}.png`);
    };
  }

  loadAudio() {
    this.load.audio('hit_slow0', 'src/assets/sounds/hit_slow0.ogg');
    this.load.audio('hit_medium0', 'src/assets/sounds/hit_medium0.ogg');
    this.load.audio('hit_fast0', 'src/assets/sounds/hit_fast0.ogg');
    this.load.audio('hit_veryfast0', 'src/assets/sounds/hit_veryfast0.ogg');
    this.load.audio('hit_synth0', 'src/assets/sounds/hit_synth0.ogg');
    this.load.audio('score_goal0', 'src/assets/sounds/score_goal0.ogg');
  }

  configureInput() {
    this.keys = this.input.keyboard.addKeys({
      up: 'up',
      down: 'down',
      space: 'space',
      w: 'W',
      s: 'S'
    })
  }

  createTable() {
    this.halfWidth = 400;
    this.halfHeight = 240;
    this.add.image(400, 240, 'table');
    this.bat1Score = this.add.image(340, 83, 'digit00');
    this.bat2Score = this.add.image(460, 83, 'digit00');
  }

  createObjects() {
    if (this.numPlayers === 1) {
      this.bat1 = new Bat(this, 40, 240, 'left_bat', { up: this.keys.up, down: this.keys.down }).setDepth(1);
      this.bat2 = new Bat(this, 760, 240, 'right_bat').setDepth(1);
    } else if (this.numPlayers === 2) {
      this.bat1 = new Bat(this, 40, 240, 'left_bat', { up: this.keys.w, down: this.keys.s }).setDepth(1);
      this.bat2 = new Bat(this, 760, 240, 'right_bat', { up: this.keys.up, down: this.keys.down }).setDepth(1);
    }

    this.ball = new Ball(this, 400, 240, 'ball').setDepth(1);
    this.objects = [this.bat1, this.bat2, this.ball]
  }

  addColliders() {
    this.onWorldBounds = true
    this.physics.world.on('worldbounds', this.triggerWorldBounds, this);
    this.physics.add.collider(this.ball, this.bat1, this.collideBall, null, this);
    this.physics.add.collider(this.ball, this.bat2, this.collideBall, null, this);
    this.physics.world.checkCollision.left = false;
    this.physics.world.checkCollision.right = false;
  }

  collideBall(ball, bat) {
    new Impact(this, ball.x, ball.y, 'impact0');
    ball.collideWithBat(bat)
  }

  triggerWorldBounds() {
    this.sound.play('hit_synth0');
  }
}
