//import eventsCenter from "./EventsCenter.js"
export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, "perso");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init();
        this.initEvents();
    }

     init(){
        //Variable perso
        this.speed = 300;
        this.jumpSpeed = 660;
        this.chargeJump = 0;
        this.inJump = false;
        this.inAction = false;
        this.inWater = false;
        this.directionX = "";
        this.directionY = "";

        //Parametre
        this.setOrigin(0.5,0.5)

        //Controle Key
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.keyQ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyZ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyS = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keySpace = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //Anims
        if (true){
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

     initEvents(){
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
     }

     update(){
        //Déplacement Terre
        if (this.inWater == false){
            this.setGravity(0, 0);
            if ( this.inAction == false){
                //Crounch
                if (this.keyS.isDown) {
                    this.speed = 150;
                    if (this.keyQ.isDown) { 
                        this.setVelocityX(-this.speed); 
                        this.anims.play('crounchLeft', true); 
                    }
                    else if (this.keyD.isDown) { 
                        this.setVelocityX(this.speed); 
                        this.anims.play('crounchRight', true); 
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
                    }
                    else if (this.keyD.isDown) { 
                        this.setVelocityX(this.speed); 
                        this.anims.play('right', true); 
                    }
                    else { 
                        this.setVelocityX(0); 
                        this.anims.play('turn'); 
                    }
                }
            }
            
            //Saut
            if (this.keySpace.isDown && this.body.blocked.down) {
                this.chargeJump +=1;
                this.inJump = true;
                console.log(this.chargeJump)
                if (this.chargeJump > 20){
                    this.inAction = true;
                    this.setVelocityX(0);
                    this.anims.play('chargeJump'); 
                }
            }
            //Jump C0
            if (this.keySpace.isUp && this.inJump && this.chargeJump <= 20){
                console.log("Jump C0");
                this.inJump = false;
                this.chargeJump = 0;
                this.setVelocityY(-this.jumpSpeed);
            }
            //Jump c1
            else if (this.keySpace.isUp && this.inJump && (this.chargeJump > 20 && this.chargeJump <= 40)){
                console.log("Jump C1");
                this.inJump = false;
                this.chargeJump = 0;
                this.inAction = false;
                this.setVelocityY(-this.jumpSpeed*1.3);
            }
            //JumpC2
            else if (this.keySpace.isUp && this.inJump && (this.chargeJump > 40)) {
                console.log("Jump C2");
                this.inJump = false;
                this.chargeJump = 0;
                this.inAction = false;
                this.setVelocityY(-this.jumpSpeed*1.5);
            }
        }
        //Nage
        else {
            //Setup
            this.anims.play('swim');
            this.speed = 400

            //Déplacement
            if (this.keyQ.isDown) { 
                this.setVelocityX(-this.speed);
                this.directionX = "left";
            }
            else if (this.keyD.isDown) { 
                this.setVelocityX(this.speed);
                this.directionX = "right"; 
            }
            else {
                this.setVelocityX(0);
                this.directionX = "";
            }

            if (this.keyS.isDown) { 
                this.setVelocityY(this.speed);
                this.directionY = "down"; 
            }
            else if (this.keyZ.isDown) {
                this.setVelocityY(-this.speed);
                this.directionY = "up"; 
            }
            else {
                this.directionY = ""; 
                if (this.body.velocity.y > 50){
                    this.setVelocityY(this.body.velocity.y - 12);
                }
                else {
                    this.setVelocityY(50)
                }
            }

            //Rotate
            if (this.directionX == "left" && this.directionY == "down"){
                this.setAngle(-135)
            }
            else if (this.directionX == "left" && this.directionY == "up"){
                this.setAngle(-45)
            }
            else if (this.directionX == "right" && this.directionY == "down"){
                this.setAngle(135)
            }
            else if (this.directionX == "right" && this.directionY == "up"){
                this.setAngle(45)
            }
            else if (this.directionX == "right"){
                this.setAngle(90);
            }
            else if (this.directionX == "left"){
                this.setAngle(-90)
            }
            else if (this.directionY == "down"){
                this.setAngle(-180);
            }
            else if (this.directionY == "up"){
                this.setAngle(180);
            }
            else {
                this.setAngle(0);
            }
            
            //Dash
        };

    }

     enterWater() {
        this.time.delayedCall(0, () => { this.player.inWater = true}, [], this);
     }
}