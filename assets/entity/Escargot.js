import { Entity } from "./Entity.js";
export class Escargot extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "escargot");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init();
        this.initEvents();
    }

    init() {
        //Variable
        if (this.direction == "right"){
            this.speed = 50;
            this.setFlipX(true)
        }
        else {
            this.speed = -50;
        }
        this.spawnX = this.x;
        this.spawnY = this.y;
        this.start = true;
        this.getGrab = false;

        //Parametre
        this.setCollideWorldBounds(true);
        this.setVelocityX(this.speed);

        //Animation
        this.anims.play("escargot_mouv")

    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
        if (this.start) {
            this.start = false;
            this.setVelocityX(this.speed);
        }

        if (Phaser.Math.Distance.Between(this.x, this.y, this.spawnX, this.spawnY) > 256){
            this.spawnX = this.x;
            this.spawnY = this.y;
            this.speed = this.speed * (-1);
            if (this.speed < 0){
                this.setFlipX(false)
            }
            else {
                this.setFlipX(true)
            }
            this.setVelocityX(this.speed);
        }

    }

    getDirection(direction){
        this.direction = direction;
    }
}

