import Person from './person';

export default class SmartPerson extends Person {
    constructor(gameState, selector) {
        super(gameState);
        this.selector = selector;
        this.getAllSprites();
    }
    selectSprites() {
        if ((this.directionAngle >= Math.PI * 5 / 4) && (this.directionAngle <= Math.PI * 7 / 4)) {
            this.sprites = this.spritesCollection.down;
            return;
        }
        if ((this.directionAngle >= Math.PI / 4) && (this.directionAngle <= Math.PI * 3 / 4)) {
            this.sprites = this.spritesCollection.up;
            return;
        }
        if ((this.directionAngle >= Math.PI * 3 / 4) && (this.directionAngle <= Math.PI * 5 / 4)) {
            this.sprites = this.spritesCollection.left;
            return;
        }
        this.sprites = this.spritesCollection.right;
    }

    getAllSprites() {
        this.spritesCollection = {
            left: this.getSprites(`.${this.selector}-left-img`),
            right: this.getSprites(`.${this.selector}-right-img`),
            up: this.getSprites(`.${this.selector}-up-img`),
            down: this.getSprites(`.${this.selector}-down-img`)
        };
    }

    getSprites(selector) {
        return [].slice.call(document.querySelectorAll(selector));
    }
}
