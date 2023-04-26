//Import des scenes
import { Preload } from "./preload.js";
import { MainScreen } from "./mainScreen.js";
import { SceneTest as SceneTest } from "./sceneTest.js";
import { UiScene as UiScene } from "./ui-scene";

///EVENT EMITER///
const eventsCenter = new Phaser.Events.EventEmitter()
export default eventsCenter

//Creation Game
var config = {
    type: Phaser.AUTO,
    width: 800, height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [Preload, MainScreen, SceneTest, UiScene]
}
new Phaser.Game(config);