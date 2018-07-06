export default class Person {
    constructor(gameState, selector, mainHero) {
        this.mainHero = mainHero;
        this.game = gameState;
        this.directionAngle = this.mainHero ? 0 : 2 * Math.PI * Math.random();
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
        this.position.x += Math.cos(this.directionAngle) * this.speed;
        if (this.position.x > this.game.width) {
            this.position.x = 0;
        }
        if (this.position.x < 0) {
            this.position.x = this.game.width;
        }
        this.position.y += Math.sin(this.directionAngle) * this.speed;
        if (this.position.y > this.game.height) {
            this.position.y = 0;
        }
        if (this.position.y < 0) {
            this.position.y = this.game.height;
        }
    }
}

// class DummyEnemy extends Person {
//     constructor(gameState) {
//         super(gameState);
//         sprites = [].slice.call(document.querySelectorAll('.ninja-img'));
//     }
//     step(){
//         this.position
//     }
// }