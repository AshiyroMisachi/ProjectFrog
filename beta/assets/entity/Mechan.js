import { BossProj } from "./BossProj.js";
import { Entity } from "./Entity.js";
export class Mechan extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "mechan");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init();
        this.initEvents();
    }

    init() {
        //Variable
        this.health = 10;
        this.target = null;
        this.hit = false;

        this.coordX = [14404, 14512, 15036, 15492, 15636]
        this.coordY = [1524, 1092, 1348, 1084, 1492]

        this.cdTp = false;
        this.scene.time.delayedCall(2000, ()=> { this.cdTp = true }, [], this);

        //Parametre

        //Animation

    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
        if (this.active) {
            if (this.x <= this.target.x){
                this.setFlipX(true);
            }
            else {
                this.setFlipX(false);
            }

            if (this.cdTp){
                //TP
                this.cdTp = false;
                this.scene.time.delayedCall(5000, ()=> { this.cdTp = true }, [], this);
                var i = Math.floor(Math.random() * (4 - 0) ) + 0;
                this.setPosition(this.coordX[i], this.coordY[i])

                //Shoot
                this.shoot = new BossProj(this.scene, this.x, this.y)
                this.scene.physics.moveToObject(this.shoot, this.target, 350);
                this.scene.physics.add.overlap(this.target, this.shoot, ()=> { this.shoot.getDestroy();this.target.playerLoseHp(1)}, null, this)
            }
        }
    }
}