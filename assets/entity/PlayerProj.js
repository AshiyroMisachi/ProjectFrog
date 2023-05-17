//import eventsCenter from "./EventsCenter.js"
export class PlayerProj extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, skin, damage) {
        super(scene, x, y, skin);
        this.skin = skin;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.damage = damage;

        this.init();
    }

    init() {
        //Variable

        //Parametre

        //Animation
        if (this.skin == "berryShoot") {
            this.setGravity(0, -600);
            this.animsMove = "berryProj";
        }
        else if (this.skin == "fire"){
            this.setGravity(0, -800);
            this.animsMove = "fireProj";
        }
        this.anims.play(this.animsMove);

    }

    beDestroy(proj){
        proj.destroy();
    }

    doDamage(proj, mob){
        console.log(proj.damage)
        mob.health -= proj.damage;
        mob.getHit = true;
        mob.setTint(0xff0000)
        if (mob.health <= 0){
            mob.destroy();
            this.events.off(Phaser.Scenes.Events.UPDATE, mob.update, mob);
        }
        else if (proj.body.touching.right){
            mob.body.setVelocity(200, -60);
        }
        else if (proj.body.touching.left){
            mob.body.setVelocity(-200, -60);
        }
        else if (proj.body.touching.up){
            mob.body.setVelocity(-60, -200);
        }
        else if (proj.body.touching.down){
            mob.body.setVelocity(60, 200);
        }
        proj.destroy()
        this.time.delayedCall(200, (mob)=>{ mob.getHit = false; mob.setTint() }, [mob], this);
    }

    breakFire(proj, obs){
        proj.destroy()
        obs.destroy()
    }

}