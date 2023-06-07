import { eventsCenter } from "../../scenes/script.js";
import { TongEnd } from "./TongEnd.js";
import { PlayerProj } from "./PlayerProj.js";
import { Entity } from "./Entity.js";
export class Player extends Entity {
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

        this.getHit = false
        this.clignotement = 3;

        this.speed = 500;
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
        this.shoot = null;

        //0: Grab 1:Grow 2:Fire
        this.unlock = [false, false, false]
        this.currentHat = 0;

        //Parametre
        this.setOrigin(0.5, 0.5)
        this.setCollideWorldBounds(true);

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
        if (this.active) {//Déplacement Terre
            if (this.inWater == false) {
                //Setup
                this.setAngle(0);
                this.setFlipY(false);
                //On Plant
                if (this.onPlant && this.currentHat == 1 && this.inAction == false) {
                    this.setGravity(0, -800);
                    this.onPlant = false;
                    if (this.keyQ.isDown) {
                        this.setVelocityX(-this.speed);
                        this.anims.play('player_grab', true);
                        this.directionX = "left";
                    }
                    else if (this.keyD.isDown) {
                        this.setVelocityX(this.speed);
                        this.anims.play('player_grab', true);
                        this.directionX = "right";
                    }
                    else if (this.inAction == false) {
                        this.setVelocityX(0);
                    }

                    if (this.keyZ.isDown) {
                        this.setVelocityY(-this.climbSpeed);
                        this.anims.play('player_grab', true);
                    }
                    else if (this.keyS.isDown) {
                        this.setVelocityY(this.climbSpeed)
                        this.anims.play('player_grab', true);
                    }
                    else {
                        this.setVelocityY(0);
                    }
                }
                // Not On Plant
                else {
                    this.setGravity(0, 0);
                    //Crounch
                    if (this.inAction == false) {
                        if (this.keyS.isDown && this.inJump != true) {
                            this.setSize(128, 192);
                            this.setOffset(0, 64);
                            this.inCrounch = true;
                            this.speed = 150;
                            if (this.keyQ.isDown) {
                                this.setVelocityX(-this.speed);
                                this.directionX = "left";
                                this.anims.play('player_shift_walk', true);
                                this.setFlipX(true);
                            }
                            else if (this.keyD.isDown) {
                                this.setVelocityX(this.speed);
                                this.directionX = "right";
                                this.anims.play('player_shift_walk', true);
                                this.setFlipX(false);
                            }
                            else {
                                this.setVelocityX(0);
                                this.anims.play('player_shift', true);
                            }
                        }
                        else {
                            this.inCrounch = false;
                            this.speed = 300;
                        }

                        if (this.inCrounch == false) {
                            this.setSize(128, 256);
                            if (this.keyQ.isDown) {
                                this.setVelocityX(-this.speed);
                                this.anims.play('player_walk', true);
                                this.setFlipX(true);
                                this.directionX = "left";
                            }
                            else if (this.keyD.isDown) {
                                this.setVelocityX(this.speed);
                                this.anims.play('player_walk', true);
                                this.setFlipX(false);
                                this.directionX = "right";
                            }
                            else {
                                this.setVelocityX(0);
                                this.anims.play('player_standBy', true);
                            }
                        }
                    }

                    //Tire
                    if (Phaser.Input.Keyboard.JustDown(this.keyI) && this.inAction == false) {
                        if (this.inCrounch) {
                            this.anims.play("player_shift_shoot");
                        }
                        else {
                            this.anims.play("player_shoot")
                        }
                        this.inAction = true;
                        this.inShoot = true;
                        this.setVelocityX(0);
                        if (this.inMouth == "") {
                            if (this.directionX == "right" && this.inCrounch == false) {
                                this.shoot = new TongEnd(this.scene, this.x + 80, this.y - 64, "right").setScale(0.5);
                            }
                            else if (this.directionX == "left" && this.inCrounch == false) {
                                this.shoot = new TongEnd(this.scene, this.x - 80, this.y - 64, "left").setScale(0.5);
                            }
                            else if (this.directionX == "right" && this.inCrounch == true) {
                                this.shoot = new TongEnd(this.scene, this.x + 80, this.y - 2, "right").setScale(0.5);
                            }
                            else if (this.directionX == "left" && this.inCrounch == true) {
                                this.shoot = new TongEnd(this.scene, this.x - 80, this.y - 2, "left").setScale(0.5);
                            }
                            this.scene.physics.add.collider(this.shoot, this.scene.wall, this.shoot.returnBack, null, this.scene);
                            this.scene.physics.add.collider(this.shoot, this.scene.berry, this.shoot.gotBerry, null, this.scene);
                            this.scene.physics.add.collider(this.shoot, this.scene.moustique, this.shoot.gotMoustique, null, this.scene);
                            this.scene.physics.add.overlap(this.shoot, this.scene.mobAgressif, this.shoot.doDamage, null, this.scene);
                            this.shoot.getPlayer(this, this.directionX, this.inCrounch);
                        }
                        else {
                            let skinProj;
                            let damageProj;
                            let gravityProj;
                            if (this.currentHat == 3) {
                                skinProj = "fire";
                                damageProj = 3;
                                gravityProj = 800;
                            }
                            else if (this.inMouth == "berry") {
                                skinProj = "berryShoot";
                                damageProj = 2;
                                gravityProj = 600;
                            }
                            if (this.directionX == "right" && this.inCrounch == false) {
                                this.proj = new PlayerProj(this.scene, this.x + 80, this.y - 64, skinProj, damageProj, "right");
                            }
                            else if (this.directionX == "left" && this.inCrounch == false) {
                                this.proj = new PlayerProj(this.scene, this.x - 80, this.y - 64, skinProj, damageProj, "left");
                            }
                            else if (this.directionX == "right" && this.inCrounch == true) {
                                this.proj = new PlayerProj(this.scene, this.x + 80, this.y - 2, skinProj, damageProj, "right");
                            }
                            else if (this.directionX == "left" && this.inCrounch == true) {
                                this.proj = new PlayerProj(this.scene, this.x - 80, this.y - 2, skinProj, damageProj, "left");
                            }
                            if (skinProj = "fire") {
                                this.scene.physics.add.collider(this.proj, this.scene.breakFire, this.proj.breakFire, null, this.scene);
                            }
                            this.scene.playerProj.add(this.proj);
                            this.proj.setGravity(0, -gravityProj);
                            if (this.directionX == "right") {
                                this.proj.setVelocityX(1000);
                            }
                            else {
                                this.proj.setVelocityX(-1000);
                            }
                            this.scene.time.delayedCall(100, () => { this.inAction = false; this.inShoot = false }, [], this);
                            this.inMouth = "";
                        }
                    }
                    //Saut
                    if (this.keySpace.isDown && this.body.blocked.down && this.inShoot == false && this.inCrounch == false) {
                        this.chargeJump += 1;
                        this.inJump = true;
                        if (this.chargeJump > 20) {
                            this.inAction = true;
                            this.setVelocityX(0);
                            this.anims.play('player_chargeJump');
                        }
                    }
                    //Jump C0
                    if (this.keySpace.isUp && this.inJump && this.chargeJump <= 20 && this.body.blocked.down) {
                        this.inJump = false;
                        this.chargeJump = 0;
                        this.setVelocityY(-this.jumpSpeed);
                    }
                    //Jump c1
                    else if (this.keySpace.isUp && this.inJump && (this.chargeJump > 20 && this.chargeJump <= 40)) {
                        this.inJump = false;
                        this.chargeJump = 0;
                        this.inAction = false;
                        this.setVelocityY(-this.jumpSpeed * 1.3);
                    }
                    //JumpC2
                    else if (this.keySpace.isUp && this.inJump && (this.chargeJump > 40)) {
                        this.inJump = false;
                        this.chargeJump = 0;
                        this.inAction = false;
                        this.setVelocityY(-this.jumpSpeed * 1.5);
                    }
                    if (!this.body.blocked.down) {
                        this.chargeJump = 0;
                        if (this.body.velocity.y > (-50)) {
                            this.setVelocityY(this.body.velocity.y + 20);
                        }
                    }
                }
            }

            //Nage
            else {
                //Setup
                this.setGravity(0, -800);
                this.inWater = false;
                this.anims.play('player_swim', true);
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
                    this.setFlipX(true)
                }
                else if (this.directionX == "left" && this.directionY == "up") {
                    this.setAngle(-45)
                    this.setFlipX(true)
                }
                else if (this.directionX == "right" && this.directionY == "down") {
                    this.setAngle(135)
                    this.setFlipX(false)
                }
                else if (this.directionX == "right" && this.directionY == "up") {
                    this.setAngle(45)
                    this.setFlipX(false)
                }
                else if (this.directionX == "right") {
                    this.setAngle(90);
                    this.setFlipX(false)
                }
                else if (this.directionX == "left") {
                    this.setAngle(-90);
                    this.setFlipX(true)
                }
                else if (this.directionY == "down") {
                    this.setAngle(-180);
                    this.setFlipX(false)
                    this.setFlipY(false)
                }
                else if (this.directionY == "up") {
                    this.setAngle(180);
                    this.setFlipY(true)
                }
                else {
                    this.setAngle(0);
                    this.setFlipX(false)
                    this.setFlipY(false)
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
            }

            //Update
            eventsCenter.emit('updateHealth', this.health);
            eventsCenter.emit('switchHat', this.currentHat);
        }
    }

    //Gestion prise de dégâts
    playerLoseHp(damage, entity) {
        this.health -= damage
        this.getHit = true;
        if (this.health <= 0) {
            this.scene.scene.start("gameOver")
            console.log("respawn")
        }
        else if (entity != null) {
            this.inAction = true;
            this.scene.time.delayedCall(500, () => { this.inAction = false }, [], this);
            this.playerKnockback(entity)
        }
        this.invisible()
    }

    playerKnockback(entity) {
        if (entity.body.touching.right) {
            this.body.setVelocity(200, -60);
        }
        else if (entity.body.touching.left) {
            this.body.setVelocity(-200, -60);
        }
        else if (entity.body.touching.up) {
            this.body.setVelocity(-60, -200);
        }
        else if (entity.body.touching.down) {
            this.body.setVelocity(60, 200);
        }
    }

    //I Frame
    visible() {
        this.setTint()
        this.clignotement -= 1;
        if (this.clignotement == 0) {
            this.clignotement = 3;
            this.getHit = false;
        }
        else {
            this.scene.time.delayedCall(200, () => { this.invisible() }, [], this);
        }
    }

    invisible() {
        this.setTint(0xff0000)
        this.scene.time.delayedCall(200, () => { this.visible() }, [], this);
    }

    //Respawn
    respawn() {
        this.x = this.respawnX;
        this.y = this.respawnY;
        this.health = 5;
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

    eatMoustique(player, moustique) {
        moustique.getDestroy();
        player.health += 1
        if (player.health > 5) {
            player.health = 5;
        }
    }

    canEatMoustique(player, moustique) {
        if (moustique.getGrab) {
            return true;
        }
        else {
            return false;
        }
    }

}