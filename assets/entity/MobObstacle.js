import { Entity } from "./Entity.js";
export class MobObstacle extends Entity {
    constructor(scene, x, y, skin) {
        super(scene, x, y, skin);
        this.skin = skin;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init();
        this.initEvents();
    }

    init() {
        //Variable
        this.health = 5;
        this.typeE = "mobObs"
        this.inWater = false;
        this.cdDash = true;
        this.start = true;

        //Parametre

        //Animation
        if (this.skin == "mobSangsue") {
            this.animsPassif = "sangsue_base";
        }
        this.anims.play(this.animsPassif);
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
        if (this.start) {
            this.start = false;
            this.body.setAllowGravity(true)
        }
        if (this.active) {
            if (this.inWater) {
                this.setGravity(0, -750)
                this.inWater = false;
                if (this.cdDash) {
                    this.scene.time.delayedCall(500, () => { this.setVelocityY(-500) }, [], this);
                    this.cdDash = false;
                    this.scene.time.delayedCall(2000, () => { this.cdDash = true }, [], this);
                }
            }
            else {
                this.setGravity(0, 0)
            }
            if (this.body.velocity.y > 0) {
                this.setAngle(180);
            }
            else {
                this.setAngle(0);
            }
        }

    }
}