class Play extends Phaser.Scene {
    constructor() {
        // name of scene to phaser
        super("playScene")
        this.cutscene = true;
    }

    create() {
        this.cutsceneTween = this.tweens.add({
            targets: this.cameras.main,
            zoom: .8,
            duration: 4000,
            ease: "sine-inout"
        })

        this.cameras.main.zoom = .2;
        this.cutsceneTween.play();
        this.physics.world.setFPS(60)
        this.player = new Player(this, config.width / 2, 0, "spaceship")
        this.player.angle = 270;
        // this.laser = new Laser(this, 725, 300, "laser")
            //this.entity = new TheEntity(this, 387.5, 300, "entity")

        this.core = new TheEntity(this, config.width / 2, config.height / 2, "coresix");

        this.core.angle = .01;
        this.mirrorCore = this.add.sprite(config.width / 2, config.height / 2, "mirrorcore");
        this.mirrorCoreDir = -1;

        this.core.on('attack', () => {
            this.mirrorCoreDir = this.core.direction;
            console.log(`hi ${this.mirrorCoreDir}`)
        });

        this.mirrorTween = this.tweens.add({
            targets: this.mirrorCore,
            duration: 8000,
            scaleY: -1,
            paused: true,
            ease: 'sine-inout',
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

        //this.cameras.main.startFollow(this.player, false, 1, 0, -100);
        this.cameras.main.setDeadzone(200, 200);
        this.cameras.main.setBackgroundColor();

        console.log("play created")
        console.log(`HP: ${this.HP} EXP: ${this.EXP}`)

        KEY_LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        KEY_RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        KEY_UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        KEY_DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        KEY_FIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        KEY_RESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        KEY_MENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
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
            this.gameOver = true;         
        }

        if(this.gameOver === true)
        {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5)
            this.player.setVisible(false);
            this.core.setVisible(false);
            this.mirrorCore.setVisible(false);
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
        this.mirrorCore.angle += .0777 * this.mirrorCoreDir;
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
