import {eventsCenter} from "./script.js"

///UI///
export class UiScene extends Phaser.Scene
{
	constructor()
	{
		super({
            key: 'ui-scene',
            physics: {
            default: 'arcade',
            arcade: { 
            gravity: { y: 0 }
            }}
        });
	}

	create()
	{
		this.cadre = this.physics.add.sprite(100, 100, "cadreHat").setScale(4);
		this.anims.create({
			key: 'empty',
			frames: [{ key: 'cadreHat', frame: 0 }],
			frameRate: 20
		});
		this.anims.create({
			key: 'grab',
			frames: [{ key: 'cadreHat', frame: 1 }],
			frameRate: 20
		});
		this.anims.create({
			key: 'grow',
			frames: [{ key: 'cadreHat', frame: 2 }],
			frameRate: 20
		});
		this.anims.create({
			key: 'fire',
			frames: [{ key: 'cadreHat', frame: 3 }],
			frameRate: 20
		});
		this.cadre.anims.play('empty');

		this.currentHat = "empty";

        eventsCenter.on('update-count', this.switchHat, this);
	}

	switchHat() {

	}
}