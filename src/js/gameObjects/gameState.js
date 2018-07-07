import Hero from './hero';
import DummyEnemy from './dummyEnemy';

export default class GameState {
	constructor() {
		this.width = 800;
		this.height = 800;
		this.level = 1;
		this.baseSpeed = 0;
		this.canvas = document.querySelector('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		this.context = this.canvas.getContext('2d');

		this.characters = new Array(2).fill(0).map(() => new DummyEnemy(this));
		this.characters.push(new Hero(this));

		this.gamePlays = false;
		this.setUpGame();
		this.timer = 0;
	}

	setUpGame() {
		this.timer = setInterval(() => {
			this.context.clearRect(0, 0, this.width, this.height);
			this.characters.forEach(character => this.drawCharacter(character));
		}, 30);
	}

	drawCharacter(character) {
		if (character.imageOrientation()) {
			this.context.save();
			this.context.scale(-1, 1);
			this.context.drawImage(character.getNextSprite(), character.position.x * -1, character.position.y, character.width * -1, character.height);
			this.context.restore();
		} else {
			this.context.drawImage(character.getNextSprite(), character.position.x, character.position.y, character.width, character.height);
		}
	}

	runGame() {
		this.gamePlays = true;
		this.baseSpeed = 5;
	}
	pauseGame() {
		this.gamePlays = false;
		this.baseSpeed = 0;
		clearInterval(this.timer);
	}
}
