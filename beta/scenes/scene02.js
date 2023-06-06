import { SceneTemplate } from "./sceneTemplate.js";
export class Scene02 extends SceneTemplate {
    constructor() {
        super("scene02");
        this.start = false;
    }

    init(data){
        this.player_spawnX = data.player_spawnX;
        this.player_spawnY = data.player_spawnY;
        this.playerHealth = data.playerHealth;
        this.playerInMouth = data.playerInMouth;
        this.playerUnlock = data.playerUnlock;
        this.playerCurrentHat = data.playerCurrentHat
    }
    
    create() {
        this.add.image(0, 0, 'bgMarais').setOrigin(0,0).setDepth(-3).setScale(4).setScrollFactor(0.6);
        this.loadMap("marais", "tileset_placeHolder", "tileset_PlaceHolder");
        this.loadPlayer(this.player_spawnX, this.player_spawnY);
        this.loadObject();
        this.loadEnnemies();
        this.loadPassif();
        this.setCamera(this.player, this.carteDuNiveau.width * 64, this.carteDuNiveau.height * 64);
        this.createCollider();
        //Switch Scene
        this.switchEtang = this.physics.add.sprite(17984, 3520, "Travel5").setOrigin(0,0);
        this.switchEtang.body.setAllowGravity(false);
        this.physics.add.overlap(this.player, this.switchEtang, ()=>{
            this.scene.start("scene01", {
                player_spawnX : 128,
                player_spawnY: 5440,
                playerHealth: this.player.health,
                playerInMouth: this.player.inMouth,
                playerUnlock: this.player.unlock,
                playerCurrentHat: this.player.currentHat
            })
        }, null, this);
        this.scene.run('ui-scene');

        //Dialogue
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.diaPerso01 =  ["Ahh les marécages, cette zone est vraiment dangereuse", "l'endroit idéal pour y cacher un chapeau puissant !"]
        this.diaPerso02 = [" C'est le chapeau rouge ! Je savais qu'on pouvait le trouvé ici", "Il permet de transformer les baies que je recrache en boule de feu", "Parfait pour me débarasser des ennemies ou des plantes me bloquant le chemin"]


        if (this.start == false) {this.textBoxPerso(this.diaPerso01); this.start = true}

        this.checkDia01 = this.physics.add.sprite(3000, 4100, "Travel8").setOrigin(0, 0);
        this.checkDia01.body.setAllowGravity(false)
        
        this.physics.add.overlap(this.player, this.checkDia01, ()=> {
            this.checkDia01.destroy();
            this.textBoxPerso(this.diaPerso02);
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