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
        this.load.spritesheet('tongEnd', '../assets/spritesheet/tong.png',
            { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('hatGrab', '../assets/spritesheet/hatGrab.png',
            { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('hatGrow', '../assets/spritesheet/hatGrow.png',
            { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('hatFire', '../assets/spritesheet/hatFire.png',
            { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('cadreHat', '../assets/spritesheet/cadrehat.png',
            { frameWidth: 49, frameHeight:48 });

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