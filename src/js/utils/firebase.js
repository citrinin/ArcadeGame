let url = 'https://kate-arcade-game.firebaseio.com/.json';

export default class FireStore {
    static getScores() {
        return fetch(url + '?print=pretty').then(response => response.json()).then(result => {
            let arrayResult = [];
            for (let key in result) {
                arrayResult.push(result[key]);
            }
            return arrayResult.sort((item1, item2) => item1.score > item2.score ? -1 : item1.score < item2.score ? 1 : 0);
        });
    }
    static saveScore(infoToSave) {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(infoToSave)
        });
    }
}