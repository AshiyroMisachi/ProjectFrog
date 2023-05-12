//import eventsCenter from "./EventsCenter.js"
export class Hat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init();
    }

    init() {
        this.type = null;
        this.setGravity(0, -800);
    }

}