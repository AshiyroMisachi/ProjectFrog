import { Entity } from "./Entity.js";
export class Moustique extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "moustique");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init();
        this.initEvents();
    }

    init() {
        //Variable
        this.start = true;
        this.speed = 100;
        this.spawnX = this.x;
        this.spawnY = this.y;
        this.angleDirection = Math.random() * (360 - 1) + 1;
        this.angleOld = this.angleDirection;
        this.changeDirection = false;
        this.outZone = false;
        this.getGrab = false;

        //Parametre
        this.setGravity(0, -800)
        this.setCollideWorldBounds(true);

        //Animation
        this.anims.play('moustique_mouv'); 

    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
        if (this.start) {
            this.start = false;
            this.setVelocity(Math.cos(this.angleDirection) * this.speed, Math.sin(this.angleDirection) * this.speed);
        }

        if (Phaser.Math.Distance.Between(this.x, this.y, this.spawnX, this.spawnY) < 400 && this.getGrab == false) {
            this.switchDirection()
        }
        else if (this.getGrab == false){
            this.backToSpawn()
        }
    }

    switchDirection() {
        if (Phaser.Math.Distance.Between(this.x, this.y, this.spawnX, this.spawnY) > 200 && this.changeDirection == false && this.outZone == false) {
            this.angleDirection = Math.random() * (360 - 1) + 1;
            if (this.angleDirection > this.angleOld + 90 || this.angleDirection < this.angleOld - 90) {
                this.setVelocity(Math.cos(this.angleDirection) * this.speed, Math.sin(this.angleDirection) * this.speed);
                this.changeDirection = true;
                this.scene.time.delayedCall(200, () => { this.changeDirection = false }, [], this)
            }
        }
    }

    backToSpawn() {
        this.scene.physics.moveTo(this, this.spawnX, this.spawnY, 100);
        this.outZone = true;
        this.scene.time.delayedCall(3000, () => { this.outZone = false }, [], this);
    }


}