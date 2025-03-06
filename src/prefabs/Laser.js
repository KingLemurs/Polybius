// Laser prefab
class Laser extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      // add object to existing scene
        scene.physics.add.existing(this);
        scene.add.existing(this);
    }

    update() {
        this.angle += .25;
        if (this.x < 0 - 16 || this.x > config.width + 16) {
            this.destroy();
        }
        if (this.y < 0 - 16 || this.y > config.height + 16) {
            this.destroy();
        }
    }
}