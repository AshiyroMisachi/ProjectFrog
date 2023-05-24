export class MainScreen extends Phaser.Scene {
    constructor() {
        super({
            key: 'mainScreen',
            physics: {
            default: 'arcade',
            arcade: { 
            gravity: { y: 0 }
            }}
        });
    }
    
    preload(){

    }

    create(){
        //Add Image
        this.logo = this.add.image(400, 150, "logoMainScreen").setInteractive().setScale(0.75).setOrigin( 0, 0);
        this.launchButton = this.add.image(350, 700, "launchGame").setInteractive().setScale(1.25).setOrigin( 0, 0);

        //Create Interaction
        this.launchButton.on("pointerdown", this.launchGame, this);
    }

    update(){

    }

    launchGame() {
        this.scene.start("scene01",{
            player_spawnX : 4112,
            player_spawnY : 5320,
            playerHealth : 5,
            playerInMouth: "",
            playerUnlock: [false, false, false],
            playerCurrentHat: 0
        });
    }
}