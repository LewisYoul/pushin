import Phaser from 'phaser';
const { Body, Bodies } = Phaser.Physics.Matter.Matter; // Native Matter modules

export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.cursors = scene.cursors;
    this.moveForce = 0.01;
    this.jumpForce = this.moveForce * 1.5;
    // Create the physics-based sprite that we will move around and animate
    this.sprite = scene.matter.add.sprite(0, 0, "player", 0);
    this.isTouching = { left: false, right: false, ground: false };
    const { width: w, height: h } = this.sprite;
    const mainBody = Bodies.rectangle(0, 0, w * 0.6, h, { chamfer: { radius: 10 } });
    console.log('w', w)
    this.sensors = {
      bottom: Bodies.rectangle(0, h * 0.5, w * 0.25, 2, { isSensor: true }),
      left: Bodies.rectangle(-w * 0.35, 0, 2, h * 0.5, { isSensor: true }),
      right: Bodies.rectangle(w * 0.35, 0, 2, h * 0.5, { isSensor: true })
    };
    const compoundBody = Body.create({
      parts: [mainBody, this.sensors.bottom, this.sensors.left, this.sensors.right],
      frictionStatic: 0,
      frictionAir: 0.02,
      friction: 0.1
    });
    this.sprite
      .setExistingBody(compoundBody)
      .setScale(2)
      .setFixedRotation() // Sets inertia to infinity so the player can't rotate
      .setPosition(x, y);
    
      const anims = scene.anims;
      anims.create({
        key: "player-idle",
        frames: anims.generateFrameNumbers("player", { start: 0, end: 3 }),
        frameRate: 3,
        repeat: -1
      });

      anims.create({
        key: "player-run",
        frames: anims.generateFrameNumbers("player", { start: 8, end: 15 }),
        frameRate: 12,
        repeat: -1
      });
      this.isTouching = { left: false, right: false, ground: false };

    // Jumping is going to have a cooldown
    this.canJump = true;
    this.jumpCooldownTimer = null;

    // Before matter's update, reset our record of what surfaces the player is touching.
    this.scene.matter.world.on("beforeupdate", this.resetTouching, this);

    // If a sensor just started colliding with something, or it continues to collide with something,
    // call onSensorCollide
    this.scene.matterCollision.addOnCollideStart({
      objectA: [this.sensors.bottom, this.sensors.left, this.sensors.right],
      callback: this.onSensorCollide,
      context: this
    });
    
    this.scene.matterCollision.addOnCollideActive({
      objectA: [this.sensors.bottom, this.sensors.left, this.sensors.right],
      callback: this.onSensorCollide,
      context: this
    });

    this.scene.matterCollision.addOnCollideEnd({
      objectA: [this.sensors.bottom, this.sensors.left, this.sensors.right],
      callback: this.onCollideEnd,
      context: this
    });
  }

  updateMovement() {
    if (this.scene.cursors.left.isDown) {
      this.sprite.setFlipX(true);
      this.sprite.applyForce({ x: -this.moveForce, y: 0 });
    }
    else if (this.scene.cursors.right.isDown) {
      this.sprite.setFlipX(false);
      this.sprite.applyForce({ x: this.moveForce, y: 0 });
    }

    if (this.sprite.body.velocity.x > 7) this.sprite.setVelocityX(7);
    else if (this.sprite.body.velocity.x < -7) this.sprite.setVelocityX(-7);

    if (this.scene.cursors.up.isDown && this.canJump && this.isTouching.ground) {
      this.sprite.setVelocityY(-11);

      // Add a slight delay between jumps since the bottom sensor will still collide for a few
      // frames after a jump is initiated
      this.canJump = false;
      this.jumpCooldownTimer = this.scene.time.addEvent({
        delay: 250,
        callback: () => (this.canJump = true)
      });
    }
  }

  updateSprite() {
    if ((this.scene.cursors.left.isDown || this.scene.cursors.right.isDown) && this.isTouching.ground) {
      this.sprite.anims.play("player-run", true);
    }
    else if (this.isTouching.ground) {
      this.sprite.anims.play("player-idle", true);
    } else {
      this.sprite.anims.stop();
      this.sprite.setTexture("player", 10);
    }
  }

  update() {
    this.updateMovement();
    this.updateSprite();
  }

  onSensorCollide({ bodyA, bodyB, pair }) {
    if (bodyB.isSensor) return; // We only care about collisions with physical objects
    if (bodyA === this.sensors.left) {
      this.isTouching.left = true;
      this.sprite.body.friction = 0;
    } else if (bodyA === this.sensors.right) {
      this.isTouching.right = true;
      this.sprite.body.friction = 0;
    } else if (bodyA === this.sensors.bottom) {
      this.isTouching.ground = true;
    }
  }

  onCollideEnd({ bodyA, bodyB, pair }) { 
    if (bodyB.isSensor) return; // We only care about collisions with physical objects
    if (bodyA === this.sensors.left) {
      this.isTouching.left = false;
      this.sprite.body.friction = 0.1;
    } else if (bodyA === this.sensors.right) {
      this.isTouching.right = false;
      this.sprite.body.friction = 0.1;
    } else if (bodyA === this.sensors.bottom) {
      this.isTouching.ground = false;
    }
  }

  resetTouching() {
    this.isTouching.left = false;
    this.isTouching.right = false;
    this.isTouching.ground = false;
  }
}
