import { Entity } from "./Entity.js";
export class Hat extends Entity {
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