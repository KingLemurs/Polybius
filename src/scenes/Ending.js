class Ending extends Phaser.Scene {
    constructor() {
        super("ending");

    }

    preload() {
        this.load.path = './assets/img/'

        this.load.path = './assets/sounds/'
    }

    init() {
    }

    create() {
        console.log("scene created")

        let playerStats = {
            HP: this.HP,
            EXP: this.EXP,
        }

        KEY_START = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        let titleConfig = {
            fontFamily: 'PolybiusFont',
            fontSize: '120px',
            color: '#ffffff',
            align: 'left',
            bold: true,
            padding: {
                top: 5,
                bottom: 5,
            },
        }

        let scoreConfig = {
            fontFamily: 'PolybiusFont',
            fontSize: '32px',
            color: '#ffffff',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
        }

        this.add.text(game.config.width/2, game.config.height/2 - 200,
            'CONGRATS, YOU WON!', titleConfig).setOrigin(0.5)

        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press SPACE to Return to Menu', scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 96, 'It is over now, right?', scoreConfig).setOrigin(0.5)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(KEY_START)) {
            this.children.removeAll();
            this.add.text(game.config.width/2, game.config.height/2 + 260,
                'YOU CANNOT LEAVE', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 - 90,
                'CANT BREAK FREE', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 170,
                'HELP ME', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 500,
                'IM TRAPPED', scoreConfig).setOrigin(0.5)
            this.time.delayedCall(1000, () => {
                this.scene.start("playScene");
            })
        }
    }
}
