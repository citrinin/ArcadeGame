import Person from './person';

export default class DummyEnemy extends Person {
    constructor(gameState) {
        super(gameState, '.dummy-enemy-img');
        this.width = 100;
        this.height = 126;
        this.position = {
            x: Math.abs(this.width - this.game.width * Math.random()),
            y: this.game.height / 2 * Math.random()
        };
    }
}