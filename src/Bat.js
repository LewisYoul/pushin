import Phaser from "phaser";

export default class Bat extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, keys = undefined, width = 16, height = 120) {
    super(scene, x, y, key);
    scene.add.existing(this);
    scene.physics.add.existing(this)
    this.isLeft = (x < 400);
    this.speed = 6;
    this.halfSpeed = this.speed / 2;
    this.score = 0;
    this.aiOffset = 0;
    this.anchor
    this.keys = keys
    this.setCollideWorldBounds(true);
    this.setImmovable(1)
    this.setSize(width, height)
  }


  update(ball) {
    let movement = 0;
    if (this.keys) {
      if (this.keys.up.isDown) { movement = -this.speed; };
      if (this.keys.down.isDown) { movement = this.speed; };

      this.y = Math.min(400, Math.max(80, this.y + movement))
    } else {
      const xDistance = Math.abs(ball.x - this.x)
      const targetY1 = 240;
      const targetY2 = ball.y + this.aiOffset;
      const weight1 = Math.min(1, xDistance / 240); //returns 1 if the ball is on the opposite side of the screen as the AI bat
      const weight2 = 1 - weight1; // returns 0 if the ball is on the opposite side of the screen to the AI bat
      const targetY = (weight1 * targetY1) + (weight2 * targetY2);

      if (targetY < this.y - this.halfSpeed) { // prevents the bat from glitching as just targetY < this.y can cause the bat to always be above or below the center
        movement = -this.speed
      } else if (targetY > this.y + this.halfSpeed) {
        movement = this.speed;
      }

      this.y = Math.min(400, Math.max(80, this.y + movement))
    }
  }

  isWinner() {
    return this.score >= 10;
  }
}
