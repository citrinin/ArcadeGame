let url = 'https://kate-arcade-game.firebaseio.com/.json';

export default class FireStore {
  static getScores() {
    return fetch(url).then(response => response.json());
  }
  static saveScore(infoToSave) {
    this.getScores().then(scores => {
      let newScores = [...(scores || []), infoToSave];
      newScores.sort(
        (item1, item2) =>
          item1.score > item2.score ? -1 : item1.score < item2.score ? 1 : 0
      );
      newScores.splice(10);
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify(newScores)
      });
    });
  }
}
