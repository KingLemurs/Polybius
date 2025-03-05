class Play extends Phaser.Scene {
    constructor() {
        // name of scene to phaser
        super("playScene")
    }

    create() {
        this.physics.world.setFPS(60)
        this.player = new Player(this, 700, 300, "spaceship")
            //this.entity = new TheEntity(this, 387.5, 300, "entity")

        this.core = new TheEntity(this, config.width / 2, config.height / 2, "core");

        this.core.angle = .01;
        this.mirrorCore = this.add.sprite(config.width / 2, config.height / 2, "core");
        this.mirrorCoreDir = -1;

        this.core.on('attack', () => {
            this.mirrorCoreDir = this.core.direction;
            console.log(`hi ${this.mirrorCoreDir}`)
        });


        let scoreConfig = {
            fontFamily: 'Arial',
            fontSize: '20px',
            color: '#FFFFFF',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
        }

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
        KEY_RESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        KEY_MENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        if(!this.gameOver) {               
            this.player.update();         
        }
        this.time.addEvent({
            delay: Phaser.Math.Between(4000, 15000),
            callback: this.showMessage,
            callbackScope: this,
            loop: true
        });

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
