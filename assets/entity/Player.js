import {eventsCenter} from "../../scenes/script.js";
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
        this.speed = 300;
        this.jumpSpeed = 660;
        this.dashSpeed = 900;
        this.chargeJump = 0;
        this.cdDash = false;
        this.inJump = false;
        this.inAction = false;
        this.inShoot = false;
        this.inWater = false;
        this.directionX = "right";
        this.directionY = "";
        this.langue = new Phaser.GameObjects.Group;
        this.shoot = null;

        this.unlockGrab = false;
        this.unlockGrow = false;
        this.unlockFire = false;
        //0: Grab 1:Grow 2:Fire
        this.unlock = [false, false, false]

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

        //Anims
        if (true) {
            this.anims.create({
                key: 'turn',
                frames: [{ key: 'perso', frame: 0 }],
                frameRate: 20
            });

            this.anims.create({
                key: 'left',
                frames: [{ key: 'perso', frame: 1 }],
                frameRate: 20
            });

            this.anims.create({
                key: 'right',
                frames: [{ key: 'perso', frame: 2 }],
                frameRate: 20
            });

            this.anims.create({
                key: 'chargeJump',
                frames: [{ key: 'perso', frame: 3 }],
                frameRate: 20
            });

            this.anims.create({
                key: 'crounch',
                frames: [{ key: 'perso', frame: 4 }],
                frameRate: 20
            });

            this.anims.create({
                key: 'crounchLeft',
                frames: [{ key: 'perso', frame: 5 }],
                frameRate: 20
            });

            this.anims.create({
                key: 'crounchRight',
                frames: [{ key: 'perso', frame: 6 }],
                frameRate: 20
            });

            this.anims.create({
                key: 'shootingStand',
                frames: [{ key: 'perso', frame: 7 }],
                frameRate: 20
            });

            this.anims.create({
                key: 'shootingCrounch',
                frames: [{ key: 'perso', frame: 8 }],
                frameRate: 20
            });

            this.anims.create({
                key: 'swim',
                frames: [{ key: 'perso', frame: 9 }],
                frameRate: 20
            });
        }
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {

        //Déplacement Terre
        if (this.inWater == false) {
            //Setup
            this.setGravity(0, 0);
            this.setSize(128, 256);
            this.setAngle(0);

            if (this.inAction == false) {
                //Crounch
                if (this.keyS.isDown) {
                    this.speed = 150;
                    if (this.keyQ.isDown) {
                        this.setVelocityX(-this.speed);
                        this.anims.play('crounchLeft', true);
                        this.directionX = "left";
                    }
                    else if (this.keyD.isDown) {
                        this.setVelocityX(this.speed);
                        this.anims.play('crounchRight', true);
                        this.directionX = "right";
                    }
                    else {
                        this.setVelocityX(0);
                        this.anims.play('crounch');
                    }
                }
                //Normal
                else {
                    this.speed = 300;
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
                    else {
                        this.setVelocityX(0);
                        this.anims.play('turn');
                    }
                }

                //Tire
                if (Phaser.Input.Keyboard.JustDown(this.keyI)) {
                    this.inAction = true;
                    this.inShoot = true;
                    this.setVelocityX(0);
                    if (this.directionX == "right") {
                        this.shoot = new TongEnd(this.scene, this.x + 80, this.y - 32);
                    }
                    else {
                        this.shoot = new TongEnd(this.scene, this.x - 80, this.y - 32);
                    }
                    this.shoot.getPlayer(this, this.directionX);
                    this.langue.add(this.shoot);
                }
            }

            //Saut
            if (this.keySpace.isDown && this.body.blocked.down && this.inShoot == false) {
                this.chargeJump += 1;
                this.inJump = true;
                console.log(this.chargeJump)
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
        if (Phaser.Input.Keyboard.JustDown(this.keyO)){
            console.log("CHAPO")
        }
    }

    enterWater(player) {
        player.inWater = true;
    }

}