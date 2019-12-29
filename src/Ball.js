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
    const vector = this.body.velocity.clone()
    
    if ((this.y <= (bat.y + 20)) && (this.y >= bat.y - 20)) { // ball is in center of bat
      const dx = vector.x
      const dy = (vector.y / 2)

      const length = Math.hypot(dx, dy)

      const xvec = dx / length;
      const yvec = dy / length;
      this.body.velocity.set(xvec, yvec).scale(this.speed)
    } else if (this.y < (bat.y + 20)) { // ball is at top of bat
      const dx = bat.isLeft ? 1 : -1;
      const dy = -0.5
      const length = Math.hypot(dx, dy)

      const xvec = dx / length;
      const yvec = dy / length;
      this.body.velocity.set(xvec, yvec).scale(this.speed)
    } else if (this.y > (bat.y - 20)) { // ball is at bottom of bat
      const dx = bat.isLeft ? 1 : -1;
      const dy = 0.5
      const length = Math.hypot(dx, dy)

      const xvec = dx / length;
      const yvec = dy / length;
      this.body.velocity.set(xvec, yvec).scale(this.speed)
    }
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
}
