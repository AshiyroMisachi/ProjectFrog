//Import des scenes
import { Preload } from "./preload.js";
import { MainScreen } from "./mainScreen.js";
import { SceneTest as SceneTest } from "./sceneTest.js";
import { UiScene } from "./ui-scene.js";

///EVENT EMITER///
const eventsCenter = new Phaser.Events.EventEmitter()
export default eventsCenter

//Creation Game
var config = {
    type: Phaser.AUTO,
    width: 1472, height: 1088,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: true
        }
    },
    scene: [Preload, MainScreen, SceneTest, UiScene]
}
new Phaser.Game(config);