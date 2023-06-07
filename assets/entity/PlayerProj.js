import { Entity } from "./Entity.js";
export class PlayerProj extends Entity {
    constructor(scene, x, y, skin, damage, direction) {
        super(scene, x, y, skin);
        this.skin = skin;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.damage = damage;
        this.direction = direction;

        this.init();
        this.initEvents();
    }

    init() {
        //Animation
        if (this.skin == "berryShoot") {
            this.animsMove = "berryProj";
        }
        else if (this.skin == "fire") {
            this.animsMove = "fireProj";
        }
        this.anims.play(this.animsMove);
        this.angle = 0;
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
        if (this.active) {
            if (this.skin == "berryShoot") {
                this.setAngle(this.angle)
                if (this.direction == "right") {
                    this.angle += 5;
                }
                else {
                    this.angle -= 5;
                }
            }
        }
    }

    breakFire(proj, obs) {
        this.events.on(Phaser.Scenes.Events.UPDATE, proj.update, proj);
        proj.getDestroy()
        obs.destroy()
    }

}