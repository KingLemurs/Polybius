// Player prefab
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      // add object to existing scene
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.isFiring = false;
      this.moveSpeed = 2;
      this.health = 6;
      this.forwardDir = new Phaser.Math.Vector2(0,1);
      this.sfxShot = scene.sound.add('laser');
      this.sfxShot.volume = .9;
      this.lasers = scene.add.group();
      this.lasers.runChildUpdate = true;
      this.setCollideWorldBounds(true);
      this.body.setSize(30, 50);
      this.body.setOffset(15, 10);

      this.score = 0;
      this.scoreText = scene.add.text(1, 1, 'Score: 0', {
          fontFamily: 'PolybiusFont',
          fontSize: '32px',
          color: '#fff'
      });
      this.scoreText.setOrigin(0, 0);
    }

    update(){
        if(KEY_LEFT.isDown){
            this.angle = 0;
            this.forwardDir = new Phaser.Math.Vector2(-1, 0);
        }
        else if(KEY_RIGHT.isDown){
            this.angle = 180;
            this.forwardDir = new Phaser.Math.Vector2(1, 0);
        }
        if(KEY_UP.isDown){
            this.angle = 90;
            this.forwardDir = new Phaser.Math.Vector2(0, -1);
        }
        else if(KEY_DOWN.isDown){
            this.angle = 270;
            this.forwardDir = new Phaser.Math.Vector2(0, 1);
        }
        else if(KEY_MOVELEFT.isDown){
            this.x -= this.moveSpeed;
        }
        else if(KEY_MOVERIGHT.isDown){
            this.x += this.moveSpeed;
        }
        else if(KEY_MOVEUP.isDown){
            this.y -= this.moveSpeed;
        }
        else if(KEY_MOVEDOWN.isDown){
            this.y += this.moveSpeed;
        }
        // fire button
        if (Phaser.Input.Keyboard.JustDown(KEY_FIRE) && !this.isFiring) {
            this.isFiring = true
            let laser = new Laser(this.scene, this.x, this.y, 'laser');
            laser.angle = this.angle;
            laser.body.setVelocity(this.forwardDir.x * 250, this.forwardDir.y * 250);
            this.lasers.add(laser);
            this.sfxShot.play()

            this.cooldown = this.scene.time.addEvent({
                delay: 400,
                loop: false,
                callback: () => {
                    this.isFiring = false;
                }
            })
        }
    }
}