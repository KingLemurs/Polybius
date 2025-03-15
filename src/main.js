// Polybius
// Names: Nikolas Makranyi, Josh Gioffre
// Date: 3/14/25

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

// story of game - you are a byte packet traveling through the internet trying to reach your destination.
// Starts off with a computer command being typed into a command line "GET /index.html HTTP/1.1/"
// Then the command is entered and your player is fired out onto the screen

// Controls - SPACE/MOUSE1 To fly
//            W, S To adjust speed (faster uses less power)
// Power pickups become less common as time goes on