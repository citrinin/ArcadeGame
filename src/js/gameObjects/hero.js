import SmartPerson from './smartPerson';

export default class Hero extends SmartPerson {
    constructor(gameState) {
        super(gameState, 'knight');
        if (this.game.originalGame) {
            this.setUpHero();
        }
        this.width = 55;
        this.height = 75;
        this.position = {
            x: (this.game.width - this.width) / 2,
            y: this.game.height - this.height
        };

        this.sprites = this.spritesCollection.down;
        this.directionAngle = Math.PI / 2;
    }

    setUpHero() {
        document.addEventListener('keydown', (event) => {
            switch (event.keyCode) {
                case 37: {
                    this.directionAngle = Math.PI;
                    break;
                }
                case 38: {
                    this.directionAngle = Math.PI / 2;
                    break;
                }
                case 39: {
                    this.directionAngle = 0;
                    break;
                }
                case 40: {
                    this.directionAngle = Math.PI / 2 * 3;
                    break;
                }
                default: {
                    return;
                }
            }
            if (!this.game.gamePlays) {
                this.game.runGame();
            }
            //запоминаем движения героя
            if (this.game.originalGame) {
                this.game.replayData.heroMoves.push({ directionAngle: this.directionAngle, time: new Date().getTime() - this.game.gameTimer });
            }
            this.selectSprites();
        });
    }
    getSpeed() {
        this.speed = this.game.baseSpeed * this.game.level;
    }
    die() {
        //?   this.sprites = [].slice.call(document.querySelectorAll('.cat-dead-img'));
    }
}
