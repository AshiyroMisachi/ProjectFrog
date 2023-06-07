import { Entity } from "./Entity.js";
export class TongEnd extends Entity {
    constructor(scene, x, y, direction) {
        super(scene, x, y, "tongEnd");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.targetDirection = direction;

        this.init();
        this.initEvents();
    }

    init() {
        //Variable
        this.speed = 600;
        this.target = null;
        this.movement = true;
        this.disapear = false;
        this.targetInCrounch = null;
        this.damage = 1;

        //Parametre
        this.body.setAllowGravity(false);

        //Anims
        this.anims.create({
            key: 'tongProj',
            frames: [{ key: 'tongEnd', frame: 0 }],
            frameRate: 20
        });
        if (this.targetDirection == "right") {
            this.tong = this.scene.add.sprite(this.x - 8, this.y + 2, "tong").setOrigin(0, 0)
            this.tongOrigin = this.tong.x
            this.tongMask = this.scene.add.sprite(this.tong.x - 8, this.tong.y + 2, "tong").setVisible(false).setOrigin(0, 0)
            this.tong.setPosition(this.tongOrigin - 256, this.tong.y)
        }
        else if (this.targetDirection == "left") {
            this.tong = this.scene.add.sprite(this.x - 234, this.y + 2, "tong").setOrigin(0, 0)
            this.tongOrigin = this.tong.x
            this.tongMask = this.scene.add.sprite(this.tong.x, this.tong.y + 2, "tong").setVisible(false).setOrigin(0, 0)
            this.tong.setPosition(this.tongOrigin + 256, this.tong.y)
        }
        this.tong.mask = new Phaser.Display.Masks.BitmapMask(this.scene, this.tongMask);
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
        if (this.disapear) {
            this.tong.destroy();
            this.tongMask.destroy();
            return
        }
        else {
            if (this.targetDirection == "right") {
                this.tong.x = this.tongOrigin + Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) - 339
            }
            else if (this.targetDirection == "left") {
                this.tong.x = this.tongOrigin - Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) + 339
            }

            if (this.movement == false && Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) <= 96) {
                this.destroy();
                this.disapear = true;
                this.target.inAction = false;
                this.target.inShoot = false;
            }
            if (this.targetInCrounch == false) {
                this.y = this.target.y - 64;
                this.tongMask.y = this.target.y - 64;
                this.tong.y = this.target.y - 64;
            }
            else {
                this.y = this.target.y - 2;
                this.tongMask.y = this.target.y + 3;
                this.tong.y = this.target.y +3 ;
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
            if ((Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) >= 256) && this.disapear == false) {
                this.movement = false;
            }
        }

    }

    getPlayer(player, direction, position) {
        this.target = player;
        this.targetDirection = direction;
        this.targetInCrounch = position;
    }

    returnBack(shoot, wall) {
        shoot.movement = false;
    }

    //Get item
    gotBerry(shoot, berry) {
        let berryX = berry.x;
        let berryY = berry.y;
        if (!berry.getGrab) { this.time.delayedCall(5000, () => { this.berry.create(berryX, berryY, "berry").setDepth(-1) }, [], this); }
        shoot.movement = false;
        berry.getGrab = true;
        if (shoot.targetInCrounch == false) {
            this.physics.moveTo(berry, this.player.x, this.player.y - 64, 600);
        }
        else {
            this.physics.moveTo(berry, this.player.x, this.player.y - 16, 600);
        }
    }

    gotMoustique(shoot, moustique) {
        shoot.movement = false;
        moustique.getGrab = true;
        if (shoot.targetInCrounch == false) {
            this.physics.moveTo(moustique, this.player.x, this.player.y - 64, 600);
        }
        else {
            this.physics.moveTo(moustique, this.player.x, this.player.y - 16, 600);
        }
    }

    //Prise de dégâts
    doDamage(tong, mob) {
        tong.movement = false;
        if (mob.typeE == "mobAgro") {
            mob.mobKnockback();
        }
        mob.loseHp(1);
    }
}