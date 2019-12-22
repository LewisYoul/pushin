import Phaser from "phaser";

export default class MainMenu extends Phaser.Scene {
	constructor() {
		super('MainMenu')
	}

	preload() {
    this.load.image('table', 'src/assets/images/table.png');
    this.load.image('left_bat', 'src/assets/images/bat00.png');
		this.load.image('right_bat', 'src/assets/images/bat10.png');
		this.load.image('menu0', 'src/assets/images/menu0.png');
		this.load.image('menu1', 'src/assets/images/menu1.png');
	}

	create() {
		this.keys = this.input.keyboard.createCursorKeys();
		this.add.image(400, 240, 'table');
		this.add.image(40, 240, 'left_bat');
		this.add.image(760, 240, 'right_bat');
		this.menu0 = this.add.image(400, 240, 'menu0')
		this.menu1 = this.add.image(400, 240, 'menu1').setVisible(false)
	}

	update() {
		if (this.keys.space.isDown) {
			this.scene.start('Play');
		} else if (this.keys.down.isDown && this.menu0.visible) {
			this.menu0.setVisible(false);
			this.menu1.setVisible(true);
		} else if (this.keys.up.isDown && this.menu1.visible) {
			this.menu0.setVisible(true);
			this.menu1.setVisible(false);
		}
	}
}