import Hero from './hero';

export default class GameState {
	constructor() {
		this.level = 1;
		this.baseSpeed = 20;
		this.canvas = document.querySelector('canvas');
		this.canvas.width = 800;
		this.canvas.height = 800;

		this.context = this.canvas.getContext('2d');

		this.hero = new Hero(this);
		this.runGame();
	}

	runGame() {
		setInterval(() => {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.context.drawImage(this.hero.getNextSprite(), this.hero.position.x, this.hero.position.y, 115, 100);
		}, 30);
	}
}
