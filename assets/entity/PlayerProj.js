import { Entity } from "./Entity.js";
export class PlayerProj extends Entity {
    constructor(scene, x, y, skin, damage) {
        super(scene, x, y, skin);
        this.skin = skin;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.damage = damage;

        this.init();
        this.initEvents();
    }

    init() {
        //Animation
        if (this.skin == "berryShoot") {
            this.animsMove = "berryProj";
        }
        else if (this.skin == "fire"){
            this.animsMove = "fireProj";
        }
        this.anims.play(this.animsMove);
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update(){}

    breakFire(proj, obs){
        proj.destroy()
        obs.destroy()
    }

}