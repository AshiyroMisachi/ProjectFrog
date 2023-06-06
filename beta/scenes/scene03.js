import { Mechan } from "../assets/entity/Mechan.js";
import { SceneTemplate } from "./sceneTemplate.js";
export class Scene03 extends SceneTemplate {
    constructor() {
        super("scene03");
        this.start = false;
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
        this.spawnBoss = false;
        this.end = false;
        this.boss = null;
        this.add.image(0, 0, 'bgGrotte').setOrigin(0, 0).setDepth(-3).setScale(4).setScrollFactor(0.95);
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
        this.scene.run('ui-scene');

        //Dialogue
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.diaPerso01 = ["Enfin dans cette grotte, je sens qu'il est proche", "Mais maintenant je suis plus fort, je n'ai rien a craindre !"]
        this.diaPerso02 = ["Il est au bout de ce tunnel, je ressens son emprise magique...", "L'heure de ma veangeance à sonné !"]

        this.diaMechan01 = ["Comment as tu fait pour me retrouvé ?", "Je vais te reservé le même sort que ta femme !", "Ta langue n'aura aucun effet sur moi tu n'a aucune chance !", "Prépare toi à mourir !"]
        this.diaMechan02 = ["Comment es-ce possible ?", "D'où est tu devenu si puissant ?", "Comment ai-je pu perdre !", "..."]


        if (this.start == false) { this.textBoxPerso(this.diaPerso01); this.start = true }

        this.checkDia01 = this.physics.add.sprite(11704, 1200, "Travel8").setOrigin(0, 0);
        this.checkDia01.body.setAllowGravity(false)

        this.checkDia02 = this.physics.add.sprite(13888, 1500, "Travel8").setOrigin(0, 0);
        this.checkDia02.body.setAllowGravity(false)

        this.physics.add.overlap(this.player, this.checkDia01, () => {
            this.checkDia01.destroy();
            this.textBoxPerso(this.diaPerso02);
        }, null, this);

        this.physics.add.overlap(this.player, this.checkDia02, () => {
            this.checkDia02.destroy();
            this.textBoxMechan(this.diaMechan01);
            this.spawnBoss = true;
        }, null, this);
    }

    update() {
        if (this.textActive == true) {
            this.player.inAction = true;
            this.physics.pause();
            if (this.keyE.isDown) {
                this.textActive = false;
                this.currentDialogue.destroy()
                this.currentText.destroy()
                this.player.inAction = false;
                this.player.setVelocity(0);
                this.physics.resume();
                if (this.spawnBoss == true) {
                    this.boss = new Mechan(this, 14404, 1524);
                    this.boss.getPlayer(this.player)
                    this.physics.add.collider(this.boss, this.wall)
                    this.physics.add.overlap(this.boss, this.playerProj, this.mobGetDamagedByProj, null, this);
                }
                if (this.end) {
                    this.scene.start("gameWin");
                }
            }
        }
        if (this.boss != null) {
            if (this.boss.health <= 0) {
                this.textBoxMechan(this.diaMechan02);
                this.end = true;
            }
        }


    }


}