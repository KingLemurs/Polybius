// Polybius
// Names: Nikolas Makranyi, Josh Gioffre
// Date: 3/18/25
// Citations: Polybius1981 Font by Grigoriy Sviridov, found on https://www.dafont.com/polybius1981.font; all other assets by us

// Major Components used: Physics systems, text objects, tween manager, timers, cameras, particle effects
// Polish and Style: In our game, we designed all of the enemy and player assets, which were inspired by a recreation of the supposed original game. We also got the core to spin, and included various particle effects, to make the experience more engaging. Each of the enemy types has different behaviors, which adds variety to the gameplay.

"use strict"

let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 800,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scene: [Title, MainMenu, Credits, Play, Ending]
}

let game = new Phaser.Game(config)

let PLAYER_MOVESPEED = 10;

let KEY_LEFT, KEY_RIGHT, KEY_UP, KEY_DOWN, KEY_RESET, KEY_MENU, KEY_START, KEY_FIRE, KEY_CREDITS, KEY_MOVELEFT, KEY_MOVERIGHT, KEY_MOVEUP, KEY_MOVEDOWN;