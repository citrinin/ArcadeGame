import Hero from './hero';
import DummyEnemy from './dummyEnemy';
import SmartEnemy from './smartEnemy';
import FireStore from '../utils/firebase';

export default class GameState {
	constructor(elementToDraw) {
		this.gameOnScreen = false;
		this.width = window.innerWidth >= 1000 ? 1000 : window.innerWidth;

		this.height = (document.documentElement.clientHeight
			|| document.body.clientHeight) - 160;

		this.containter = elementToDraw;
		this.setUpHero();
	}

	setUpGame(originalGame = true) {
		this.gameOnScreen = true;
		this.originalGame = originalGame;
		this.canvas = document.createElement('canvas');
		this.containter.innerHTML = '';
		this.containter.appendChild(this.canvas);
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.context = this.canvas.getContext('2d');


		this.hero = new Hero(this);

		this.characters = [];

		//идет оригинальная игра?
		if (this.originalGame) {
			this.replayData = {
				heroMoves: [],
				smartEmenies: [],
				dummyEnemies: []
			};
			this.characters = new Array(2).fill(0).map(() => new DummyEnemy(this));
			this.characters.push(new SmartEnemy(this));
		} else {
			console.log(this.replayData);
			this.replayData.heroMoves.forEach(heroInfo => {
				setTimeout(() => {
					this.hero.directionAngle = heroInfo.directionAngle;
				}, heroInfo.time);
			});
			this.replayData.smartEmenies.forEach(enemyInfo => {
				setTimeout(() => {
					this.characters.push(new SmartEnemy(this, enemyInfo.settings));
					console.log('smart enemy time ' + (new Date().getTime() - window.timer));
				}, enemyInfo.time);
			});
			this.replayData.dummyEnemies.forEach(enemyInfo => {
				setTimeout(() => {
					this.characters.push(new DummyEnemy(this, enemyInfo.settings));
					console.log('dummy enemy time ' + (new Date().getTime() - window.timer));

				}, enemyInfo.time);

			});
		}

		this.level = 1;
		this.baseSpeed = 0;
		this.gamePlays = false;
		this.gameTimer = 0;

		this.timerHandler = setInterval(() => {
			this.context.clearRect(0, 0, this.width, this.height);


			this.drawCharacter(this.hero);
			this.characters.forEach(character => this.drawCharacter(character));

			this.characters.forEach(character => this.checkCharactersIntersection(this.hero, character));
		}, 100);
	}

	drawCharacter(character) {
		this.context.drawImage(character.getNextSprite(), character.position.x, character.position.y, character.width, character.height);
	}

	runGame() {
		if (this.originalGame) {
			this.gameTimer = new Date().getTime();
		}
		window.timer = new Date().getTime();
		this.gamePlays = true;
		this.baseSpeed = 5;
		this.setLevel();
	}

	checkCharactersIntersection(hero, enemy) {
		let deltaX = 20;
		let deltaY = 20;
		if (((hero.position.x + deltaX <= (enemy.position.x + enemy.width)) && ((hero.position.x + hero.width) >= enemy.position.x + deltaX)) &&
			((hero.position.y + deltaY <= (enemy.position.y + enemy.height)) && ((hero.position.y + hero.height) >= enemy.position.y + deltaY))) {
			this.loseGame();
		}
	}

	loseGame() {
		this.endGame();
		if (this.originalGame) {
			let score = (new Date().getTime() - this.gameTimer) / 1000;
			let name = prompt(`Your score is ${score} seconds.\n Enter your name`, 'Ninja');
			name && FireStore.saveScore({
				name, score
			});
		}
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
			if (this.originalGame) {
				this.characters.push(new DummyEnemy(this));
				if (this.level % 2 == 1) {
					this.characters.push(new SmartEnemy(this));
				}
				let message = document.createElement('div');
				message.classList.add('level-up');
				message.innerHTML = `Level Up! Current level - ${this.level}`;

				this.containter.appendChild(message);
				setTimeout(() => {
					this.containter.removeChild(message);
				}, 1000);
			}

		}, 10000);
	}
	addEndGameButtons() {
		let divForButtons = document.createElement('div');
		divForButtons.classList.add('end-buttons');

		let replayButton = document.createElement('button');
		replayButton.innerHTML = `Watch replay ${this.originalGame ? '' : 'again'}`;
		replayButton.addEventListener('click', () => {
			this.setUpGame(false);
			this.runGame();
		});

		let startNewGameButton = document.createElement('button');
		startNewGameButton.innerHTML = 'Start new game';
		startNewGameButton.addEventListener('click', () => {
			this.setUpGame();
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
				//запоминаем движения героя
				if (this.originalGame) {
					this.replayData.heroMoves.push({ directionAngle: this.hero.directionAngle, time: this.gameTimer ? new Date().getTime() - this.gameTimer : 0 });
				}
			}
		});
	}
}
