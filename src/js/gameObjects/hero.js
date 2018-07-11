import Person from './person';

export default class Hero extends Person {
    constructor(gameState) {
        super(gameState, 'knight');
        this.width = 55;
        this.height = 75;
        this.position = {
            x: (this.game.width - this.width) / 2,
            y: this.game.height - this.height
        };

        this.sprites = this.spritesCollection.down;
        this.directionAngle = Math.PI / 2;
    }


    getSpeed() {
        this.speed = this.game.baseSpeed * this.game.level;
    }
}
