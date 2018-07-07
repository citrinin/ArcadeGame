import Hero from './hero';
import DummyEnemy from './dummyEnemy';
import FireStore from '../utils/firebase';

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
		this.hero = new Hero(this);

		this.gamePlays = false;
		this.timerHandler = 0;
		this.gameTimer = 0;
		this.setUpGame();
	}

	setUpGame() {
		this.timerHandler = setInterval(() => {
			this.context.clearRect(0, 0, this.width, this.height);

			this.characters.forEach(character => this.checkCharactersIntersection(this.hero, character));

			this.drawCharacter(this.hero);
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
		this.gameTimer = new Date().getTime();
		this.gamePlays = true;
		this.baseSpeed = 5;
	}

	endGame() {
		clearInterval(this.timerHandler);
		this.gamePlays = false;
		this.baseSpeed = 0;
		let score = (new Date().getTime() - this.gameTimer) / 1000;
		let name = prompt(`Your score is ${score} secongs.\n Enter your name`, 'Ninja');
		name && FireStore.saveScore({
			name, score
		});
	}
	checkCharactersIntersection(hero, enemy) {
		let deltaX = 30;
		let deltaY = 5;
		if (((hero.position.x + deltaX <= (enemy.position.x + enemy.width)) && ((hero.position.x + hero.width) >= enemy.position.x + deltaX)) &&
			((hero.position.y + deltaY <= (enemy.position.y + enemy.height)) && ((hero.position.y + hero.height) >= enemy.position.y + deltaY))) {
			hero.die();
			this.endGame();
		}
	}
}
