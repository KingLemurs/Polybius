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
            this.time.addEvent({
                delay: 100,
                callback: this.showMessage,
                callbackScope: this,
                loop: true,
            });
            
            this.time.delayedCall(4000, () => {
                this.scene.start("playScene");
            })
        }
    }

    showMessage() {
        let x = Phaser.Math.Between(10, game.config.width - 200);
        let y = Phaser.Math.Between(10, game.config.height - 50);
        let messages = ['CANT BREAK FREE', 'HELP ME', 'IM TRAPPED', 'YOU CANNOT LEAVE'];
        let rand = Phaser.Math.Between(0, messages.length - 1);
    
        let message = this.add.text(x, y, messages[rand], { 
            fontFamily: 'PolybiusFont', 
            fontSize: '50px', 
            color: '#880808', 
        });
    
        this.time.addEvent({
            delay: 500,
            callback: () => {
                message.destroy();
            },
            callbackScope: this
        });
    }
}
