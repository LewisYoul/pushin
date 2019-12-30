import Phaser from "phaser";

export default class Impact extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, key) {
    super(scene, x, y, key)
    scene.add.existing(this)
    scene.objects.push(this);
    this.time = 0;
  }

  update() {
    this.setTexture(`impact${this.time}`)

    if (this.time < 4) { 
      this.time += 1;
    } else {
      this.scene.objects = this.scene.objects.filter(obj => obj != this)
      this.destroy();
    }
  }
}
