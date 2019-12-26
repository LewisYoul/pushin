import Phaser from "phaser";


export default class GameOver extends Phaser.Scene {
  static get ROOT_PATH() { return 'src/assets/images'; };
  static get IMAGES() { return ['table', 'over']; };

  constructor() {
    super('GameOver')
    this.rootPath = 'src/assets/images';
    this.images = ['table', 'over'];
	}

	preload() {
    this.images.forEach(img => this.load.image(img, `${this.rootPath}/${img}.png`))
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
