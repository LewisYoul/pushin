import Phaser from "phaser";

export default class MainMenu extends Phaser.Scene {
	constructor() {
		super('MainMenu')
		this.numPlayers = 1;
	}

	preload() {
    this.load.image('table', 'src/assets/images/table.png');
    this.load.image('left_bat', 'src/assets/images/bat00.png');
		this.load.image('right_bat', 'src/assets/images/bat10.png');
		this.load.image('menu0', 'src/assets/images/menu0.png');
		this.load.image('menu1', 'src/assets/images/menu1.png');

		this.load.audio('up', 'src/assets/sounds/up.ogg');
		this.load.audio('down', 'src/assets/sounds/down.ogg');
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
