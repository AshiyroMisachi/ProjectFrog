import { Player } from "../assets/entity/Player.js";
export class SceneTest extends Phaser.Scene {
    constructor() {
        super("sceneTest");
    }
    
    preload(){

    }

    create(){
        //Load Tiled
        this.carteDuNiveau = this.add.tilemap("sceneTest");
        this.tileset = this.carteDuNiveau.addTilesetImage( "tileset_test", "tileset_Test" );

        this.wall = this.carteDuNiveau.createLayer( "base", this.tileset );
        
        //SetCollision
        this.wall.setCollisionByProperty({isSolid: true});

        //Création Joueur
        this.player = new Player(this, 100, 450).setBounce(0);
        this.player.setCollideWorldBounds(true);

        //Création Caméra
        this.physics.world.setBounds(0, 0, 3200, 3200);
        this.cameras.main.setBounds(0, 0, 3200, 3200);
        this.cameras.main.startFollow(this.player);

        //Création Collision
        this.physics.add.collider(this.player, this.wall);
    }

    update(){
        
    }
}