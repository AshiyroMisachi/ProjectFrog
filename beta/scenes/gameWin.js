export class GameWin extends Phaser.Scene {
    constructor() {
        super({
            key: 'gameWin',
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

       this.add.image(0, 0, "gameWinIMG").setOrigin(0,0)
       this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(){  
        if (this.cursors.space.isDown){
            this.launchGame()
        }

    }

    launchGame() {
        this.scene.start("mainScreen");
    }
}