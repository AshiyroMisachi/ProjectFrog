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
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.setBounce(0.2);

        //Anims
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
     }

     initEvents(){
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
     }

     update(){
        //Déplacement
        if (this.cursors.left.isDown) { 
            this.setVelocityX(-this.speed); 
            this.anims.play('left', true); 
        }
        else if (this.cursors.right.isDown) { 
            this.setVelocityX(this.speed); 
            this.anims.play('right', true); 
        }
        else { 
            this.setVelocityX(0); 
            this.anims.play('turn'); 
        }

        //Saut
        if (this.cursors.up.isDown && this.body.blocked.down) {
            this.setVelocityY(-this.jumpSpeed); 
        }
     }
}