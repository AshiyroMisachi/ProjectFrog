import { eventsCenter } from "./script.js";
export class GameOver extends Phaser.Scene {
    constructor() {
        super({
            key: 'gameOver',
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

       this.add.image(0, 0, "gameOverIMG").setOrigin(0,0)
       this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(){  
        eventsCenter.emit('hide_UI');
        if (this.cursors.space.isDown){
            this.launchGame()
        }

    }

    launchGame() {
        this.scene.start("mainScreen");
    }
}