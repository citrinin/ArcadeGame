import Enemy from './enemy';

export default class SmartEnemy extends Enemy {
  constructor(gameState) {
    super(gameState, 'rogue');
    this.range = 300;
  }
  step() {
    let heroPosition = this.game.hero.position;
    let enemyPosition = this.position;
    if (
      this.getDistanceToHero() <= this.range &&
      heroPosition.x !== enemyPosition.x
    ) {
      let atan = Math.atan(
        (heroPosition.y - enemyPosition.y) / (heroPosition.x - enemyPosition.x)
      );

      if (
        (heroPosition.x > enemyPosition.x &&
          heroPosition.y < enemyPosition.y) ||
        (heroPosition.x > enemyPosition.x && heroPosition.y > enemyPosition.y)
      ) {
        this.directionAngle = 2 * Math.PI - atan;
      } else {
        this.directionAngle = Math.PI - atan;
      }
    }
    super.step();
  }
}
