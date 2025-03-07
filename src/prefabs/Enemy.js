class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, core, index) {
        super(scene, x, y, texture, frame);

        this.core = core;
        this.index = index
        this.distance = 200;
        this.spawnOffset = 0;
        this.color = 0x00FF00
        this.cutscene = true;
        this.lastAngle = core.angle;
        // add object to existing scene
        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.cutsceneTween = scene.tweens.add({
            targets: this,
            x: core.x + Math.cos(((360 / 20) + this.spawnOffset) * Phaser.Math.DegToRad(this.index * 2)) * this.distance,
            y: core.y + Math.sin(((360 / 20) + this.spawnOffset) * Phaser.Math.DegToRad(this.index * 2)) * this.distance,
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
        Phaser.Actions.RotateAroundDistance([this], this.core, this.core.rotSpeed / 400, this.distance);
        // this.lastAngle = this.core.angle;

        let attackChance = Phaser.Math.Between(0, 2);

        if (attackChance === 0) {
            this.distance += Phaser.Math.Between(0, this.core.rotSpeed / 4);
            this.angle += Phaser.Math.Between(-this.core.rotSpeed / 4, this.core.rotSpeed / 4);
        }

        if (this.x < 0 - this.body.width || this.x > config.width + this.body.width) {
            this.destroy();
        }
        if (this.y < 0 - this.body.height || this.y > config.height + this.body.height) {
            this.destroy();
        }
    }
}

class Orange extends Enemy {
    constructor(scene, x, y, texture, frame, core, index) {
        super(scene, x, y, texture, frame, core, index);
        this.distance = 200;
        this.spawnOffset = 5;
        this.index += 1;
        this.color = 0xFFA500

        this.cutsceneTween = scene.tweens.add({
            targets: this,
            x: core.x + Math.cos((360 / 20) * Phaser.Math.DegToRad(this.index * 2 - 1)) * this.distance,
            y: core.y + Math.sin((360 / 20) * Phaser.Math.DegToRad(this.index * 2 - 1)) * this.distance,
            duration: 3000,
            ease: "sine-inout"
        })
    }
}