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

class MainMenu extends Phaser.Scene {
    constructor() {
        super("mainMenu");
    }

    preload() {
        // Load Sprites
        this.load.path = "./assets/sprites/";
        this.load.image('spaceship', 'spaceship.png')
        this.load.image('test', 'test.png')
        this.load.image('coresix', 'coreSix.png')
        this.load.image('coreeight', 'coreEight.png')
        this.load.image('coreone', 'coreOne.png')
        this.load.image('mirrorcore', 'mirrorCore.png')
        this.load.image('green', 'enemyGreen.png')
        this.load.image('orange', 'enemyOrange.png')
        this.load.image('red', 'enemyRed.png')
        this.load.image('purple', 'enemyPurple.png')
        this.load.image('laser', 'beamTets.png')
        this.load.image('flame', 'flame.png')

        // Load Audio
        this.load.path = "./assets/audio/";
        this.load.audio('sfx-shot', 'sfx-shot.wav');
        this.load.audio('laser', 'laserShot.mp3');
        this.load.audio('laser2', 'laserShot2.mp3');
        this.load.audio('spawnred', 'spawn.mp3');
        this.load.audio('spawn', 'spawnNormal.mp3');
        this.load.audio('death', 'enemyDie.mp3');
        this.load.audio('core', 'core.mp3');
    }

    create() {
        console.log("scene created")
        let playerStats = {
            HP: this.HP,
        }

        KEY_START = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        KEY_CREDITS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

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

        // adding text
        this.add.text(game.config.width/2, game.config.height/2 - 200,
            'CONTROLS', titleConfig).setOrigin(0.5)

        this.startText = this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (Space) to start', scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 - 128,
            'Change your ship direction by using the left, right, up, and down arrow keys', scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 - 64,
            'Press (Space) to shoot', scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 - 32,
            'Objective: destroy the polygon in the middle', scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 160,
            'Press C to view Credits', scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 - 96,
            'Move your ship by using WASD keys', scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 280,
            'Have fun', scoreConfig).setOrigin(0.5)

        // blinking text
        this.time.addEvent({
            delay: 1000,
            callback: () => {this.startText.visible = !this.startText.visible},
            loop: true
        });
    }

    update() {
        // checking if the player has pressed the start key
        if (Phaser.Input.Keyboard.JustDown(KEY_START)) {
            this.children.removeAll();

            this.add.text(game.config.width/2, game.config.height/2 + 260,
                'HELP ME', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 - 90,
                'HELP ME', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 170,
                'HELP ME', scoreConfig).setOrigin(0.5)
            this.time.delayedCall(1000, () => {
                this.scene.start("playScene");
            })
        }
        
        // checking if the player has pressed the credits key
        if(Phaser.Input.Keyboard.JustDown(KEY_CREDITS)) {
            this.scene.start("credits");
        }
    }
}
