export class MobAgressif extends Phaser.Physics.Arcade.Sprite {
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
        this.target = null;
        this.spawnX = this.x;
        this.spawnY = this.y;
        this.inAgro = false;
        this.inZone = true;
        this.goBack = false;

        //Parametre
        this.setGravity(0, -800);

        //Animation
        if (this.skin == "mobGuepe") {
            this.animsPassif = "guepe_passif";
            this.animsAgro = "guepe_agro";
        }
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
        //In Agro
        if (Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) < 500 && this.goBack == false) {
            this.inAgro = true;
            this.anims.play(this.animsAgro);
            this.scene.physics.moveToObject(this, this.target, 300);
        }
        else if (this.inAgro) {
            this.inAgro = false;
            this.anims.play(this.animsPassif);
        }

        //In Zone
        if (Phaser.Math.Distance.Between(this.target.x, this.target.y, this.spawnX, this.spawnY) < 1000){
            this.inZone = true;
        }
        else if (this.inZone){
            this.inZone = false;
        }

        //Go back
        if ((this.inZone == false || this.inAgro == false) && this.goBack == false){
            this.goBack = true;
            this.scene.time.delayedCall(2000, ()=>{this.goBack = false}, [], this);
            this.scene.physics.moveTo(this, this.spawnX, this.spawnY, 500, 2000);
        }
    }

    getPlayer(target) {
        this.target = target;
    }
}