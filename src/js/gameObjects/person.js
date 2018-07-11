export default class Person {
    constructor(gameState, selector) {
        this.selector = selector;
        this.getAllSprites();
        this.game = gameState;
        this.directionAngle = 2 * Math.PI * Math.random();
        this.speed = gameState.level * gameState.baseSpeed / 2;
        this.currentImg = 0;
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

    get directionAngle() {
        return this._directionAngle;
    }

    set directionAngle(newValue) {
        this._directionAngle = newValue;
        this.selectSprites();
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
    getNextSprite() {
        this.step();
        if (this.currentImg >= this.sprites.length) {
            this.currentImg = 0;
        }
        return this.sprites[this.currentImg++];
    }

    step() {
        this.getSpeed();
        this.position.x += Math.cos(this.directionAngle) * this.speed;
        if (this.position.x + this.width / 2 > this.game.width) {
            this.position.x = -this.width / 2;
        }
        if (this.position.x + this.width / 2 < 0) {
            this.position.x = this.game.width - this.width / 2;
        }
        this.position.y -= Math.sin(this.directionAngle) * this.speed;
        if (this.position.y + this.height / 2 > this.game.height) {
            this.position.y = -this.height / 2;
        }
        if (this.position.y + this.height / 2 < 0) {
            this.position.y = this.game.height - this.height / 2;
        }
    }
    getSpeed() {
        this.speed = this.game.baseSpeed * this.game.level / 2;
    }
}
