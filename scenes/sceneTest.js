import { Player } from "../assets/entity/Player.js";
import { MobAgressif } from "../assets/entity/MobAgressif.js";
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

        //group
        this.playerProj = this.physics.add.group();
        
        //Load Tiled
        this.carteDuNiveau = this.add.tilemap("sceneTest");
        this.tileset = this.carteDuNiveau.addTilesetImage( "tileset_test", "tileset_Test" );

        this.wall = this.carteDuNiveau.createLayer( "base", this.tileset).setDepth(-2);
        this.plateform = this.carteDuNiveau.createLayer("plateforme", this.tileset).setDepth(-2);
        this.water = this.carteDuNiveau.createLayer( "eau", this.tileset).setDepth(-2);
        this.bushPlace = this.carteDuNiveau.createLayer( "buisson", this.tileset).setDepth(-2);

        this.calque_waterCheck = this.carteDuNiveau.getObjectLayer('waterCheck');
        this.calque_placeHat = this.carteDuNiveau.getObjectLayer('placeHat');
        this.calque_placeObstacle = this.carteDuNiveau.getObjectLayer('obstacle');
        this.calque_placeMobAgressif = this.carteDuNiveau.getObjectLayer('mobAgressif');
        
        //SetCollision
        this.wall.setCollisionByProperty({isSolid: true});
        this.plateform.setCollisionByProperty({isSolid: true});

        //Création Joueur
        this.player = new Player(this, 100, 1200).setDepth(1);
        this.player.setCollideWorldBounds(true);

        //Création Objet
            //Eau
        this.waterCheck = this.physics.add.group({allowGravity: false});
        this.calque_waterCheck.objects.forEach(calque_waterCheck => {
            const POwaterCheck = this.waterCheck.create(calque_waterCheck.x+672, calque_waterCheck.y+640, "waterCheckIMG");
        });

            //Chapeau
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

            //Plante et Berry
        this.plantGrab = this.physics.add.staticGroup();
        this.berry = this.physics.add.group({allowGravity : false, pushable: false})
        this.calque_placeObstacle.objects.forEach(spawn => {
            let poObs = null;
            if (spawn.type == "grab"){
                poObs = this.plantGrab.create(spawn.x, spawn.y - 128, "plantGrab");
            }
            else if (spawn.type == "berry"){
                poObs = this.berry.create(spawn.x, spawn.y, "berry").setPushable(false);
            }
        });
        this.berry.children.each(function (berry) {
            berry.getGrab = false;
        });

            //Mob Agressif
        this.mobAgressif = this.physics.add.group({allowGravity: false});
        this.calque_placeMobAgressif.objects.forEach(spawn => {
            let poMobA = null;
            if (spawn.type == "guepe"){
                poMobA = new MobAgressif(this, spawn.x, spawn.y, "mobGuepe");
            }
            poMobA.getPlayer(this.player);
            this.mobAgressif.add(poMobA);
        });
        
        //Création Caméra
        this.physics.world.setBounds(0, 0, 3200, 3200);
        this.cameras.main.setBounds(0, 0, 3200, 3200);
        this.cameras.main.startFollow(this.player);

        //Création Collision
        this.physics.add.collider(this.player, this.wall);
        this.physics.add.collider(this.player, this.plateform);
        this.physics.add.overlap(this.player, this.waterCheck, this.player.enterWater, null, this);
        this.physics.add.overlap(this.player, this.plantGrab, this.player.onPlantGrab, null, this);
        this.physics.add.overlap(this.player, this.berry, this.player.getBerry, this.player.canGetBerry, this);
        this.physics.add.overlap(this.player, this.hat, this.collectHat, null, this);
    }

    update(){
        
    }

    collectHat(player, hat){
        if (hat.type == "grab"){
            player.unlock[0] = true;
        }
        else if (hat.type == "grow"){
            player.unlock[1] = true;
        }
        else if (hat.type == "fire"){
            player.unlock[2] = true;
        }
        hat.destroy();
    }
}