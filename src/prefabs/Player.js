// Player prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      // add object to existing scene
      scene.add.existing(this);
      this.isFiring = false;
      this.moveSpeed = 2;
      this.health = 6;
      this.sfxShot = scene.sound.add('sfx-shot');
      this.lasers = scene.add.group();
      this.lasers.runChildUpdate = true;
    }

    update(){
        // left/right movement
        if(KEY_LEFT.isDown){
            this.flipX = false;
            console.log("left")
            this.x -= this.moveSpeed;
        }
        else if(KEY_RIGHT.isDown){
            this.flipX = true;
            console.log("right")
            this.x += this.moveSpeed;
        }
        else if(KEY_UP.isDown){
            console.log("up")
            this.x = 387.5;
            this.y = 50;
            this.angle = 270;
        }
        else if(KEY_DOWN.isDown){
            console.log("down")
            this.x = 387.5;
            this.y = 550;
            this.angle = 90;
        }
        // fire button
        if (Phaser.Input.Keyboard.JustDown(KEY_FIRE) && !this.isFiring) {
            this.isFiring = true
            let laser = new Laser(this.scene, this.x, this.y, 'laser');
            this.lasers.add(laser);
            //laser.body.set
            this.sfxShot.play()
            this.isFiring = false;
        }
    }

    // reset rocket "to ground"
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}