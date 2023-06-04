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
		this.scene.bringToTop()
		//Gestion Cadre Hat
		this.cadre = this.physics.add.sprite(110, 100, "cadreHat").setScale(4);
		this.cadre.anims.play('empty');
        eventsCenter.on('switchHat', this.switchHat, this);

		//Gestion Barre de Vie
		this.healthBar = this.physics.add.sprite(480, 60, "healthBar").setScale(1.5);
		this.healthBar.anims.play("5");
		eventsCenter.on('updateHealth', this.updateHealth, this);
	}

	switchHat(currentHat) {
		if (currentHat == 0){
			this.cadre.anims.play('empty');
		}
		else if (currentHat == 1){
			this.cadre.anims.play('grab');
		}
		else if (currentHat == 2){
			this.cadre.anims.play('grow');
		}
		else if (currentHat == 3){
			this.cadre.anims.play('fire');
		}
	}

	updateHealth(currentHealth){
		if (currentHealth == 5){
			this.healthBar.anims.play("5");
		}
		else if (currentHealth == 4){
			this.healthBar.anims.play("4");
		}
		else if (currentHealth == 3){
			this.healthBar.anims.play("3");
		}
		else if (currentHealth == 2){
			this.healthBar.anims.play("2");
		}
		else if (currentHealth == 1){
			this.healthBar.anims.play("1");
		}
		else if (currentHealth == 0){
			this.healthBar.anims.play("0");
		}
	}
}