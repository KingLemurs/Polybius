class Credits extends Phaser.Scene {
    constructor() {
        super("credits");

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

        // display credits
        this.add.text(game.config.width/2, game.config.height/2 - 200,
            'Credits', titleConfig).setOrigin(0.5)

        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Assets made by Nikolas Makranyi and Josh Gioffre', scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 96, 'Gameplay + visuals inspired by Polybius recreation by Gunther', scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 128, 'Polybius1981 Font by Grigoriy Sviridov', scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 160, 'Link: https://www.dafont.com/polybius1981.font', scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 224, 'Press SPACE to go back', scoreConfig).setOrigin(0.5)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(KEY_START)) {
            this.scene.start("mainMenu")
        }
    }
}
