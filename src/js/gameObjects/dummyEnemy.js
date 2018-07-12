import Person from './person';

export default class DummyEnemy extends Person {
    constructor(gameState) {
        super(gameState, 'goblin');
        this.width = 36;
        this.height = 48;

        this.generatePosition();


    }
    step() {
        super.step();
    }

    generatePosition() {
        do {
            this.position = {
                x: Math.abs(this.width - this.game.width * Math.random()),
                y: this.game.height / 2 * Math.random()
            };
        } while (this.getDistanceToHero() < 200);
    }
    getDistanceToHero() {
        let hero = this.game.hero;
        return Math.sqrt(Math.pow(hero.position.x - this.position.x, 2) + Math.pow(hero.position.y - this.position.y, 2));
    }

}