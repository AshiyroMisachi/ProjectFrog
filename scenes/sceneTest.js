import { SceneTemplate } from "./sceneTemplate.js";
export class SceneTest extends SceneTemplate {
    constructor() {
        super("sceneTest");
    }

    init(data){
        this.player_spawnX = 100;
        this.player_spawnY = 1200;
    }
    
    create() {
        this.scene.run('ui-scene');
        this.loadMap("sceneTest", "tileset_test", "tileset_Test");
        this.loadPlayer(this.player_spawnX, this.player_spawnY);
        this.loadObject();
        this.loadEnnemies();
        this.loadPassif();
        this.setCamera(this.player, this.carteDuNiveau.width * 64, this.carteDuNiveau.height * 64);
        this.createCollider();
    }

    update() {
    }

    
}