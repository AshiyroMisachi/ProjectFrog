import eventsCenter from "./script.js"

///UI///
export class UiScene extends Phaser.Scene
{
	constructor()
	{
		super('ui-scene')
	}

	create()
	{
		this.label = this.add.text(10, 10, 'Count: 0', {
			fontSize: 32
		})

        eventsCenter.on('update-count', this.updateCount, this);
	}

	updateCount(count)
	{
		this.label.text = `Count: ${count}`
	}
}