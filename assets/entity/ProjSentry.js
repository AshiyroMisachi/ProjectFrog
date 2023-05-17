export class ProjSentry extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, skin, damage) {
        super(scene, x, y, skin);
        this.skin = skin;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init();
    }

    init() {
        //Variable

        //Parametre
        this.setGravity(0, -800);
        //Animation

        if (this.skin == "spiderShoot") {
            this.animsMove = "SpiderShoot";
        }

        this.anims.play(this.animsMove);

    }

    beDestroy(proj) {
        proj.destroy();
    }

    doDamage(proj, player) {

    }


}