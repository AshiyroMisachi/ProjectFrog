import { SceneTemplate } from "./sceneTemplate.js";
export class Scene03 extends SceneTemplate {
    constructor() {
        super("scene03");
    }

    init(data) {
        this.player_spawnX = data.player_spawnX;
        this.player_spawnY = data.player_spawnY;
        this.playerHealth = data.playerHealth;
        this.playerInMouth = data.playerInMouth;
        this.playerUnlock = data.playerUnlock;
        this.playerCurrentHat = data.playerCurrentHat
    }

    create() {
        this.add.image(0, 0, 'bgGrotte').setOrigin(0,0).setDepth(-3).setScale(4).setScrollFactor(0.95);
        this.loadMap("grotte", "tileset_placeHolder", "tileset_PlaceHolder");
        this.loadPlayer(this.player_spawnX, this.player_spawnY);
        this.loadObject();
        this.loadEnnemies();
        this.loadPassif();
        this.setCamera(this.player, this.carteDuNiveau.width * 64, this.carteDuNiveau.height * 64);
        this.createCollider();
        //Switch Scene
        this.switchEtang = this.physics.add.sprite(0, 896, "Travel8").setOrigin(0, 0);
        this.switchEtang.body.setAllowGravity(false);
        this.physics.add.overlap(this.player, this.switchEtang, () => {
            this.scene.start("scene01", {
                player_spawnX: 19072,
                player_spawnY: 5632,
                playerHealth: this.player.health,
                playerInMouth: this.player.inMouth,
                playerUnlock: this.player.unlock,
                playerCurrentHat: this.player.currentHat
            });
        }, null, this);
    }

    update() {
    }


}