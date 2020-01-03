import Phaser from "phaser";


export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver')
	}

	create() {
		this.keys = this.input.keyboard.createCursorKeys();
		this.add.image(400, 240, 'table');
		this.add.image(400, 240, 'over');
	}

	update() {
		if (this.keys.space.isDown) { this.scene.start('MainMenu'); };
	}
}
