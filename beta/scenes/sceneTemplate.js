import { Player } from "../assets/entity/Player.js";
import { MobAgressif } from "../assets/entity/MobAgressif.js";
import { MobSentry } from "../assets/entity/MobSentry.js";
import { MobObstacle } from "../assets/entity/MobObstacle.js";
import { Hat } from "../assets/entity/Hat.js";
import { Moustique } from "../assets/entity/Moustique.js"
import { game } from "./script.js";
import { Escargot } from "../assets/entity/Escargot.js";
export class SceneTemplate extends Phaser.Scene {
    constructor(name) {
        super(name)
    }

    //Load Tiled
    loadMap(jsonTiled, png, tsx) {
        //Atribution map
        this.carteDuNiveau = this.add.tilemap(jsonTiled);
        this.tileset = this.carteDuNiveau.addTilesetImage(png, tsx);

        //Chargement Calques Tuiles
        this.background = this.carteDuNiveau.createLayer("fond", this.tileset).setDepth(-2);
        this.water = this.carteDuNiveau.createLayer("eau", this.tileset).setDepth(2);
        this.wall = this.carteDuNiveau.createLayer("base", this.tileset).setDepth(-2);
        

        //Récupération Calques Objets
        this.calque_waterPoisonousCheck = this.carteDuNiveau.getObjectLayer('waterPoisonousCheck');
        this.calque_waterCheck = this.carteDuNiveau.getObjectLayer('waterCheck');
        this.calque_placeHat = this.carteDuNiveau.getObjectLayer('placeHat');
        this.calque_placeObstacle = this.carteDuNiveau.getObjectLayer('obstacle');
        this.calque_placeMobAgressif = this.carteDuNiveau.getObjectLayer('mobAgressif');
        this.calque_placeMobPassif = this.carteDuNiveau.getObjectLayer('mobPassif');

        //Calques Solides
        this.wall.setCollisionByProperty({ isSolid: true });
    }

    //Création Joueur
    loadPlayer(spawnX, spawnY) {
        //Création Joueur
        this.player = new Player(this, spawnX, spawnY).setDepth(1);
        this.player.health =  this.playerHealth;
        this.player.inMouth = this.playerInMouth;
        this.player.unlock = this.playerUnlock;
        this.player.currentHat = this.playerCurrentHat;

        //Création Groupe  Proj Joueur
        this.playerProj = this.physics.add.group();
    }

    //Création Objet
    loadObject() {
        //Placement Check Eau
        this.waterCheck = this.physics.add.group({ allowGravity: false });
        this.waterPoisonousCheck = this.physics.add.group({ allowGravity: false });
        this.calque_waterCheck.objects.forEach(calque_waterCheck => {
            if (calque_waterCheck.type == "little"){
                const POwaterCheck = this.waterCheck.create(calque_waterCheck.x + 352, calque_waterCheck.y + 160, "waterCheckLittleIMG");
            }
            else {
               const POwaterCheck = this.waterCheck.create(calque_waterCheck.x + 672, calque_waterCheck.y + 640, "waterCheckIMG"); 
            }
            
        });

        this.calque_waterPoisonousCheck.objects.forEach(calque_waterPoisonousCheck => {
            if (calque_waterPoisonousCheck.type == "little"){
                const POwaterCheck = this.waterPoisonousCheck.create(calque_waterPoisonousCheck.x + 352, calque_waterPoisonousCheck.y + 160, "waterCheckLittleIMG");
            }
            else {
                const POwaterCheck = this.waterPoisonousCheck.create(calque_waterPoisonousCheck.x + 672, calque_waterPoisonousCheck.y + 640, "waterCheckIMG"); 
            }
        });

        //Placement Chapeau power_up
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

        //Plante à grimper et Berry
        this.plantGrab = this.physics.add.staticGroup();
        this.breakFire = this.physics.add.staticGroup();
        this.ronces = this.physics.add.staticGroup();
        this.berry = this.physics.add.group({ allowGravity: false, pushable: false })
        this.calque_placeObstacle.objects.forEach(spawn => {
            let poObs = null;
            if (spawn.type == "grab") {
                poObs = this.plantGrab.create(spawn.x + 32, spawn.y - 128, "plantGrab");
            }
            else if (spawn.type == "breakFire") {
                poObs = this.breakFire.create(spawn.x, spawn.y - 32, "breakFire");
            }
            else if (spawn.type == "breakFire12") {
                poObs = this.breakFire.create(spawn.x + 32, spawn.y - 320, "breakFire12");
            }
            else if (spawn.type == "breakFire10") {
                poObs = this.breakFire.create(spawn.x + 32, spawn.y - 256, "breakFire10");
            }
            else if (spawn.type == "breakFire5") {
                poObs = this.breakFire.create(spawn.x + 32, spawn.y - 96, "breakFire5");
            }
            else if (spawn.type == "berry") {
                poObs = this.berry.create(spawn.x, spawn.y, "berry").setPushable(false);
            }
            else if (spawn.type == "ronces") {
                poObs = this.ronces.create(spawn.x + 32, spawn.y + 32, "ronces");
            }
        });
        this.berry.children.each(function (berry) {
            berry.getGrab = false;
        });
    }

