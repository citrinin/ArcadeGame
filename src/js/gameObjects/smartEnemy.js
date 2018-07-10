import SmartPerson from './smartPerson';

export default class SmartEnemy extends SmartPerson {
    constructor(gameState) {
        super(gameState, 'rogue');
        this.selectSprites();
        this.range = 300;
        this.width = 60;
        this.height = 60;
        this.generatePosition();
    }
    step() {
        let heroPosition = this.game.hero.position;
        let enemyPosition = this.position;
        if (this.getDistanceToHero() <= this.range && (heroPosition.x !== enemyPosition.x)) {
            let atan = Math.atan((heroPosition.y - enemyPosition.y) / (heroPosition.x - enemyPosition.x));
            if (((heroPosition.x > enemyPosition.x) && (heroPosition.y < enemyPosition.y)) ||
                ((heroPosition.x - enemyPosition.x > 0) && (heroPosition.y - enemyPosition.y > 0))) {
                this.directionAngle = atan + Math.PI; //ok
            } else {
                this.directionAngle = atan; //ok
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