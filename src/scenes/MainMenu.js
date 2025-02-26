class MainMenu extends Phaser.Scene {
    constructor() {
        super("mainMenu");

    }

    preload() {
        this.load.path = './assets/img/'
        this.load.path = './assets/sounds/'
    }

    init() {
        console.log("init")
        this.HP = 100
        this.EXP = 0
        console.log(`HP: ${this.HP} EXP: ${this.EXP}`)
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
            fontSize: '50px',
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
            fontSize: '24px',
            color: '#ffffff',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
        }

        this.add.text(game.config.width/2, game.config.height/2 - 200,
            'CONTROLS', titleConfig).setOrigin(0.5)

        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (Space) to start', scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 - 128,
            'Control your ship by holding (Mouse1), Change your engine levels using (W) and (S)', scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 - 64,
            'Going fast will use less fuel, so choose your speed wisely!', scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 - 32,
            'Your ship will blow up once you run out of fuel', scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 - 96,
            'Dont hit the blocks and collect the fuel cells to keep going', scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2,
            'As time goes on, blocks will take more fuel, and fuel drains faster', scoreConfig).setOrigin(0.5)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(KEY_START)) {

            this.scene.start("playScene")

        }
    }
}
