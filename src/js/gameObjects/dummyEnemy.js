import Person from './person';

export default class DummyEnemy extends Person {
    constructor(gameState) {
        super(gameState, '.dummy-enemy-img');
        this.width = 75;
        this.height = 95;
        this.position = {
            x: Math.abs(this.width - this.game.width * Math.random()),
            y: this.game.height / 2 * Math.random()
        };
    }
    step() {
        this.speed = this.game.baseSpeed * this.game.level / 2;
        this.position.x += Math.cos(this.directionAngle) * this.speed;
        if (this.position.x + this.width / 2 > this.game.width) {
            this.directionAngle -= Math.PI;
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
}