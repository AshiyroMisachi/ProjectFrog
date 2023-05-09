export class Preload extends Phaser.Scene {
    constructor() {
        super("preload");
    }
    
    preload(){
        //Map Tiled

        //SpriteSheet

        //Image
        this.load.image('logoMainScreen', "../assets/logoMainScreen.png");
    }

    create(){

    }

    update(){
        this.scene.start("mainScreen");
    }
}