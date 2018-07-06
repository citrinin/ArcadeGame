import GameState from './gameObjects/gameState';

let content = document.querySelector('.content');

const routes = [
    {
        match: '',
        onEnter: () => {
            window.location.hash = 'game';
        }
    },
    {
        match: 'about',
        onEnter: () => {
            changeActivePage('about');
            content.innerHTML = '<h1 class="about"><span>Super game Cats vs Ninjas</span><h1>';
        }
    },
    {
        match: 'game',
        onEnter: () => {
            changeActivePage('game');
            let canvas = document.createElement('canvas');
            content.innerHTML = '';
            content.appendChild(canvas);
            new GameState();
        }
    },
    {
        match: 'scores',
        onEnter: () => {
            changeActivePage('scores');
            content.innerHTML = '<h1 class="about"><span>Scores</span><h1>';
        }
    },
];

function changeActivePage(newPage) {
    document.querySelector('.active').className = '';
    document.querySelector(`[href="#${newPage}"]`).parentElement.className = 'active';
}

export default routes;