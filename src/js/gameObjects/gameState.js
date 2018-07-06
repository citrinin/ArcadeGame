import Hero from './hero';

export default class GameState {
	constructor() {
		this.width = 800;
		this.height = 800;
		this.level = 1;
		this.baseSpeed = 5;
		this.canvas = document.querySelector('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		this.context = this.canvas.getContext('2d');

		this.hero = new Hero(this);
		this.gamePlays = false;
		this.runGame();
		this.timer = 0;
	}

	runGame() {
		this.gamePlays = true;
		this.timer = setInterval(() => {
			this.context.clearRect(0, 0, this.width, this.height);
			this.context.drawImage(this.hero.getNextSprite(), this.hero.position.x, this.hero.position.y, 115, 100);
		}, 30);
	}
	pauseGame() {
		this.gamePlays = false;
		clearInterval(this.timer);
	}
}
