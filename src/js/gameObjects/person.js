export default class Person {
    constructor(gameState, selector) {
        this.position = {
            x: 0,
            y: 0
        };
        this.sprites = [].slice.call(document.querySelectorAll(selector));
        this.speed = gameState.level * gameState.baseSpeed;
        this.currentImg = 0;
    }
    getNextSprite() {
        if (this.currentImg >= this.sprites.length) {
            this.currentImg = 0;
        }
        return this.sprites[this.currentImg++];
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