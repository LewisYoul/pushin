import Phaser from 'phaser';

export default class Ball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene,x, y, key, width = 24, height = 24) {
    super(scene, x, y, key);
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.speed = 300;
    this.setVelocity(this.speed, 0);
    this.setCollideWorldBounds(true);
    this.setBounce(1)
    this.setSize(width, height)
  }

  kickOff() {
    this.speed = 300;
    const velocity = this.isOutLeft() ? -this.speed : this.speed
    this.setVelocity(velocity, 0);
    this.setPosition(400, 240);
  }

  collideWithBat(bat) {
    this.increaseSpeed();
    this.playCollisionSound();
    const vector = this.body.velocity.clone() // Clone the vector of the ball so we have reference to it
    const differenceY = this.y - bat.y; // Determine how far from the center of the bat the ball is

    let dx = vector.x / this.speed // Reduce the scale of the vector back to 1 as it is scaled each time to speed the ball up
    let dy = vector.y / this.speed
    dy += differenceY / 120; // Divide the difference by the length of the bat and add the result to the y vector
    dy = Math.min(Math.max(dy, -1), 1) // Ensure that the vector y value is always between -1 and 1

    const length = Math.hypot(dx, dy)
    const xvec = dx / length
    const yvec = dy / length // Create a unit bector from the calculated vector

    this.body.velocity.set(xvec, yvec).scale(this.speed) // Set the unit vector on the ball and scale it according to the speed the ball should be at
  }

  isOutLeft () {
    const worldBounds = this.scene.physics.world.bounds;

    return this.x <= worldBounds.left;
  }

  isOutRight () {
    const worldBounds = this.scene.physics.world.bounds;

    return this.x >= worldBounds.right;
  }

  increaseSpeed() {
    this.speed += 50;
  }

  playCollisionSound() {
    if (this.speed < 600) {
      this.scene.sound.play('hit_slow0')
    } else if (this.speed < 850) {
      this.scene.sound.play('hit_medium0')
    } else if (this.speed < 1100) {
      this.scene.sound.play('hit_fast0')
    } else {
      this.scene.sound.play('hit_veryfast0')
    }
  }
}
