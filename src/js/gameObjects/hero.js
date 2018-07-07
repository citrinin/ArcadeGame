import Person from './person';

export default class Hero extends Person {
    constructor(gameState) {
        super(gameState, '.cat-img');
        this.setUpHero();
        this.width = 115;
        this.height = 100;
        this.position = {
            x: (this.game.width - this.width) / 2,
            y: this.game.height - this.height
        };

    }

    setUpHero() {
        document.addEventListener('keydown', (event) => {
            if (!this.game.gamePlays) {
                this.game.runGame();
                this.speed = this.game.baseSpeed * this.game.level;
            }
            if (event.keyCode === 37) {
                this.directionAngle = Math.PI;
            }
            if (event.keyCode === 38) {
                this.directionAngle = Math.PI / 2 * 3;
            }
            if (event.keyCode === 39) {
                this.directionAngle = 0;
            }
            if (event.keyCode === 40) {
                this.directionAngle = Math.PI / 2;
            }
        });
    }
}
