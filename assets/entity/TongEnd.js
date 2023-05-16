//import eventsCenter from "./EventsCenter.js"
export class TongEnd extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "tongEnd");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init();
        this.initEvents();
    }

    init() {
        //Variable
        this.speed = 600;
        this.target = null;
        this.movement = true;
        this.disapear = false;
        this.targetDirection = null;
        this.targetInCrounch = null;

        //Parametre
        this.body.setAllowGravity(false);

        //Anims
        this.anims.create({
            key: 'tongProj',
            frames: [{ key: 'tongEnd', frame: 0 }],
            frameRate: 20
        });
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
        if (this.disapear) {
            return
        }
        else {
            if (this.movement == false && Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) <= 96) {
                this.destroy();
                this.disapear = true;
                this.target.inAction = false;
                this.target.inShoot = false;
            }
            if (this.targetInCrounch == false){
                this.y = this.target.y - 64;
            }
            else {
                this.y = this.target.y - 16;
            }
            if (this.movement && this.disapear == false) {
                if (this.targetDirection == "right") {
                    this.setVelocityX(this.speed);
                }
                else if (this.targetDirection == "left") {
                    this.setVelocityX(-this.speed);
                }
            }
            else if (this.disapear == false) {
                if (this.targetDirection == "right") {
                    this.setVelocityX(-this.speed);
                }
                else if (this.targetDirection == "left") {
                    this.setVelocityX(this.speed);
                }
            }
            if ((Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) >= 320) && this.disapear == false) {
                this.movement = false;
            }
        }

    }

    getPlayer(player, direction, position) {
        this.target = player;
        this.targetDirection = direction;
        this.targetInCrounch = position;
    }

    returnBack(shoot, wall){
        shoot.movement = false;
    }

    gotBerry(shoot, berry){
        let berryX = berry.x;
        let berryY = berry.y;
        this.time.delayedCall(5000, ()=>{ this.berry.create(berryX, berryY, "berry").setDepth(-1) }, [], this);
        shoot.movement = false;
        berry.getGrab = true;
        if (shoot.targetInCrounch == false){
            this.physics.moveTo(berry, this.player.x, this.player.y - 64, 600);
        }
        else {
            this.physics.moveTo(berry, this.player.x, this.player.y - 16, 600);
        }
        
    }
}