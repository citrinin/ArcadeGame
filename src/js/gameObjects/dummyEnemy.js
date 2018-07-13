import Enemy from './enemy';

export default class DummyEnemy extends Enemy {
    constructor(gameState) {
        super(gameState, 'goblin');
        this.width = 36;
        this.height = 48;
    }
}