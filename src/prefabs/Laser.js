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
        // fire button
        if (Phaser.Input.Keyboard.JustDown(KEY_FIRE) && !this.isFiring) {
            this.setActive(true)
            this.setVisible(true)
            this.isFiring = true
            this.sfxShot.play()
        }
    }

    // reset rocket "to ground"
    reset() {
        this.isFiring = false;
        this.setActive(false);
        this.setVisible(false); 
        this.y = game.config.height - borderUISize - borderPadding;
    }
}