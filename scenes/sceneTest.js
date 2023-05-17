import { Player } from "../assets/entity/Player.js";
import { MobAgressif } from "../assets/entity/MobAgressif.js";
import { MobSentry } from "../assets/entity/MobSentry.js";
import { Hat } from "../assets/entity/Hat.js";
import { Moustique } from "../assets/entity/Moustique.js"
import { game } from "./script.js";
export class SceneTest extends Phaser.Scene {
    constructor() {
        super("sceneTest");
    }

    preload() {

    }

    create() {
        //Load UI
        this.scene.run('ui-scene');

        //group
        this.playerProj = this.physics.add.group();

        //Load Tiled
        this.carteDuNiveau = this.add.tilemap("sceneTest");
        this.tileset = this.carteDuNiveau.addTilesetImage("tileset_test", "tileset_Test");

        this.wall = this.carteDuNiveau.createLayer("base", this.tileset).setDepth(-2);
        this.plateform = this.carteDuNiveau.createLayer("plateforme", this.tileset).setDepth(-2);
        this.water = this.carteDuNiveau.createLayer("eau", this.tileset).setDepth(-2);
        this.bushPlace = this.carteDuNiveau.createLayer("buisson", this.tileset).setDepth(-2);

        this.calque_waterCheck = this.carteDuNiveau.getObjectLayer('waterCheck');
        this.calque_placeHat = this.carteDuNiveau.getObjectLayer('placeHat');
        this.calque_placeObstacle = this.carteDuNiveau.getObjectLayer('obstacle');
        this.calque_placeMobAgressif = this.carteDuNiveau.getObjectLayer('mobAgressif');
        this.calque_placeMoustique = this.carteDuNiveau.getObjectLayer('moustique');

        //SetCollision
        this.wall.setCollisionByProperty({ isSolid: true });
        this.plateform.setCollisionByProperty({ isSolid: true });

        //Création Joueur
        this.player = new Player(this, 100, 1200).setDepth(1);

        //Création Objet
        //Eau
        this.waterCheck = this.physics.add.group({ allowGravity: false });
        this.calque_waterCheck.objects.forEach(calque_waterCheck => {
            const POwaterCheck = this.waterCheck.create(calque_waterCheck.x + 672, calque_waterCheck.y + 640, "waterCheckIMG");
        });

        //Chapeau
        this.hat = new Phaser.GameObjects.Group;
        this.calque_placeHat.objects.forEach(spawn => {
            let poHat = null;
            if (spawn.type == "grab") {
                poHat = new Hat(this, spawn.x, spawn.y, "hatGrab");
                poHat.type = "grab";
            }
            else if (spawn.type == "grow") {
                poHat = new Hat(this, spawn.x, spawn.y, "hatGrow");
                poHat.type = "grow";
            }
            else if (spawn.type == "fire") {
                poHat = new Hat(this, spawn.x, spawn.y, "hatFire");
                poHat.type = "fire";
            }
            this.hat.add(poHat);
        });

        //Plante et Berry
        this.plantGrab = this.physics.add.staticGroup();
        this.breakFire = this.physics.add.staticGroup();
        this.berry = this.physics.add.group({ allowGravity: false, pushable: false })
        this.calque_placeObstacle.objects.forEach(spawn => {
            let poObs = null;
            if (spawn.type == "grab") {
                poObs = this.plantGrab.create(spawn.x, spawn.y - 128, "plantGrab");
            }
            else if (spawn.type == "breakFire"){
                poObs = this.breakFire.create(spawn.x, spawn.y - 32, "breakFire");
            }
            else if (spawn.type == "berry") {
                poObs = this.berry.create(spawn.x, spawn.y, "berry").setPushable(false);
            }
        });
        this.berry.children.each(function (berry) {
            berry.getGrab = false;
        });

        //Mob Agressif
        this.mobAgressif = this.physics.add.group({ allowGravity: false });
        this.calque_placeMobAgressif.objects.forEach(spawn => {
            let poMobA = null;
            if (spawn.type == "guepe") {
                poMobA = new MobAgressif(this, spawn.x, spawn.y, "mobGuepe");
                console.log(poMobA)
            }
            else if (spawn.type == "spider") {
                poMobA = new MobSentry(this, spawn.x, spawn.y + 32, "mobSpider").setPushable(false);
            }
            poMobA.getPlayer(this.player);
            this.mobAgressif.add(poMobA);
        });

        //Moustique
        this.moustique = this.physics.add.group({ allowGravity: false });
        this.calque_placeMoustique.objects.forEach(spawn => {
            let poMous = null;
            if (spawn.type == "moustiqueA"){
                poMous = new Moustique(this, spawn.x, spawn.y, "moustique");
            }
            this.moustique.add(poMous);
        });

        //Création Caméra
        this.physics.world.setBounds(0, 0, 3200, 3200);
        this.cameras.main.setBounds(0, 0, 3200, 3200);
        this.cameras.main.startFollow(this.player);

        //Création Collision
        this.physics.add.collider(this.player, this.wall);
        this.physics.add.collider(this.player, this.plateform);
        this.physics.add.collider(this.player, this.breakFire);
        this.physics.add.overlap(this.player, this.waterCheck, this.player.enterWater, null, this);
        this.physics.add.overlap(this.player, this.plantGrab, this.player.onPlantGrab, null, this);
        this.physics.add.overlap(this.player, this.berry, this.player.getBerry, this.player.canGetBerry, this);
        this.physics.add.overlap(this.player, this.moustique, this.player.eatMoustique, this.player.canEatMoustique, this);
        this.physics.add.overlap(this.player, this.hat, this.collectHat, null, this);

        this.physics.add.collider(this.player, this.mobAgressif, this.player.getDamagedByAgro, this.player.canBeHit, this);

        this.physics.add.collider(this.mobAgressif, this.wall);
        this.physics.add.overlap(this.mobAgressif, this.playerProj, this.damageMob, null, this);
    }

    update() {

    }

    //Collect Chapeau
    collectHat(player, hat) {
        if (hat.type == "grab") {
            player.unlock[0] = true;
        }
        else if (hat.type == "grow") {
            player.unlock[1] = true;
        }
        else if (hat.type == "fire") {
            player.unlock[2] = true;
        }
        hat.destroy();
    }

    //Damage Ennemy
    damageMob(mob, proj) {
        console.log(proj.damage)
        console.log("test")
        mob.health -= proj.damage;
        console.log(mob.health)
        mob.getHit = true;
        mob.setTint(0xff0000)
        if (mob.health <= 0) {
            mob.destroy();
            this.events.off(Phaser.Scenes.Events.UPDATE, mob.update, mob);
        }

        if (mob.typeE == "mobAgro"){
            if (proj.body.touching.right) {
                mob.body.setVelocity(200, -60);
            }
            else if (proj.body.touching.left) {
                mob.body.setVelocity(-200, -60);
            }
            else if (proj.body.touching.up) {
                mob.body.setVelocity(-60, -200);
            }
            else if (proj.body.touching.down) {
                mob.body.setVelocity(60, 200);
            }
        }

        proj.destroy()
        this.time.delayedCall(200, (mob) => { mob.getHit = false; mob.setTint() }, [mob], this);
    }
}