export class Preload extends Phaser.Scene {
    constructor() {
        super("preload");
    }
    
    preload(){

    }

    create(){
        this.scene.start("sceneTest");
    }

    update(){

    }
}