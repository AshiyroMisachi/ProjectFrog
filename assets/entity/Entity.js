export class Entity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
    }

    //Gestion Prise de damage
    getDestroy() {
        this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
        this.destroy();
    }

    canBeHit(entity) {
        if (entity.getHit == true) {
            return false;
        }
        else {
            return true;
        }
    }

    loseHp(damage) {
        this.setTint(0xff0000)
        this.scene.time.delayedCall(200, ()=>{ this.setTint() }, [], this);
        this.health -= damage
        if (this.health <= 0) {
            this.getDestroy();
        }
    }

    //Gestion prise info
    getSpawn() {
        this.spawnX = this.x
        this.spawnY = this.y
    }

    getPlayer(target) {
        this.target = target;
    }
}