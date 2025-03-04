// Enemy prefab
class TheEntity extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      // add object to existing scene
      scene.add.existing(this);
      this.isFiring = false;
      this.moveSpeed = 2;
      this.setSize(this.width * 3, this.height * 3);
      this.sfxShot = scene.sound.add('sfx-shot');
    }

    update(){
        // left/right movement
        if(KEY_LEFT.isDown){
            console.log("left")
            this.x = -700;
            this.y = 300;
        }
        else if(KEY_RIGHT.isDown){
            console.log("right")
            this.x = 700;
            this.y = 300;
        }
        else if(KEY_UP.isDown){
            this.x -= this.moveSpeed;
        }
        else if(KEY_DOWN.isDown){
            this.x += this.moveSpeed;
        }
        // fire button
        if (Phaser.Input.Keyboard.JustDown(KEY_FIRE) && !this.isFiring) {
            this.isFiring = true
            this.sfxShot.play()
        }
        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding){
            this.y -= this.moveSpeed;
        }
    }

    // reset rocket "to ground"
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}