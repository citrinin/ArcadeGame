import Person from './person';

export default class DummyEnemy extends Person {
    constructor(gameState, settings = {}) {
        super(gameState);
        this.width = 36;
        this.height = 48;
        this.getSprites();
        this.generatePosition();
        //запоминаем позицию и время появления врага
        if (this.game.originalGame) {
            this.game.replayData.dummyEnemies.push({
                settings: {
                    position: this.position,
                    directionAngle: this.directionAngle
                },
                time: this.game.gameTimer - new Date().getTime()
            });
        } else {
            this.position = settings.position;
            this.directionAngle = settings.directionAngle;
        }
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
    getSprites() {
        this.sprites = [].slice.call(document.querySelectorAll('.goblin-img'));
    }
}