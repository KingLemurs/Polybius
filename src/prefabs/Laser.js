// Laser prefab
class Laser extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      // add object to existing scene
      scene.add.existing(this);
      this.setActive(false)
      this.setVisible(false);
    }

    update(){
        // left/right movement
        if(KEY_LEFT.isDown){
            console.log("left")
            this.x = 75;
            this.y = 300;
            this.angle = 180;
        }
        else if(KEY_RIGHT.isDown){
            console.log("right")
            this.x = 700;
            this.y = 300;
            this.angle = 360;
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
            this.sfxShot.play()
        }
    }

    // reset rocket "to ground"
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}