export default class Person {
    constructor(gameState, selector) {
        this.game = gameState;
        this.directionAngle = 2 * Math.PI * Math.random();
        this.position = {
            x: 0,
            y: 0
        };
        this.sprites = [].slice.call(document.querySelectorAll(selector));
        this.speed = gameState.level * gameState.baseSpeed / 2;
        this.currentImg = 0;
    }
    getNextSprite() {
        this.step();
        if (this.currentImg >= this.sprites.length) {
            this.currentImg = 0;
        }
        return this.sprites[this.currentImg++];
    }

    imageOrientation() {
        return this.directionAngle >= Math.PI / 2 && this.directionAngle <= Math.PI * 3 / 2;
    }
}
