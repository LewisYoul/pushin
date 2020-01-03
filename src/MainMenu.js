import Phaser from "phaser";

export default class MainMenu extends Phaser.Scene {
	constructor() {
		super('MainMenu')
		this.numPlayers = 1;
	}

	preload () {
    this.loadAssets();
  }

	create() {
		this.keys = this.input.keyboard.createCursorKeys();
		this.add.image(400, 240, 'table');
		this.add.image(40, 240, 'left_bat');
		this.add.image(760, 240, 'right_bat');
		this.menu0 = this.add.image(400, 240, 'menu0');
		this.menu1 = this.add.image(400, 240, 'menu1').setVisible(false);
		this.menus = [this.menu0, this.menu1];
	}

	update() {
		this.keys.space.isDown ? this.startGame() : this.toggleMenu();
	}

	loadAssets() {
    this.loadImages();
    this.loadAudio();
  }

	loadImages() {
		this.load.image('menu0', 'src/assets/images/menu0.png');
		this.load.image('menu1', 'src/assets/images/menu1.png');
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
    this.load.image('over', 'src/assets/images/over.png');
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
		this.load.audio('up', 'src/assets/sounds/up.ogg');
		this.load.audio('down', 'src/assets/sounds/down.ogg');
    this.load.audio('hit_slow0', 'src/assets/sounds/hit_slow0.ogg');
    this.load.audio('hit_medium0', 'src/assets/sounds/hit_medium0.ogg');
    this.load.audio('hit_fast0', 'src/assets/sounds/hit_fast0.ogg');
    this.load.audio('hit_veryfast0', 'src/assets/sounds/hit_veryfast0.ogg');
    this.load.audio('hit_synth0', 'src/assets/sounds/hit_synth0.ogg');
    this.load.audio('score_goal0', 'src/assets/sounds/score_goal0.ogg');
  }

	startGame() {
		this.scene.start('Play', { numPlayers: this.numPlayers });
	}

	toggleMenu() {
		if (this.shouldToggleMenu()) {
			this.toggleVisibleMenu();
			this.numPlayers = this.numPlayers === 1 ? 2 : 1;
		}
	}

	shouldToggleMenu() {
		return (this.keys.down.isDown && this.menu0.visible) || (this.keys.up.isDown && this.menu1.visible);
	}

	toggleVisibleMenu() {
		this.keys.down.isDown ? this.sound.play('down') : this.sound.play('up');
		this.menus.forEach(menu => menu.setVisible(!menu.visible));
	}
}
