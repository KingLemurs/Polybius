class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, core, index) {
        super(scene, x, y, texture, frame);

        this.core = core;
        this.index = index
        this.distance = 300;
        this.cutscene = true;
        this.lastAngle = core.angle;
        // add object to existing scene
        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.cutsceneTween = scene.tweens.add({
            targets: this,
            x: core.x + Math.cos((360 / 10) * Phaser.Math.DegToRad(this.index)) * this.distance,
            y: core.y + Math.sin((360 / 10) * Phaser.Math.DegToRad(this.index)) * this.distance,
            duration: 3000,
            ease: "sine-inout"
        })
        this.cutsceneTween.play();
        this.cutsceneTween.on('complete', () => {
            this.cutscene = false;
        })
    }

    onCoreIdle(core) {

    }

    onCoreUpdate(core) {

    }

    update() {
        if (this.cutscene) return;

        let newDestX = this.core.x + Math.cos((360 / 10) * Phaser.Math.DegToRad(this.index) + Phaser.Math.DegToRad(this.core.angle)) * this.distance;
        let newDestY = this.core.y + Math.cos((360 / 10) * Phaser.Math.DegToRad(this.index) + Phaser.Math.DegToRad(this.core.angle)) * this.distance;

        let newDir = new Phaser.Math.Vector2(newDestX - this.x, newDestY - this.y).normalize();
        // this.body.setVelocity(newDir.x * 100, newDir.y * 100);
        // this.scene.physics.moveTo(this, newDestX, newDestY, 60);
        Phaser.Actions.RotateAroundDistance([this], this.core, this.core.rotSpeed / 400, 300);
        // this.lastAngle = this.core.angle;
    }
}