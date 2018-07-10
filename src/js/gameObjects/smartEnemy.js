import Person from './person';

export default class SmartEnemy extends Person {
    constructor(gameState) {
        super(gameState, '.smart-enemy-img');
        this.range = 400;
        this.width = 75;
        this.height = 95;
        this.position = {
            x: Math.abs(this.width - this.game.width * Math.random()),
            y: this.game.height / 2 * Math.random()
        };
    }
    step() {
        let heroPosition = this.game.hero.position;
        let enemyPosition = this.position;
        if (this.getDistanceToHero() <= this.range && (heroPosition.x !== enemyPosition.x)) {
            let atan = Math.atan((heroPosition.y - enemyPosition.y) / (heroPosition.x - enemyPosition.x));
            if (((heroPosition.x > enemyPosition.x) && (heroPosition.y < enemyPosition.y)) ||
                ((heroPosition.x - enemyPosition.x > 0) && (heroPosition.y - enemyPosition.y > 0))) {
                this.directionAngle = atan; //ok
            } else {
                this.directionAngle = Math.PI + atan; //ok
            }
        }
        super.step();
    }


    getDistanceToHero() {
        let hero = this.game.hero;
        return Math.sqrt(Math.pow(hero.position.x - this.position.x, 2) + Math.pow(hero.position.y - this.position.y, 2));
    }
}