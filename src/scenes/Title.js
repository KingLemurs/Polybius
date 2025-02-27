class Title extends Phaser.Scene {
    constructor() {
        super("title");

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
            color: '#00FFFF',
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
            color: '#00BFFF',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
        }

        this.add.text(game.config.width/2, game.config.height/2 - 200,
            'POLYBIUS', titleConfig).setOrigin(0.5)

        this.add.text(game.config.width/2, game.config.height/2 + 64, '(C) 1981 SINNESLOCHEN INC', scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 100, 'CREDITS: 0', scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 136, 'PRESS SPACE TO START', scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 172, 'BY NIKOLAS MAKRANYI AND JOSH GIOFFRE', scoreConfig).setOrigin(0.5)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(KEY_START)) {
            this.scene.start("mainMenu")
        }
    }
}