    //Création Mob Ennemies
    loadEnnemies() {
        //Création groupe Ennemies
        this.mobAgressif = this.physics.add.group({ allowGravity: false });
        this.mob_proj = this.physics.add.group({ allowGravity: false });

        //Spawn Mob
        this.calque_placeMobAgressif.objects.forEach(spawn => {
            let poMobA = null;
            //MobAgro
            if (spawn.type == "guepe") {
                poMobA = new MobAgressif(this, spawn.x, spawn.y, "mobGuepe");
            }
            //Mob Sentry
            else if (spawn.type == "spider") {
                poMobA = new MobSentry(this, spawn.x, spawn.y + 32, "mobSpider").setPushable(false);
            }
            //Mob Obstacle
            else if (spawn.type == "sangsue") {
                poMobA = new MobObstacle(this, spawn.x, spawn.y + 32, "mobSangsue").setPushable(false);
            }
            poMobA.getPlayer(this.player);
            this.mobAgressif.add(poMobA);
        });
    }

    //Création Mob Passif
    loadPassif() {
        //Création Groupe Mob Passif
        this.moustique = this.physics.add.group({ allowGravity: false });
        this.libellule = this.physics.add.group({ allowGravity: false });

        //Spawn mob
        this.calque_placeMobPassif.objects.forEach(spawn => {
            let poMous = null;
            //Moustique, Heal
            if (spawn.type == "moustiqueA") {
                poMous = new Moustique(this, spawn.x, spawn.y, "moustique");
                this.moustique.add(poMous);
            }
            //Escargot, Bullet
            else if (spawn.type == "libelluleR") {
                poMous = new Escargot(this, spawn.x, spawn.y).setPushable(false);
                poMous.getDirection("right");
                this.libellule.add(poMous);
            }
            else if (spawn.type == "libelluleL") {
                poMous = new Escargot(this, spawn.x, spawn.y).setPushable(false);
                poMous.getDirection("left");
                this.libellule.add(poMous);
            }
        });
    }

    //Création Collision
    createCollider() {
        //PLAYER
        //Bordure
        this.physics.add.collider(this.player, this.wall);
        this.physics.add.collider(this.player, this.breakFire);
        this.physics.add.collider(this.player, this.libellule);
        //Etat 
        this.physics.add.overlap(this.player, this.waterCheck, () => { this.player.inWater = true }, null, this);
        this.physics.add.overlap(this.player, this.waterPoisonousCheck, () => { this.player.inWater = true; this.player.playerLoseHp(1, null) }, this.player.canBeHit, this);
        this.physics.add.overlap(this.player, this.waterPoisonousCheck, () => { this.player.inWater = true; }, null, this);
        this.physics.add.overlap(this.player, this.plantGrab, () => { this.player.onPlant = true }, null, this);
        //Collect
        this.physics.add.overlap(this.player, this.berry, this.player.getBerry, this.player.canGetBerry, this);
        this.physics.add.overlap(this.player, this.moustique, this.player.eatMoustique, this.player.canEatMoustique, this);
        this.physics.add.overlap(this.player, this.hat, this.playerCollectHat, null, this);
        //Damage
        this.physics.add.overlap(this.player, this.mobAgressif, this.playerGetDamagedByEnnemy, this.player.canBeHit, this);
        this.physics.add.overlap(this.player, this.mob_proj, this.playerGetDamagedByProj, this.player.canBeHit, this);
        this.physics.add.overlap(this.player, this.ronces, () => { this.player.playerLoseHp(1, null) }, this.player.canBeHit, this);

        //PROJ
        this.physics.add.collider(this.playerProj, this.wall, (proj) => { proj.getDestroy() }, null, this);
        this.physics.add.collider(this.mob_proj, this.wall, (proj) => { proj.getDestroy() }, null, this);

        //MOB
        //Bordure
        this.physics.add.collider(this.mobAgressif, this.wall);
        this.physics.add.collider(this.libellule, this.wall);
        this.physics.add.collider(this.moustique, this.wall);
        //Etat
        this.physics.add.overlap(this.mobAgressif, this.waterCheck, (mob) => { mob.inWater = true }, null, this);
        this.physics.add.overlap(this.mobAgressif, this.waterPoisonousCheck, (mob) => { mob.inWater = true }, null, this);
        //Damage
        this.physics.add.overlap(this.mobAgressif, this.playerProj, this.mobGetDamagedByProj, null, this);
    }

    //Setup Camera
    setCamera(target, width, height) {
        this.physics.world.setBounds(0, 0, width, height);
        this.cameras.main.setBounds(0, 0, width, height);
        this.cameras.main.startFollow(target);
        this.cameras.main.setZoom(0.7)
    }

    //AUTRES FONCTIONS
    //Player damage
    playerGetDamagedByEnnemy(player, mob) {
        player.playerLoseHp(1, mob)
        mob.hit = true;
        this.time.delayedCall(1000, () => { mob.hit = false }, [mob], this);
        if (mob.typeE == "mobAgro") {
            mob.mobKnockback()
        }
    }

    playerGetDamagedByProj(player, proj) {
        player.playerLoseHp(1, proj)
        proj.getDestroy()
    }
    //Collect Chapeau
    playerCollectHat(player, hat) {
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
    mobGetDamagedByProj(mob, proj) {
        if (mob.typeE == "mobAgro") {
            mob.mobKnockback();
        }
        mob.loseHp(proj.damage);
        proj.getDestroy();
    }
}