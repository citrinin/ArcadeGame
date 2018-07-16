import imageSource from '../utils/imagesSource';

export default class Fruit {
  constructor(gameState) {
    this.width = 0;
    this.height = 0;
    this.sprite = this.generateSptite();
    this.sprite.onload = ev => {
      this.width = ev.target.width;
      this.height = ev.target.height;
    };
    this.game = gameState;
    this.position = {
      x: Math.abs(this.width - this.game.width * Math.random()),
      y: (this.game.height / 2) * Math.random()
    };
  }
  getNextSprite() {
    return this.sprite;
  }

  get personState() {
    return {
      x: this.position.x,
      y: this.position.y
    };
  }

  set personState(newPosition) {
    this.position.x = newPosition.x;
    this.position.y = newPosition.y;
  }

  generateSptite() {
    let sprites = imageSource.fruits.map(src => {
      var img = new Image();
      img.src = src;
      return img;
    });
    let fruitNumber = Math.round(Math.random() * (sprites.length - 1));
    return sprites[fruitNumber];
  }
}
