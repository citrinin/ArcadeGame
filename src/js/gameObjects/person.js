export default class Person {
    constructor(gameState, selector) {
        this.game = gameState;
        this.directionAngle = 2 * Math.PI * Math.random();
        this.position = {
            x: 0,
            y: 0
        };
        this.sprites = [].slice.call(document.querySelectorAll(selector));
        this.speed = gameState.level * gameState.baseSpeed;
        this.currentImg = 0;
    }
    getNextSprite() {
        this.step();
        if (this.currentImg >= this.sprites.length) {
            this.currentImg = 0;
        }
        return this.sprites[this.currentImg++];
    }
    step() {
        this.speed = this.game.baseSpeed * this.game.level;
        this.position.x += Math.cos(this.directionAngle) * this.speed;
        if (this.position.x + this.width / 2 > this.game.width) {
            this.position.x = -this.width / 2;
        }
        if (this.position.x + this.width / 2 < 0) {
            this.position.x = this.game.width - this.width / 2;
        }
        this.position.y += Math.sin(this.directionAngle) * this.speed;
        if (this.position.y + this.height / 2 > this.game.height) {
            this.position.y = -this.height / 2;
        }
        if (this.position.y + this.height / 2 < 0) {
            this.position.y = this.game.height - this.height / 2;
        }
    }
    imageOrientation() {
        return this.directionAngle >= Math.PI / 2 && this.directionAngle <= Math.PI * 3 / 2;
    }
}
