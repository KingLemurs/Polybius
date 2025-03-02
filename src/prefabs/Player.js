// Player prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      // add object to existing scene
      scene.add.existing(this);
      this.isFiring = false;
      this.moveSpeed = 2;
      this.sfxShot = scene.sound.add('sfx-shot');
    }

    update(){
        // left/right movement
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