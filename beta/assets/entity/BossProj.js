import { Entity } from "./Entity.js";
export class BossProj extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "bossProj");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.damage = 1;

        this.init();
        this.initEvents();
    }

    init() {
        this.angle = 0;
        this.body.setAllowGravity(false)
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
        if (this.active) {
                this.setAngle(this.angle)
                this.angle += 5;
        }
    }
}