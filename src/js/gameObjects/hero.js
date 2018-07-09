import Person from './person';

export default class Hero extends Person {
    constructor(gameState) {
        super(gameState, '.cat-img');
        this.setUpHero();
        this.width = 85;
        this.height = 75;
        this.position = {
            x: (this.game.width - this.width) / 2,
            y: this.game.height - this.height
        };

    }

    setUpHero() {
        document.addEventListener('keydown', (event) => {
            if (event.keyCode < 37 || event.keyCode > 40) {
                return;
            }
            if (!this.game.gamePlays) {
                this.game.runGame();
                this.speed = this.game.baseSpeed * this.game.level * 10;
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
    step() {
        this.speed = this.game.baseSpeed * this.game.level / 2;
        this.position.x += Math.cos(this.directionAngle) * this.speed;
        if (this.position.x + this.width / 2 > this.game.width) {
            this.position.x = -this.width / 2;
        }
        if (this.position.x + this.width / 2 < 0) {
            this.position.x = this.game.width - this.width / 2;
        }
        this.position.y += Math.sin(this.directionAngle) * this.speed;
        if (this.position.y + this.height / 2 > this.game.height) {
            this.position.y = -this.height / 2;
        }
        if (this.position.y + this.height / 2 < 0) {
            this.position.y = this.game.height - this.height / 2;
        }
    }
    die() {
        this.sprites = [].slice.call(document.querySelectorAll('.cat-dead-img'));
    }
}
