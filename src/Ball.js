import Phaser from 'phaser';

export default class Ball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene,x, y, key, width = 24, height = 24) {
    super(scene, x, y, key);
    console.log('scene', scene)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.speed = 4;
    this.velocityMultiplier = 100;
    this.setVelocity(this.speed * this.velocityMultiplier, -20)
    this.setCollideWorldBounds(true);
    this.setBounce(1)
    this.setSize(width, height)
  }

  // increaseVelocity() {
  //   console.log('velocity', this.body.velocity.normalize())
  //   this.body.velocity.normalize().scale(1000);
  // }

  collideWithBat(bat) {
      console.log('bat', bat, 'ball', this)
    const vector = this.body.velocity.clone()
    
    if ((this.y <= (bat.y + 20)) && (this.y >= bat.y - 20)) {
      const dx = vector.x
      const dy = (vector.y / 2)

      const length = Math.hypot(dx, dy)

      const xvec = dx / length;
      const yvec = dy / length;
      this.body.velocity.set(xvec, yvec).scale(400)
    } else if (this.y < (bat.y + 20)) {
      const dx = bat.isLeft ? 1 : -1;
      const dy = -0.5
      const length = Math.hypot(dx, dy)

      const xvec = dx / length;
      const yvec = dy / length;
      this.body.velocity.set(xvec, yvec).scale(400)
    } else if (this.y > (bat.y - 20)) {
      const dx = bat.isLeft ? 1 : -1;
      const dy = 0.5
      const length = Math.hypot(dx, dy)

      const xvec = dx / length;
      const yvec = dy / length;
      this.body.velocity.set(xvec, yvec).scale(400)
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
}