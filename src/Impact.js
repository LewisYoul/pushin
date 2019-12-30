import Phaser from "phaser";

export default class Impact extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, key) {
    super(scene, x, y, key)
    scene.add.existing(this); // add the impact to the scene
    scene.objects.push(this); // add the impact to the list of objects to update
    this.time = 0;
  }

  update() {
    this.setTexture(`impact${this.time}`); // Change the image rendered for the impact

    if (this.time < 4) { 
      this.time += 1;
    } else {
      this.scene.objects = this.scene.objects.filter(obj => obj != this) // remove the impact from the list of objects to update
      this.destroy();
    }
  }
}
