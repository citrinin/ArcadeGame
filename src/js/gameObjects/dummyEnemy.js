import Person from './person';

export default class DummyEnemy extends Person {
    constructor(gameState, settings = {}) {
        super(gameState, 'goblin');
        this.width = 36;
        this.height = 48;
        //запоминаем позицию и время появления врага
        if (this.game.originalGame) {
            this.generatePosition();
            this.game.replayData.dummyEnemies.push({
                settings: {
                    position: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    directionAngle: this.directionAngle
                },
                time: this.game.gameTimer ? new Date().getTime() - this.game.gameTimer : 0
            });
        } else {
            this.position = {
                x: settings.position.x,
                y: settings.position.y
            };
            this.directionAngle = settings.directionAngle;
        }
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