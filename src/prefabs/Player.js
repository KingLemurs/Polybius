// Player prefab
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      // add object to existing scene
        scene.physics.add.existing(this);
      scene.add.existing(this);
      this.isFiring = false;
      this.moveSpeed = 2;
      this.health = 6;
      this.forwardDir = new Phaser.Math.Vector2(0,1);
      this.sfxShot = scene.sound.add('laser');
      this.sfxShot.volume = .7;
      this.lasers = scene.add.group();
      this.lasers.runChildUpdate = true;
    }

    update(){
        // left/right movement
        if(KEY_LEFT.isDown){
            console.log("left")
            this.x -= this.moveSpeed;
        }
        else if(KEY_RIGHT.isDown){
            console.log("right")
            this.x += this.moveSpeed;
        }
        else if(KEY_UP.isDown){
            console.log("up")
            this.y = 0;
            this.angle = 270;
            this.forwardDir = new Phaser.Math.Vector2(0,1);
        }
        else if(KEY_DOWN.isDown){
            console.log("down")
            this.y = 800;
            this.angle = 90;
            this.forwardDir = new Phaser.Math.Vector2(0,-1);
        }
        // fire button
        if (Phaser.Input.Keyboard.JustDown(KEY_FIRE) && !this.isFiring) {
            this.isFiring = true
            let laser = new Laser(this.scene, this.x, this.y, 'laser');
            laser.angle = this.angle;
            laser.body.setVelocity(this.forwardDir.x * 150, this.forwardDir.y * 150);
            this.lasers.add(laser);
            //laser.body.set
            this.sfxShot.play()

            this.cooldown = this.scene.time.addEvent({
                delay: 1000,
                loop: false,
                callback: () => {
                    this.isFiring = false;
                }
            })
        }
    }
}