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
        this.rageMode = false;
        this.sprites = this.spritesCollection.down;
        this.directionAngle = Math.PI / 2;
    }


    getSpeed() {
        this.speed = this.game.baseSpeed * this.game.level;
    }
    enableRage() {
        this.spritesCollection = this.furySpritesCollection;
        this.selectSprites();
        this.rageMode = true;
        this.width = 75;
        setTimeout(() => {
            this.spritesCollection = this.normalSpritesColletcion;
            this.selectSprites();
            this.rageMode = false;
            this.width = 55;
        }, 5000);
    }

    get personState() {
        return {
            x: this.position.x,
            y: this.position.y,
            directionAngle: this.directionAngle,
            rageMode: this.rageMode
        };
    }

    set personState(newPosition) {
        this.directionAngle = newPosition.directionAngle;
        this.position.x = newPosition.x;
        this.position.y = newPosition.y;
        if (this.rageMode !== newPosition.rageMode) {
            this.rageMode = newPosition.rageMode;
            this.spritesCollection = this.rageMode ? this.furySpritesCollection : this.normalSpritesColletcion;
            this.selectSprites();
        }
    }

    getAllSprites() {
        super.getAllSprites();
        this.normalSpritesColletcion = this.spritesCollection;
        var selector = 'knight-kills';
        this.furySpritesCollection = {
            left: this.getSprites(`.${selector}-left-img`),
            right: this.getSprites(`.${selector}-right-img`),
            up: this.getSprites(`.${selector}-up-img`),
            down: this.getSprites(`.${selector}-down-img`)
        };
    }


}
