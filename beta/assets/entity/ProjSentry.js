import { Entity } from "./Entity.js";
export class ProjSentry extends Entity {
    constructor(scene, x, y, skin, damage) {
        super(scene, x, y, skin);
        this.skin = skin;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init();
        this.initEvents();
    }

    init() {
        //Variable

        //Parametre
        this.setGravity(0, -800);

        //Animation
        if (this.skin == "spiderShoot") {
            this.animsMove = "spiderShoot";
        }
        this.anims.play(this.animsMove);

    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update(){}
}