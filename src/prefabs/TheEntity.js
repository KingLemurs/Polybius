// Enemy prefab
class TheEntity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.state = "idle";

        // enemy groups
        this.enemies = scene.add.group();
        this.greens = new Array(10).fill(null); // max 10
        this.oranges = new Array(10).fill(null); // max 10
        this.purples = new Array(5).fill(null); // max 5
        this.reds = new Array(5).fill(null); // max 5

        this.spawnRedSound = scene.sound.add('spawnred');
        this.spawnRedSound.volume = .4;
        this.spawnSound = scene.sound.add('spawn');
        this.spawnSound.volume = .3;

        // 1 seconds at start
        this.stateTimer = 60
        this.spawnTimer = 30;
        this.redTimer = 120;
        this.direction = -1
        // every time state rolls idle
        this.aggression = 0
        this.rotSpeed = .1;
        this.newSpeed = 0;
        this.tweenTime = 0;
        this.health = 100;

        /*
         CORE has 2 states it can be in:
         1. Idle - Moves slowly in one direction, mirror core can turn in every direction. Shapes are less aggressive.
                   Can switch directions at any time.
         2. Attack - Picks a random direction, Speeds up, mirror core must turn in the same direction. While in attack
                     mode other shapes are more aggressive and move more erratically.
                     Generates new shapes more frequently, including red ones.

         Core will choose to stay or leave current state in set intervals

         SHAPES:
              GREEN - Circle shape that is the most stable. Follows direction of core steadily and only attacks outwards
              ORANGE - Square shape that is less stable than greens. Faster and more erratic than greens.
              PURPLE - Special square shape that stays close to the core, and sometimes randomly shoots outwards
              RED - Most evil shape. Super unstable, will not follow the direction of core and can change speed rapidly
              WHITE - Large diamond shapes that spawn far out from the core, with the intent of hitting the player.
                      Sometimes have numbers attached to them.
         */
    }

    stateTransition() {
        let choice = Phaser.Math.Between(0, 3) - this.aggression;
        this.tweenTime = 0;
        if (choice <= 0) {
            this.state = "attack";
            this.aggression = 0;
            // atleast 5 seconds
            this.stateTimer = Phaser.Math.Between(300, 900)
            this.newSpeed = Phaser.Math.Between(40, 60) / 100;
            this.emit('attack', this);
        }
        else {
            this.state = "idle"
            this.aggression += 1;
            // atleast 3 seconds
            this.stateTimer = Phaser.Math.Between(180, 900)
            this.newSpeed = Phaser.Math.Between(10, 20) / 100;
        }
        let newDir = Phaser.Math.Between(0, 1);
        if (newDir === 0) {
            // flip dir
            this.newSpeed *= -1;
        }
        if (this.newSpeed <= 0) {
            this.direction = 1;
        }
        else {
            this.direction = -1;
        }

        // change number (visual)
        let display = Phaser.Math.Between(0,30);
        let img = 'coresix';
        if (display === 0) {
            img = 'coreeight'
        }
        else if (display === 1 ) {
            img = 'coreone'
        }
        this.setTexture(img);
    }

    spawnRed() {
        let nextEmpty = -1;
        for (let i = 0; i < this.reds.length; i++) {
            if (this.reds[i] == null) {
                nextEmpty = i;
                break;
            }
        }

        // if all enemies are alive
        if (nextEmpty < 0) {
            return;
        }

        this.spawnRedSound.play();
        this.redTimer = 120;
        this.reds[nextEmpty] = new Red(this.scene, this.x, this.y, 'red', 0, this, nextEmpty);
        this.reds[nextEmpty].on('destroy', () => {
            this.reds[nextEmpty] = null;
        })
        this.enemies.add(this.reds[nextEmpty]);
        this.on('attack', this.reds[nextEmpty].onCoreAttack);
    }


    spawnOrange() {
        let nextEmpty = -1;
        for (let i = 0; i < this.oranges.length; i++) {
            if (this.oranges[i] == null) {
                nextEmpty = i;
                break;
            }
        }

        // if all enemies are alive
        if (nextEmpty < 0) {
            return;
        }

        // this.spawnSound.play();
        this.oranges[nextEmpty] = new Orange(this.scene, this.x, this.y, 'orange', 0, this, nextEmpty);
        this.oranges[nextEmpty].on('destroy', () => {
            this.oranges[nextEmpty] = null;
        })
        this.enemies.add(this.oranges[nextEmpty]);
        this.on('attack', this.oranges[nextEmpty].onCoreAttack);
    }

    spawnGreen() {
        let nextEmpty = -1;
        for (let i = 0; i < this.greens.length; i++) {
            if (this.greens[i] == null) {
                nextEmpty = i;
                break;
            }
        }
        this.spawnTimer = 30;

        // if all enemies are alive
        if (nextEmpty < 0) {
            return;
        }

        this.greens[nextEmpty] = new Green(this.scene, this.x, this.y, 'green', 0, this, nextEmpty);
        this.greens[nextEmpty].on('destroy', () => {
            this.greens[nextEmpty] = null;
        })
        this.enemies.add(this.greens[nextEmpty]);
        this.on('attack', this.greens[nextEmpty].onCoreAttack);
    }

    update(){
        this.angle += this.rotSpeed;
        this.body.setVelocity(0,0);
        if (this.state === "idle") {


        } else {

        }
        this.stateTimer -= 1;
        if (this.stateTimer <= 0) {
            this.stateTransition();
        }
        if (this.tweenTime <= 180) {
            this.rotSpeed = Phaser.Math.Interpolation.SmoothStep(this.tweenTime / 180, this.rotSpeed, this.newSpeed);
            this.tweenTime++
        }

        this.spawnTimer -= 1;
        this.redTimer -= 1;
        if (this.spawnTimer <= 0) {
            this.spawnGreen();
            this.spawnOrange();
        }
        if (this.redTimer <= 0) {
            this.spawnRed();
        }

        for (let i = 0; i < this.greens.length; i++) {
            if (this.greens[i]) {
                this.greens[i].update();
            }
        }
        for (let i = 0; i < this.oranges.length; i++) {
            if (this.oranges[i]) {
                this.oranges[i].update();
            }
        }
        for (let i = 0; i < this.reds.length; i++) {
            if (this.reds[i]) {
                this.reds[i].update();
            }
        }
    }
}