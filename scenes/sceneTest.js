import { Player } from "../assets/entity/Player.js";
import { Hat } from "../assets/entity/Hat.js";
import { game } from "./script.js";
export class SceneTest extends Phaser.Scene {
    constructor() {
        super("sceneTest");
    }
    
    preload(){

    }

    create(){
        //Load UI
        this.scene.run('ui-scene');
        
        //Load Tiled
        this.carteDuNiveau = this.add.tilemap("sceneTest");
        this.tileset = this.carteDuNiveau.addTilesetImage( "tileset_test", "tileset_Test" );

        this.wall = this.carteDuNiveau.createLayer( "base", this.tileset );
        this.water = this.carteDuNiveau.createLayer( "eau", this.tileset );
        this.calque_waterCheck = this.carteDuNiveau.getObjectLayer('waterCheck');
        this.calque_placeHat = this.carteDuNiveau.getObjectLayer('placeHat');
        
        //SetCollision
        this.wall.setCollisionByProperty({isSolid: true});

        //Création Objet
        this.waterCheck = this.physics.add.group({allowGravity: false});
        this.calque_waterCheck.objects.forEach(calque_waterCheck => {
            const POwaterCheck = this.waterCheck.create(calque_waterCheck.x+672, calque_waterCheck.y+640, "waterCheckIMG");
        });

        this.hat = new Phaser.GameObjects.Group;
        this.calque_placeHat.objects.forEach(spawn => {
            let poHat = null;
            if (spawn.type == "grab") {
                poHat = new Hat(this, spawn.x, spawn.y, "hatGrab");
                poHat.type = "grab";
            }
            else if (spawn.type == "grow"){
                poHat = new Hat(this, spawn.x, spawn.y, "hatGrow");
                poHat.type = "grow";
            }
            else if (spawn.type == "fire"){
                poHat = new Hat(this, spawn.x, spawn.y, "hatFire");
                poHat.type = "fire";
            }
            this.hat.add(poHat);
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
        this.physics.add.overlap(this.player, this.hat, this.collectHat, null, this);
        //this.physics.add.overlap(this.player, this.player.langue, this.player.langue.disapear, null, this);
    }

    update(){
        
    }

    collectHat(player, hat){
        if (hat.type == "grab"){
            player.unlockGrab = true;
        }
        else if (hat.type == "grow"){
            player.unlockGrow = true;
        }
        else if (hat.type == "fire"){
            player.unlockFire = true;
        }
        hat.destroy();
    }
}