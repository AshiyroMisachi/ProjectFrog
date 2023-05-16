import { eventsCenter } from "../../scenes/script.js";
import { TongEnd } from "./TongEnd.js";
export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "perso");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init();
        this.initEvents();
    }

    init() {
        //Variable perso
        this.health = 5;
        this.respawnX = this.x;
        this.respawnY = this.y;
        
        this.speed = 300;
        this.jumpSpeed = 660;
        this.dashSpeed = 900;
        this.climbSpeed = 200;

        this.chargeJump = 0;
        this.cdDash = false;

        this.inCrounch = false;
        this.inJump = false;
        this.inAction = false;
        this.inShoot = false;
        this.inWater = false;
        this.onPlant = false;
        this.directionX = "right";
        this.directionY = ""; 

        this.inMouth = "";
        this.langue = new Phaser.GameObjects.Group;
        this.shoot = null;

        //0: Grab 1:Grow 2:Fire
        this.unlock = [false, false, false]
        this.currentHat = 0;

        //Parametre
        this.setOrigin(0.5, 0.5)

        //Controle Key
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.keyQ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyZ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyS = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyI = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        this.keyO = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        this.keySpace = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {

        //Déplacement Terre
        if (this.inWater == false) {
            //Setup
            this.setAngle(0);
            //On Plant
            if (this.onPlant && this.currentHat == 1) {
                this.setGravity(0, -800);
                this.onPlant = false;
                if (this.keyQ.isDown) {
                    this.setVelocityX(-this.speed);
                    this.anims.play('left_grab', true);
                    this.directionX = "left";
                }
                else if (this.keyD.isDown) {
                    this.setVelocityX(this.speed);
                    this.anims.play('right_grab', true);
                    this.directionX = "right";
                }
                else if (this.inAction == false) {
                    this.setVelocityX(0);
                    this.anims.play('standby_grab');
                }

                if (this.keyZ.isDown) {
                    this.setVelocityY(-this.climbSpeed);
                    this.anims.play('climb_grab');
                }
                else if (this.keyS.isDown) {
                    this.setVelocityY(this.climbSpeed)
                    this.anims.play('climb_grab');
                }
                else {
                    this.setVelocityY(0);
                }
            }
            // Not On Plant
            else {
                this.setGravity(0, 0);
                //Crounch
                if (this.keyS.isDown && this.inJump != true && this.inAction == false) {
                    this.setSize(128, 192);
                    this.setOffset(0, 64);
                    this.inCrounch = true;
                    this.speed = 150;
                    if (this.keyQ.isDown) {
                        this.setVelocityX(-this.speed);
                        this.directionX = "left";
                        this.anims.play('crounchLeft');
                    }
                    else if (this.keyD.isDown) {
                        this.setVelocityX(this.speed);
                        this.directionX = "right";
                        this.anims.play('crounchRight');
                    }
                    else {
                        this.anims.play('crounch');
                    }
                }
                else {
                    this.inCrounch = false;
                    this.speed = 300;
                }

                if (this.inAction == false && this.inCrounch == false) {
                    this.setSize(128, 256);
                    if (this.keyQ.isDown) {
                        this.setVelocityX(-this.speed);
                        this.anims.play('left', true);
                        this.directionX = "left";
                    }
                    else if (this.keyD.isDown) {
                        this.setVelocityX(this.speed);
                        this.anims.play('right', true);
                        this.directionX = "right";
                    }
                    else if (this.inAction == false) {
                        this.setVelocityX(0);
                        this.anims.play('turn');
                    }
                }

                //Tire
                if (Phaser.Input.Keyboard.JustDown(this.keyI) && this.inAction == false) {
                    this.inAction = true;
                    this.inShoot = true;
                    this.setVelocityX(0);
                    if (this.inMouth == "") {
                        if (this.directionX == "right" && this.inCrounch == false) {
                            this.shoot = new TongEnd(this.scene, this.x + 80, this.y - 64);
                        }
                        else if (this.directionX == "left" && this.inCrounch == false) {
                            this.shoot = new TongEnd(this.scene, this.x - 80, this.y - 64);
                        }
                        else if (this.directionX == "right" && this.inCrounch == true) {
                            this.shoot = new TongEnd(this.scene, this.x + 80, this.y - 16);
                        }
                        else if (this.directionX == "left" && this.inCrounch == true) {
                            this.shoot = new TongEnd(this.scene, this.x - 80, this.y - 16);
                        }
                        this.scene.physics.add.collider(this.shoot, this.scene.wall, this.shoot.returnBack, null, this.scene);
                        this.scene.physics.add.collider(this.shoot, this.scene.berry, this.shoot.gotBerry, null, this.scene);
                        this.shoot.getPlayer(this, this.directionX, this.inCrounch);
                        this.langue.add(this.shoot);
                    }
                    else if (this.currentHat == 3){
                        this.inMouth = "";
                        this.scene.time.delayedCall(100, ()=>{this.inAction = false; this.inShoot = false}, [], this);
                        if (this.directionX == "right" && this.inCrounch == false) {
                            this.scene.playerProj.create(this.x + 80, this.y - 64, "fire").setVelocityX(1000).body.setAllowGravity(false);
                        }
                        else if (this.directionX == "left" && this.inCrounch == false) {
                            this.scene.playerProj.create(this.x - 80, this.y - 64, "fire").setVelocityX(-1000).body.setAllowGravity(false);
                        }
                        else if (this.directionX == "right" && this.inCrounch == true) {
                            this.scene.playerProj.create(this.x + 80, this.y - 16, "fire").setVelocityX(1000).body.setAllowGravity(false);
                        }
                        else if (this.directionX == "left" && this.inCrounch == true) {
                            this.scene.playerProj.create(this.x - 80, this.y - 16, "fire").setVelocityX(-1000).body.setAllowGravity(false);
                        }
                        this.scene.playerProj.damage = 3;
                    }
                    else if (this.inMouth == "berry"){
                        this.inMouth = "";
                        this.scene.time.delayedCall(100, ()=>{this.inAction = false; this.inShoot = false}, [], this);
                        if (this.directionX == "right" && this.inCrounch == false) {
                            this.scene.playerProj.create(this.x + 80, this.y - 64, "berry").setVelocityX(1000).setGravity(0,-600);
                        }
                        else if (this.directionX == "left" && this.inCrounch == false) {
                            this.scene.playerProj.create(this.x - 80, this.y - 64, "berry").setVelocityX(-1000).setGravity(0,-600);
                        }
                        else if (this.directionX == "right" && this.inCrounch == true) {
                            this.scene.playerProj.create(this.x + 80, this.y - 16, "berry").setVelocityX(1000).setGravity(0,-600);
                        }
                        else if (this.directionX == "left" && this.inCrounch == true) {
                            this.scene.playerProj.create(this.x - 80, this.y - 16, "berry").setVelocityX(-1000).setGravity(0,-600);
                        }
                        this.scene.playerProj.damage = 2;
                    }
                }


                //Saut
                if (this.keySpace.isDown && this.body.blocked.down && this.inShoot == false && this.inCrounch == false) {
                    this.chargeJump += 1;
                    this.inJump = true;
                    if (this.chargeJump > 20) {
                        this.inAction = true;
                        this.setVelocityX(0);
                        this.anims.play('chargeJump');
                    }
                }
                //Jump C0
                if (this.keySpace.isUp && this.inJump && this.chargeJump <= 20 && this.body.blocked.down) {
                    console.log("Jump C0");
                    this.inJump = false;
                    this.chargeJump = 0;
                    this.setVelocityY(-this.jumpSpeed);
                }
                //Jump c1
                else if (this.keySpace.isUp && this.inJump && (this.chargeJump > 20 && this.chargeJump <= 40)) {
                    console.log("Jump C1");
                    this.inJump = false;
                    this.chargeJump = 0;
                    this.inAction = false;
                    this.setVelocityY(-this.jumpSpeed * 1.3);
                }
                //JumpC2
                else if (this.keySpace.isUp && this.inJump && (this.chargeJump > 40)) {
                    console.log("Jump C2");
                    this.inJump = false;
                    this.chargeJump = 0;
                    this.inAction = false;
                    this.setVelocityY(-this.jumpSpeed * 1.5);
                }
                if (!this.body.blocked.down) {
                    this.chargeJump = 0;
                    this.inJump = false;
                }
            }
        }


        //Nage
        else {
            //Setup
            this.setGravity(0, -800);
            this.inWater = false;
            this.anims.play('swim');
            this.speed = 400
            this.scene.time.delayedCall(200, () => (this.setSize(128, 192)), [], this)

            //Déplacement
            if (this.inAction == false) {
                if (this.keyQ.isDown) {
                    if (this.body.velocity.x < -this.speed) {
                        this.setVelocityX(this.body.velocity.x + 10);
                    }
                    else {
                        this.setVelocityX(-this.speed);
                    }
                    this.directionX = "left";
                }
                else if (this.keyD.isDown) {
                    if (this.body.velocity.x > this.speed) {
                        this.setVelocityX(this.body.velocity.x - 10);
                    }
                    else {
                        this.setVelocityX(this.speed);
                    }
                    this.directionX = "right";
                }
                else {
                    if (this.body.velocity.x < 0) {
                        this.setVelocityX(this.body.velocity.x + 10);
                    }
                    else if (this.body.velocity.x > 0) {
                        this.setVelocityX(this.body.velocity.x - 10);
                    }
                    else {
                        this.setVelocityX(0);
                    }
                    this.directionX = "";
                }

                if (this.keyS.isDown) {
                    if (this.body.velocity.y > this.speed) {
                        this.setVelocityY(this.body.velocity.y - 10);
                    }
                    else {
                        this.setVelocityY(this.speed);
                    }
                    this.directionY = "down";
                }
                else if (this.keyZ.isDown) {
                    if (this.body.velocity.y < -this.speed) {
                        this.setVelocityY(this.body.velocity.y + 10);
                    }
                    else {
                        this.setVelocityY(-this.speed);
                    }
                    this.directionY = "up";
                }
                else {
                    if (this.body.velocity.y < 0) {
                        this.setVelocityY(this.body.velocity.y + 10);
                    }
                    else if (this.body.velocity.y > 40) {
                        this.setVelocityY(this.body.velocity.y - 10);
                    }
                    else {
                        this.setVelocityY(40);
                    }
                    this.directionY = "";
                }
            }

            //Rotate
            if (this.directionX == "left" && this.directionY == "down") {
                this.setAngle(-135)
            }
            else if (this.directionX == "left" && this.directionY == "up") {
                this.setAngle(-45)
            }
            else if (this.directionX == "right" && this.directionY == "down") {
                this.setAngle(135)
            }
            else if (this.directionX == "right" && this.directionY == "up") {
                this.setAngle(45)
            }
            else if (this.directionX == "right") {
                this.setAngle(90);

            }
            else if (this.directionX == "left") {
                this.setAngle(-90)

            }
            else if (this.directionY == "down") {
                this.setAngle(-180);
            }
            else if (this.directionY == "up") {
                this.setAngle(180);
            }
            else {
                this.setAngle(0);
            }

            //Dash
            if (this.cdDash == false) {
                if (this.keySpace.isDown) {
                    if (this.directionX == "left" && this.directionY == "down") {
                        this.setVelocityX(-this.dashSpeed);
                        this.setVelocityY(this.dashSpeed);
                    }
                    else if (this.directionX == "right" && this.directionY == "down") {
                        this.setVelocityX(this.dashSpeed);
                        this.setVelocityY(this.dashSpeed);
                    }
                    else if (this.directionX == "left" && this.directionY == "up") {
                        this.setVelocityX(-this.dashSpeed);
                        this.setVelocityY(-this.dashSpeed);
                    }
                    else if (this.directionX == "right" && this.directionY == "up") {
                        this.setVelocityX(this.dashSpeed);
                        this.setVelocityY(-this.dashSpeed);
                    }
                    else if (this.directionX == "left") {
                        this.setVelocityX(-this.dashSpeed);
                    }
                    else if (this.directionX == "right") {
                        this.setVelocityX(this.dashSpeed);
                    }
                    else if (this.directionY == "up") {
                        this.setVelocityY(-this.dashSpeed);
                    }
                    else if (this.directionY == "down") {
                        this.setVelocityY(this.dashSpeed);
                    }
                    if (this.directionX != "" || this.directionY != "") {
                        this.cdDash = true;
                        this.scene.time.delayedCall(1000, () => { this.cdDash = false; console.log("Dash back") }, [], this);
                    }
                }
            }
        }

        //Switch Chapeau
        if (Phaser.Input.Keyboard.JustDown(this.keyO)) {
            if (this.currentHat != 3) {
                this.currentHat += 1;
            }
            else {
                this.currentHat = 0;
            }
            if (this.unlock[0] == false && this.currentHat == 1) {
                this.currentHat += 1;
            }
            if (this.unlock[1] == false && this.currentHat == 2) {
                this.currentHat += 1;
            }
            if (this.unlock[2] == false && this.currentHat == 3) {
                this.currentHat = 0;
            }
            eventsCenter.emit('switchHat', this.currentHat);
        }

        //Update Health
        eventsCenter.emit('updateHealth', this.health);
    }

    //Verifaction Etat Déplacement
    enterWater(player) {
        player.inWater = true;
    }

    onPlantGrab(player) {
        player.onPlant = true;
    }


    //Récupération Projectile
    getBerry(player, berry) {
        berry.destroy();
        player.inMouth = "berry";
    }

    canGetBerry(player, berry) {
        if (berry.getGrab) {
            return true;
        }
        else {
            return false;
        }
    }

    //Gestion prise de dégâts
    getDamaged(player, mob){
        player.health -= 1;
        player.getHit = true;
        mob.doHit = true;
        if (this.health == 0){
            //this.scene.scene.start("gameOver");
        }
        if (mob.body.touching.right){
            player.body.setVelocity(-200, -60);
            mob.body.setVelocity(200, 0);
        }
        else if (mob.body.touching.left){
            player.body.setVelocity(200, -60);
            mob.body.setVelocity(-200, 0);
        }
        else if (mob.body.touching.up){
            player.body.setVelocity(-60, -200);
            mob.body.setVelocity(60, -200);
        }
        else if (player.body.touching.down){
            player.body.setVelocity(60, 200);
            mob.body.setVelocity(-60, 200);
        }
    }

    respawn(){
        this.x = this.respawnX;
        this.y = this.respawnY;
    }

}