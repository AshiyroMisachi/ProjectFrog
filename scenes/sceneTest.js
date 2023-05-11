import { Player } from "../assets/entity/Player.js";
import { game } from "./script.js";
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
        this.water = this.carteDuNiveau.createLayer( "eau", this.tileset );
        this.calque_waterCheck = this.carteDuNiveau.getObjectLayer('waterCheck');
        
        //SetCollision
        this.wall.setCollisionByProperty({isSolid: true});

        //Création Objet
        this.waterCheck = this.physics.add.staticGroup();
        this.calque_waterCheck.objects.forEach(calque_waterCheck => {
            const POwaterCheck = this.waterCheck.create(calque_waterCheck.x + 32, calque_waterCheck.y + 32, "waterCheckIMG");
        });

        //Création Joueur
        this.player = new Player(this, 100, 1200);
        this.player.setCollideWorldBounds(true);

        //Création Caméra
        this.physics.world.setBounds(0, 0, 3200, 3200);
        this.cameras.main.setBounds(0, 0, 3200, 3200);
        this.cameras.main.startFollow(this.player);

        //Création Collision
        this.physics.add.collider(this.player, this.wall);
        this.physics.add.overlap(this.player, this.waterCheck, this.player.enterWater, null, this);
        
    }

    update(){
        console.log(game.loop.actualFps);
    }
}