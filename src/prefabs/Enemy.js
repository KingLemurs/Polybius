class TheEntity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.physics.add.existing(this);
        scene.add.existing(this);

    }

    onCoreIdle(core) {

    }

    onCoreUpdate(core) {

    }

    update() {

    }
}