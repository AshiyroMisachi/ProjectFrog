import { SceneTemplate } from "./sceneTemplate.js";
export class Scene01 extends SceneTemplate {
    constructor() {
        super("scene01");
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
        this.add.image(0, 0, 'bgEtang').setOrigin(0,0).setDepth(-3).setScale(4).setScrollFactor(0.95);
        this.loadMap("etang", "tileset_placeHolder", "tileset_PlaceHolder");
        this.loadPlayer(this.player_spawnX, this.player_spawnY);
        this.loadObject();
        this.loadEnnemies();
        this.loadPassif();
        this.setCamera(this.player, this.carteDuNiveau.width * 64, this.carteDuNiveau.height * 64);
        this.createCollider();
        //Switch Scene
        this.switchMarais = this.physics.add.sprite(0, 5312, "Travel5").setOrigin(0, 0);
        this.switchMarais.body.setAllowGravity(false);
        this.physics.add.overlap(this.player, this.switchMarais, () => {
            this.scene.start("scene02", {
                player_spawnX: 17792,
                player_spawnY: 3648,
                playerHealth: this.player.health,
                playerInMouth: this.player.inMouth,
                playerUnlock: this.player.unlock,
                playerCurrentHat: this.player.currentHat
            });
        }, null, this);


        this.switchGrotte = this.physics.add.sprite(19136, 5248, "Travel8").setOrigin(0, 0);
        this.switchGrotte.body.setAllowGravity(false);
        this.physics.add.overlap(this.player, this.switchGrotte, () => {
            this.scene.start("scene03", {
                player_spawnX: 192,
                player_spawnY: 1277,
                playerHealth: this.player.health,
                playerInMouth: this.player.inMouth,
                playerUnlock: this.player.unlock,
                playerCurrentHat: this.player.currentHat
            });
        }, null, this);
        this.scene.run('ui-scene');
    }

    update() {
    }


}