import Hero from './hero';
import DummyEnemy from './dummyEnemy';
import SmartEnemy from './smartEnemy';
import FireStore from '../utils/firebase';
import Fruit from './fruit';

export default class GameState {
	constructor(elementToDraw) {
		this.gameOnScreen = false;
		this.width = window.innerWidth >= 1000 ? 1000 : window.innerWidth;

		this.height = (document.documentElement.clientHeight
			|| document.body.clientHeight) - 160;

		this.containter = elementToDraw;
		this.setUpHero();
	}

	setUpGame() {
		this.setUpCanvas();

		this.hero = new Hero(this);

		this.replayData = [];
		this.characters = new Array(2).fill(0).map(() => new DummyEnemy(this));
		this.characters.push(new SmartEnemy(this));
		this.fruits = [];

		this.level = 1;
		this.baseSpeed = 0;
		this.gamePlays = false;
		this.gameTimer = 0;

		this.timerHandler = setInterval(() => this.gameStep(), 100);
	}

	gameStep() {
		this.context.clearRect(0, 0, this.width, this.height);

		let stepData = [];
		this.drawCharacter(this.hero);

		this.characters.forEach(character => {
			this.drawCharacter(character);
			stepData.push({
				character: character,
				state: character.personState
			});
		});



		if (this.characters.some(character => this.checkCharactersIntersection(this.hero, character))) {
			this.loseGame();
		}

		this.fruits.forEach(fruit => {
			this.drawCharacter(fruit);
			stepData.push({
				character: fruit,
				state: fruit.personState
			});
		});
		this.fruits = this.fruits.filter(fruit => {
			var result = this.checkCharactersIntersection(this.hero, fruit);
			if (result) {
				this.hero.enableRage();
				return false;
			}
			return true;
		});


		stepData.push({
			character: this.hero,
			state: this.hero.personState
		});


		this.gamePlays && this.replayData.push(stepData);
	}

	drawCharacter(character) {
		this.context.drawImage(character.getNextSprite(), character.position.x, character.position.y, character.width, character.height);
	}

	checkCharactersIntersection(hero, enemy) {
		let deltaX = 20;
		let deltaY = 20;
		if (((hero.position.x + deltaX <= (enemy.position.x + enemy.width)) && ((hero.position.x + hero.width) >= enemy.position.x + deltaX)) &&
			((hero.position.y + deltaY <= (enemy.position.y + enemy.height)) && ((hero.position.y + hero.height) >= enemy.position.y + deltaY))) {
			return true;
		}
	}

	runGame() {
		this.gameTimer = new Date().getTime();
		this.gamePlays = true;
		this.baseSpeed = 5;
		this.setLevel();
	}

	loseGame() {
		this.endGame();
		let score = (new Date().getTime() - this.gameTimer) / 1000;
		let name = prompt(`Your score is ${score} seconds.\n Enter your name`, 'Batman');
		name && FireStore.saveScore({
			name, score
		});
		this.addEndGameButtons();
	}

	endGame() {
		clearInterval(this.timerHandler);
		clearInterval(this.levelTimer);
		this.gamePlays = false;
		this.baseSpeed = 0;
		this.gameOnScreen = false;
	}

	setLevel() {
		this.levelTimer = setInterval(() => {
			this.level += 1;

			this.characters.push(new DummyEnemy(this));
			if (this.level % 2 === 1) {
				this.characters.push(new SmartEnemy(this));
			}
			if (this.level >= 1) {
				this.fruits.push(new Fruit(this));
			}
			let message = document.createElement('div');
			message.classList.add('level-up');
			message.innerHTML = `Level Up! Current level - ${this.level}`;

			this.containter.appendChild(message);
			setTimeout(() => {
				this.containter.removeChild(message);
			}, 1000);
		}, 10000);
	}

	addEndGameButtons() {
		let divForButtons = document.createElement('div');
		divForButtons.classList.add('end-buttons');

		let replayButton = document.createElement('button');
		replayButton.innerHTML = 'Watch replay';
		replayButton.addEventListener('click', () => {
			window.location.hash = 'watchreplay';
		});

		let startNewGameButton = document.createElement('button');
		startNewGameButton.innerHTML = 'Start new game';
		startNewGameButton.addEventListener('click', () => {
			window.location.hash = 'newgame';
		});

		divForButtons.appendChild(replayButton);
		divForButtons.appendChild(startNewGameButton);

		this.containter.appendChild(divForButtons);
	}
	setUpHero() {
		document.addEventListener('keydown', (event) => {
			if (this.gameOnScreen) {
				switch (event.keyCode) {
					case 37: {
						this.hero.directionAngle = Math.PI;
						break;
					}
					case 38: {
						this.hero.directionAngle = Math.PI / 2;
						break;
					}
					case 39: {
						this.hero.directionAngle = 0;
						break;
					}
					case 40: {
						this.hero.directionAngle = Math.PI / 2 * 3;
						break;
					}
					default: {
						return;
					}
				}
				if (!this.gamePlays) {
					this.runGame();
				}
			}
		});
	}

	setUpCanvas() {
		this.gameOnScreen = true;
		this.canvas = document.createElement('canvas');
		this.containter.innerHTML = '';
		this.containter.appendChild(this.canvas);
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.context = this.canvas.getContext('2d');
	}

	replayGame() {
		clearInterval(this.replayTimer);
		let currentState = 0;
		this.replayTimer = setInterval(() => {
			if (currentState >= (this.replayData || []).length) {
				clearInterval(this.replayTimer);
				return;
			}
			this.context.clearRect(0, 0, this.width, this.height);

			let state = this.replayData[currentState];
			state.forEach(data => {
				data.character.personState = data.state;

				this.drawCharacter(data.character);


			});
			currentState++;
		}, 20);
	}
}
