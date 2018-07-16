import imageSource from '../utils/imagesSource';
export default class Person {
  constructor(gameState, selector) {
    this.width = 0;
    this.height = 0;
    this.selector = selector;
    this.getAllSprites();
    this.game = gameState;
    this.directionAngle = 2 * Math.PI * Math.random();
    this.speed = (gameState.level * gameState.baseSpeed) / 2;
    this.currentImg = 0;
  }
  selectSprites() {
    if (
      this.directionAngle >= (Math.PI * 5) / 4 &&
      this.directionAngle <= (Math.PI * 7) / 4
    ) {
      this.sprites = this.spritesCollection.down;
      return;
    }
    if (
      this.directionAngle >= Math.PI / 4 &&
      this.directionAngle <= (Math.PI * 3) / 4
    ) {
      this.sprites = this.spritesCollection.up;
      return;
    }
    if (
      this.directionAngle >= (Math.PI * 3) / 4 &&
      this.directionAngle <= (Math.PI * 5) / 4
    ) {
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

  get personState() {
    return {
      x: this.position.x,
      y: this.position.y,
      directionAngle: this.directionAngle
    };
  }

  set personState(newPosition) {
    this.directionAngle = newPosition.directionAngle;
    this.position.x = newPosition.x;
    this.position.y = newPosition.y;
  }

  getAllSprites() {
    this.spritesCollection = {
      left: this.getSprites(imageSource[this.selector].left),
      right: this.getSprites(imageSource[this.selector].right),
      up: this.getSprites(imageSource[this.selector].up),
      down: this.getSprites(imageSource[this.selector].down)
    };
    this.spritesCollection.up[0].onload = ev => {
      this.width = ev.target.width;
      this.height = ev.target.height;
    };
  }

  getSprites(images) {
    return images.map(src => {
      var img = new Image();
      img.src = src;
      return img;
    });
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
    this.speed = (this.game.baseSpeed * this.game.level) / 2;
  }
}
