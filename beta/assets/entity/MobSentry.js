import { Entity } from "./Entity.js";
import { ProjSentry } from "./ProjSentry.js";
export class MobSentry extends Entity {
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
        this.health = 3;
        this.shootCD = true;
        this.target = null;
        this.typeE = "mobSentry"

        this.getHit = false;
        this.doHit = false;

        //Parametre
        this.setGravity(0, -800);

        //Animation
        if (this.skin == "mobSpider") {
            this.animsPassif = "spider_base";
        }
        this.anims.play(this.animsPassif);
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
        if (Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) < 500 && this.shootCD == true){
            this.shoot = new ProjSentry(this.scene, this.x, this.y, "spiderShoot");
            this.scene.mob_proj.add(this.shoot);
            this.scene.physics.moveToObject(this.shoot, this.target, 300)
            this.shootCD = false;
            this.scene.time.delayedCall(3000, ()=>{ this.shootCD = true }, [], this);
        }
    }
}