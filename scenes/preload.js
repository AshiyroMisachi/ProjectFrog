export class Preload extends Phaser.Scene {
    constructor() {
        super("preload");
    }
    
    preload(){
        //Map Tiled
        this.load.image("tileset_Test", "../maps/tileset_test.png");
        this.load.tilemapTiledJSON("sceneTest", "../assets/json/sceneTest.json");

        //SpriteSheet
        this.load.spritesheet('perso', '../assets/spritesheet/persoSS.png',
            { frameWidth: 128, frameHeight: 256 });

        //Image
        this.load.image('logoMainScreen', "../assets/logoMainScreen.png");
        this.load.image('launchGame', "../assets/launchGame.png");

        //DevIMG
        this.load.image('waterCheckIMG', '../assets/waterCheck.png');
    }

    create(){

    }

    update(){
        this.scene.start("mainScreen");
    }
}