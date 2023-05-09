export class MainScreen extends Phaser.Scene {
    constructor() {
        super({
            key: 'first',
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
        console.log("Test")
        this.logo = this.add.image(0, 0, "logoMainScreen").setInteractive();
    }

    update(){

    }
}