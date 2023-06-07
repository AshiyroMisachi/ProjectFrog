//Import des scenes
import { Preload } from "./preload.js";
import { MainScreen } from "./mainScreen.js";
import { SceneTest as SceneTest } from "./sceneTest.js";
import { UiScene } from "./ui-scene.js";
import { Scene01 } from "./scene01.js";
import { Scene02 } from "./scene02.js";
import { Scene03 } from "./scene03.js";
import { GameWin } from "./gameWin.js";
import { GameOver } from "./gameOver.js";

///EVENT EMITER///
export const eventsCenter = new Phaser.Events.EventEmitter()

//Creation Game
var config = {
    type: Phaser.AUTO,
    width: 1472, height: 1088,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false,
            tileBias: 64
        },
    },
    fps: {target: 60, forceSetTimeOut: true},
    //pixelArt: true,
    scene: [Preload, MainScreen, SceneTest, UiScene, Scene01, Scene02, Scene03, GameWin, GameOver]
}

export var game = new Phaser.Game(config);