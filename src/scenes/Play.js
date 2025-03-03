class Play extends Phaser.Scene {
    constructor() {
        // name of scene to phaser
        super("playScene")
    }

    create() {
        this.player = new Player(this, 700, 300, "spaceship")

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

        this.engineText = this.add.text(10, 40, `Engine Level: ${this.player.engineLevel}`, scoreConfig);
        this.scoreText = this.add.text(10, 20, `Score: 0`, scoreConfig);

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
        if(KEY_LEFT.isDown){
            console.log("left")
            this.player.x = 75;
            this.player.y = 300;
            this.player.angle = 180;
        }
        else if(KEY_RIGHT.isDown){
            console.log("right")
            this.player.x = 700;
            this.player.y = 300;
            this.player.angle = 360;
        }
        else if(KEY_UP.isDown){
            console.log("up")
            this.player.x = 387.5;
            this.player.y = 100;
            this.player.angle = 270;
        }
        else if(KEY_DOWN.isDown){
            console.log("down")
            this.player.x = 387.5;
            this.player.y = 500;
            this.player.angle = 90;
        }
    }
}
