class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, core, index) {
        super(scene, x, y, texture, frame);

        this.core = core;
        this.index = index
        this.distance = 200;
        this.duration = 3000
        this.spawnOffset = 0;
        this.color = 0x00FF00
        this.flung = false;
        this.cutscene = true;
        this.lastAngle = core.angle;
        // add object to existing scene
        scene.physics.add.existing(this);
        scene.add.existing(this);
    }

    onCoreIdle(core) {

    }

    onCoreAttack(core) {}

    attack() {
        this.distance += Phaser.Math.Between(0, this.core.rotSpeed / 3);
        this.angle += Phaser.Math.Between(-this.core.rotSpeed / 3, this.core.rotSpeed / 3);

        let flingChance = Phaser.Math.Between(0, 500);

        if (flingChance === 0) {
            this.flung = true;
        }
    }

    update() {
        if (this.cutscene) return;

        let newDestX = this.core.x + Math.cos((360 / 10) * Phaser.Math.DegToRad(this.index) + Phaser.Math.DegToRad(this.core.angle)) * this.distance;
        let newDestY = this.core.y + Math.cos((360 / 10) * Phaser.Math.DegToRad(this.index) + Phaser.Math.DegToRad(this.core.angle)) * this.distance;

        let newDir = new Phaser.Math.Vector2(newDestX - this.x, newDestY - this.y).normalize();
        // this.body.setVelocity(newDir.x * 100, newDir.y * 100);
        // this.scene.physics.moveTo(this, newDestX, newDestY, 60);
        if (this.flung) {
            this.distance += 1;
        }

        Phaser.Actions.RotateAroundDistance([this], this.core, this.core.rotSpeed / 400, this.distance);
        // this.lastAngle = this.core.angle;

        let attackChance = Phaser.Math.Between(0, 2);

        if (attackChance === 0) {
            this.attack();
        }

        if (this.x < 0 - this.body.width || this.x > config.width + this.body.width) {
            this.destroy();
            return;
        }
        if (this.y < 0 - this.body.height || this.y > config.height + this.body.height) {
            this.destroy();
        }
    }
}

class Green extends Enemy {
    constructor(scene, x, y, texture, frame, core, index) {
        super(scene, x, y, texture, frame, core, index);

        this.lastAngle = core.angle;
        // add object to existing scene
        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.cutsceneTween = scene.tweens.add({
            targets: this,
            x: core.x + Math.cos(((360 / 20) + this.spawnOffset) * Phaser.Math.DegToRad(this.index * 2)) * this.distance,
            y: core.y + Math.sin(((360 / 20) + this.spawnOffset) * Phaser.Math.DegToRad(this.index * 2)) * this.distance,
            duration: this.duration,
            ease: "sine-inout"
        })
        this.cutsceneTween.play();
        this.cutsceneTween.on('complete', () => {
            this.cutscene = false;
        })

    }
}

class Orange extends Enemy {
    constructor(scene, x, y, texture, frame, core, index) {
        super(scene, x, y, texture, frame, core, index);
        this.distance = 200;
        this.spawnOffset = 5;
        this.index += 1;
        this.duration = 3000;
        this.color = 0xFFA500

        this.cutsceneTween = scene.tweens.add({
            targets: this,
            x: core.x + Math.cos((360 / 20) * Phaser.Math.DegToRad(this.index * 2 - 1)) * this.distance,
            y: core.y + Math.sin((360 / 20) * Phaser.Math.DegToRad(this.index * 2 - 1)) * this.distance,
            duration: this.duration,
            ease: "sine-inout"
        })
        this.cutsceneTween.play();
        this.cutsceneTween.on('complete', () => {
            this.cutscene = false;
        })
    }

    attack() {
        this.distance += Phaser.Math.Between(0, this.core.rotSpeed / 2);
        this.angle += Phaser.Math.Between(-this.core.rotSpeed / 3, this.core.rotSpeed / 3);

        let flingChance = Phaser.Math.Between(0, 500);

        if (flingChance === 0) {
            this.flung = true;
        }
    }
}

class Red extends Enemy {
    constructor(scene, x, y, texture, frame, core, index) {
        super(scene, x, y, texture, frame, core, index);
        this.distance = 140;
        this.spawnOffset = 0;
        this.duration = 2000
        this.color = 0xFF0000

        this.cutsceneTween = scene.tweens.add({
            targets: this,
            x: core.x + Math.cos((360 / 5) * Phaser.Math.DegToRad(this.index)) * this.distance,
            y: core.y + Math.sin((360 / 5) * Phaser.Math.DegToRad(this.index)) * this.distance,
            duration: this.duration,
            ease: "sine-inout"
        })
        this.cutsceneTween.play();
        this.cutsceneTween.on('complete', () => {
            this.cutscene = false;
        })
    }

    attack() {
        this.distance += Phaser.Math.Between(-this.core.rotSpeed * 4, this.core.rotSpeed * 8);
        this.angle += Phaser.Math.Between(-this.core.rotSpeed * 5, this.core.rotSpeed * 10);
    }
}

class Purple extends Enemy {
    constructor(scene, x, y, texture, frame, core, index) {
        super(scene, x, y, texture, frame, core, index);
        this.distance = 135;
        this.spawnOffset = 0;
        this.index += 1;
        this.duration = 2000;
        this.color = 0xFF00FF

        this.cutsceneTween = scene.tweens.add({
            targets: this,
            x: core.x + Math.cos((360 / 10) * Phaser.Math.DegToRad(this.index * 2 - 1)) * this.distance,
            y: core.y + Math.sin((360 / 10) * Phaser.Math.DegToRad(this.index * 2 - 1)) * this.distance,
            duration: this.duration,
            ease: "sine-inout"
        })
        this.cutsceneTween.play();
        this.cutsceneTween.on('complete', () => {
            this.cutscene = false;
        })
    }

    attack() {
        this.distance += Phaser.Math.Between(0, this.core.rotSpeed / 2);
        this.angle += Phaser.Math.Between(-this.core.rotSpeed / 3, this.core.rotSpeed / 3);

        let attackChance = Phaser.Math.Between(0,200);

        if (attackChance === 0) {
            // shoot proj
            let laser = new Laser(this.scene, this.x, this.y, 'laser');
            this.core.enemies.add(laser);
            let playerDir = new Phaser.Math.Vector2(
                this.scene.player.x * this.scene.player.x - this.x * this.x,
                this.scene.player.y * this.scene.player.y - this.y * this.y)
            playerDir.normalize();
            laser.body.setVelocity(playerDir.x * 150, playerDir.y * 150);
        }
    }
}