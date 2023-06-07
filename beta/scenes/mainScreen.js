export class MainScreen extends Phaser.Scene {
    constructor() {
        super({
            key: 'mainScreen',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 }
                }
            }
        });
    }

    preload() {

    }

    create() {
        /*
        //Add Image
        this.logo = this.add.image(400, 150, "logoMainScreen").setInteractive().setScale(0.75).setOrigin( 0, 0);
        this.launchButton = this.add.image(350, 700, "launchGame").setInteractive().setScale(1.25).setOrigin( 0, 0);

        //Create Interaction
        this.launchButton.on("pointerdown", this.launchGame, this);
        */
        this.add.image(0, 0, "mainScreenIMG").setOrigin(0, 0)
        this.cursors = this.input.keyboard.createCursorKeys();

        this.keyV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
        this.keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        this.keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
    }

    update() {
        if (this.cursors.space.isDown) {
            this.launchGame()
        }
        else if (this.keyV.isDown){
            this.launchMarais()
        }
        else if (this.keyB.isDown){
            this.launchGrotte()
        }
        else if (this.keyN.isDown){
            this.launchBoss()
        }

    }

    //Lancement Basiquement
    launchGame() {
        this.scene.start("scene01", {
            player_spawnX : 4112,
            player_spawnY : 5320,
            playerHealth: 5,
            playerInMouth: "",
            playerUnlock: [false, false, false],
            playerCurrentHat: 0
        });
    }

    //Fin Marais
    launchMarais() {
        this.scene.start("scene02", {
            player_spawnX: 3703,
            player_spawnY: 4260,
            playerHealth: 5,
            playerInMouth: "",
            playerUnlock: [true, false, false],
            playerCurrentHat: 0
        });
    }

    //Début Grotte
    launchGrotte() {
        this.scene.start("scene03", {
            player_spawnX: 196,
            player_spawnY: 1280,
            playerHealth: 5,
            playerInMouth: "",
            playerUnlock: [true, false, true],
            playerCurrentHat: 0
        });
    }

    //Boss Room
    launchBoss() {
        this.scene.start("scene03", {
            player_spawnX: 11304,
            player_spawnY: 1552,
            playerHealth: 5,
            playerInMouth: "",
            playerUnlock: [true, false, true],
            playerCurrentHat: 0
        });
    }
}