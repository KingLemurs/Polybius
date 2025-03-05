// Enemy prefab
class TheEntity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.state = "idle";

        // 1 seconds at start
        this.stateTimer = 60
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
              YELLOW - Square shape that is less stable than greens. Faster and more erratic than greens.
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
            this.newSpeed = Phaser.Math.Between(3, 5) / 10;
            this.emit('attack');
        }
        else {
            this.state = "idle"
            this.aggression += 1;
            // atleast 3 seconds
            this.stateTimer = Phaser.Math.Between(180, 900)
            this.newSpeed = Phaser.Math.Between(.5, 2) / 10;
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
    }

    update(){
        this.angle += this.rotSpeed;
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
    }
}