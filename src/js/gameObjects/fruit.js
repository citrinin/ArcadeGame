import imageSource from '../utils/imagesSource';

export default class Fruit {
  constructor(gameState) {
    this.width = 30;
    this.height = 30;
    this.game = gameState;
    this.position = {
      x: Math.abs(this.width - this.game.width * Math.random()),
      y: (this.game.height / 2) * Math.random()
    };

    this.sprite = this.generateSptite();
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
