import { SceneTemplate } from "./sceneTemplate.js";
export class Scene01 extends SceneTemplate {
    constructor() {
        super("scene01");
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

        //DIALOGUE
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.diaPerso01 = ["Je vais finir par retrouvé ce monstre et prendre ma vengeance.",
                           "Je sais qu'il s'est enfui dans le caverne à l'ouest", "mais l'entré est sûrement bloqué",
                           "Je peux essayé de retrouvé les chapeaux enchantés que ma femme à dispercé", "dans les environs afin de vaincre ce mécréant !"]
        this.diaPerso02 = ["J'ai réussi à retrouvé le premier chapeau", "Celui si permet de s'accrocher au plante de mémoire.", "Le second était dans les marécages de l'Est.", "(Appuyer sur O pour changer le chapeau équipée)"]
        this.diaPerso03 = ["Effectivement, la grotte est bloqué par des lianes, avec du feu","je pourrai les détruires et continué mon chemin", "Un des chapeaux de ma femme permettait de tiré des boules de feu..."]

        if (this.start == false) {this.textBoxPerso(this.diaPerso01); this.start = true}

        this.checkDia01 = this.physics.add.sprite(6025, 1170, "Travel8").setOrigin(0, 0);
        this.checkDia01.body.setAllowGravity(false)
        
        this.checkDia02 = this.physics.add.sprite(16701, 5118, "Travel8");
        this.checkDia02.body.setAllowGravity(false)


        this.physics.add.overlap(this.player, this.checkDia01, ()=> {
            this.checkDia01.destroy();
            this.textBoxPerso(this.diaPerso02);
        }, null, this);

        this.physics.add.overlap(this.player, this.checkDia02, ()=> {
            this.checkDia02.destroy();
            this.textBoxPerso(this.diaPerso03);
        }, null, this);
    }

    update() {
        if (this.textActive == true){
            this.player.inAction = true;
            this.physics.pause();
            if (this.keyE.isDown){
                this.textActive = false;
                this.currentDialogue.destroy()
                this.currentText.destroy()
                this.player.inAction = false;
                this.player.setVelocity(0);
                this.physics.resume();
            }
        }
    }


}