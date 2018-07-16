import Person from './person';
import imageSource from '../utils/imagesSource';

export default class Hero extends Person {
  constructor(gameState) {
    super(gameState, 'knight');

    this.position = {
      x: (this.game.width - 50) / 2,
      y: this.game.height - 100
    };
    this.rageMode = false;
    this.sprites = this.spritesCollection.down;
    this.directionAngle = Math.PI / 2;
  }

  getSpeed() {
    this.speed = this.game.baseSpeed * this.game.level;
  }
  enableRage() {
    this.rageMode = true;
    this.selectSpritesCollection();
    this.game.canvas.classList.add('rage-canvas');
    setTimeout(() => this.game.canvas.classList.remove('rage-canvas'), 3000);
    setTimeout(() => {
      this.rageMode = false;
      this.selectSpritesCollection();
    }, 3500);
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
      this.spritesCollection = this.rageMode
        ? this.furySpritesCollection
        : this.normalSpritesColletcion;
      this.selectSprites();
    }
  }

  selectSpritesCollection() {
    if (this.rageMode === true) {
      this.spritesCollection = this.furySpritesCollection;
    } else {
      this.spritesCollection = this.normalSpritesColletcion;
    }
    this.width = this.spritesCollection.up[0].width;
    this.selectSprites();
  }

  getAllSprites() {
    this.normalSpritesColletcion = {
      left: this.getSprites(imageSource[this.selector].normal.left),
      right: this.getSprites(imageSource[this.selector].normal.right),
      up: this.getSprites(imageSource[this.selector].normal.up),
      down: this.getSprites(imageSource[this.selector].normal.down)
    };
    this.spritesCollection = this.normalSpritesColletcion;
    this.furySpritesCollection = {
      left: this.getSprites(imageSource[this.selector].rage.left),
      right: this.getSprites(imageSource[this.selector].rage.right),
      up: this.getSprites(imageSource[this.selector].rage.up),
      down: this.getSprites(imageSource[this.selector].rage.down)
    };
    this.spritesCollection.up[0].onload = ev => {
      this.width = ev.target.width;
      this.height = ev.target.height;
    };
  }
}
