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

}