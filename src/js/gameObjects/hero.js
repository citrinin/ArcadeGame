import Person from './person';

export default class Hero extends Person {
    constructor(gameState) {
        super(gameState, '.cat-img');
        this.setUpHero();

    }

    getPosition() {

    }

    setUpHero() {
        document.addEventListener('keydown', (event) => {
            if (event.keyCode === 37) {
                this.position.x -= 5;
            }
            if (event.keyCode === 38) {
                this.position.y -= 5;
            }
            if (event.keyCode === 39) {
                this.position.x += 5;
            }
            if (event.keyCode === 40) {
                this.position.y += 5;
            }
        });
    }
}
