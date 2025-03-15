class Play extends Phaser.Scene {
    constructor() {
        // name of scene to phaser
        super("playScene")
        this.cutscene = true;
        this.gameOverText = false;
    }

    create() {
        this.gameOverText = false;
        this.cutsceneTween = this.tweens.add({
            targets: this.cameras.main,
            zoom: .8,
            duration: 4000,
            ease: "sine-inout"
        })

        this.cameras.main.zoom = .2;
        this.cutsceneTween.play();
        this.physics.world.setFPS(60)
        this.player = new Player(this, config.width / 2, 25, "spaceship")
        this.player.angle = 270;
        // this.laser = new Laser(this, 725, 300, "laser")
            //this.entity = new TheEntity(this, 387.5, 300, "entity")

        this.core = new TheEntity(this, config.width / 2, config.height / 2, "coresix");
        this.core.body.setImmovable(true);

        this.core.angle = .01;
        this.mirrorCore = this.add.sprite(config.width / 2, config.height / 2, "mirrorcore");
        this.mirrorCoreDir = -1;
        this.mirrorCoreSpeed = 0.077
        
        this.core.on('attack', () => {
            this.mirrorCoreDir = this.core.direction;
            this.mirrorCoreSpeed = Phaser.Math.Between(6, 9) / 100;
            console.log(`hi ${this.mirrorCoreDir}`)
        });

        this.mirrorTween = this.tweens.add({
            targets: this.mirrorCore,
            x: this.core.x,
            y: this.core.y,
            duration: 8000,
            scaleY: -1,
            paused: true,
            ease: 'sine-inout',
            hold: 1000,
            yoyo: true,
        })

        this.cutsceneTween.on('complete', () => {
            this.cutscene = false;
            this.mirrorTween.play();
            this.mirrorTween.paused = false;
        });


        // this.engineText = this.add.text(10, 40, `Engine Level: ${this.player.engineLevel}`, scoreConfig);
        // this.scoreText = this.add.text(10, 20, `Score: 0`, scoreConfig);
        this.level = 1;
        this.gameOver = false;

        this.deathSound = this.sound.add('death');
        this.deathSound.volume = 0.8;

        //this.cameras.main.startFollow(this.player, false, 1, 0, -100);
        this.cameras.main.setDeadzone(200, 200);
        this.cameras.main.setBackgroundColor();

        console.log("play created")
        console.log(`HP: ${this.HP} EXP: ${this.EXP}`)

        KEY_LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        KEY_RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        KEY_UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        KEY_DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        KEY_MOVELEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        KEY_MOVERIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        KEY_MOVEUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        KEY_MOVEDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        KEY_FIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        KEY_RESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        KEY_MENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        this.physics.add.collider(this.player.lasers, this.core.enemies, (laser, enemy) => {
            let emitter = this.add.particles(enemy.x, enemy.y, 'flame', {
                lifespan: 600,
                speedX: {min: -150, max: 150},
                speedY: {min: -150, max: 150},
                scale: {start: 1, end: .5},
                blendMode: 'NORMAL',
                tint: enemy.color,
                emitting: false
            });

            this.deathSound.play();
            emitter.explode(20);
            laser.destroy();
            enemy.destroy();
        })

        this.physics.add.collider(this.player, this.core.enemies, (player, enemy) => {
            let emitter = this.add.particles(enemy.x, enemy.y, 'flame', {
                lifespan: 600,
                speedX: {min: -150, max: 150},
                speedY: {min: -150, max: 150},
                scale: {start: 1, end: .5},
                blendMode: 'NORMAL',
                tint: 0xFFFFFF,
                emitting: false
            });

            emitter.explode(20);
            player.destroy();
            this.gameOver = true;
        })

        this.physics.add.collider(this.player.lasers, this.core, (laser, core) => {
            let emitter = this.add.particles(laser.x, laser.y, 'flame', {
                lifespan: 600,
                speedX: {min: -150, max: 150},
                speedY: {min: -150, max: 150},
                scale: {start: 1, end: .5},
                blendMode: 'NORMAL',
                tint: 0xFFFFFF,
                emitting: false
            });

            if(core.health <= 0) {
                this.deathSound.play();
                let explosion = this.add.particles(core.x, core.y, 'flame', {
                    lifespan: 1200,
                    speedX: { min: -300, max: 300 },
                    speedY: { min: -300, max: 300 },
                    scale: { start: 2, end: 0 },
                    blendMode: 'NORMAL',
                    emitting: false,
                    tint: 0xFF4500 
                });

                emitter.explode(20);
                laser.destroy();

                for(let i = 0; i < 5; i++) {
                    this.time.delayedCall(25, () => { 
                        explosion.explode(100);
                    });
                }

                this.time.delayedCall(2000, () => { 
                    this.scene.start("ending"); 
                });
            }
            else {
                core.health -= 2;
                emitter.explode(20);
                laser.destroy();
                console.log(core.health);
            }
        })
    }

    update() {
        let scoreConfig = {
            fontFamily: 'PolybiusFont',
            fontSize: '36px',
            color: '#FFFFFF',
            align: 'left',
        }

        if(!this.gameOver && !this.cutscene) {
            this.player.update();         
        }
        if(this.player.health <= 0) {
            this.time.delayedCall(1000, () => {
                this.gameOver = true;
            })                   
        }

        if(this.gameOver === true && this.gameOverText === false)
        {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or (M) for Menu', scoreConfig).setOrigin(0.5)
            this.player.setVisible(false);
            this.core.setVisible(false);
            this.mirrorCore.setVisible(false);
            this.gameOverText = true;
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(KEY_RESET)) {
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(KEY_MENU)) {
            this.scene.start("mainMenu");
        }

        this.time.addEvent({
            delay: Phaser.Math.Between(4000, 15000),
            callback: this.showMessage,
            callbackScope: this,
            loop: true
        });

        if (this.cutscene) return;

        this.core.update();
        this.mirrorCore.angle += this.mirrorCoreSpeed * this.mirrorCoreDir;
    }

    showMessage() {
        if(this.gameOver === false) {
            this.message = this.add.text(10, 40, 'Homing Missiles Incoming', { fontFamily: 'Arial', fontSize: '20px', color: '#FFFFFF', align: 'left', padding: { top: 5, bottom: 5, }, });
            this.time.addEvent({
                delay: 3000,
                callback: this.message.destroy(),
                callbackScope: this,
                loop: false
            });
        }
    }
}
