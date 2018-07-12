import Person from './person';

export default class SmartEnemy extends Person {
    constructor(gameState) {
        super(gameState, 'rogue');
        this.range = 300;
        this.width = 40;
        this.height = 45;

        this.generatePosition();


    }
    step() {
        let heroPosition = this.game.hero.position;
        let enemyPosition = this.position;
        if (this.getDistanceToHero() <= this.range && (heroPosition.x !== enemyPosition.x)) {
            let atan = Math.atan((heroPosition.y - enemyPosition.y) / (heroPosition.x - enemyPosition.x));

            if (((heroPosition.x > enemyPosition.x) && (heroPosition.y < enemyPosition.y)) ||
                ((heroPosition.x > enemyPosition.x) && (heroPosition.y > enemyPosition.y))) {
                this.directionAngle = 2 * Math.PI - atan;
            } else {
                this.directionAngle = Math.PI - atan;
            }
        }
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