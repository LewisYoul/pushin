import Phaser from "phaser";

export default class Bat extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, width = 16, height = 120) {
    super(scene, x, y, key);
    scene.add.existing(this);
    scene.physics.add.existing(this)
    this.isLeft = (x < 400);
    this.speed = 6;
    this.score = 0;
    this.anchor
    this.setCollideWorldBounds(true);
    this.setImmovable(1)
    this.setSize(width, height)
  }


  update(keys) {
    let movement = 0;
    if (keys.up.isDown) { movement = -this.speed; };
    if (keys.down.isDown) { movement = this.speed; };

    this.y = Math.min(400, Math.max(80, this.y + movement))
  }

  isWinner() {
    return this.score >= 10;
  }
}
