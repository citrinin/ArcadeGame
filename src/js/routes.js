import GameState from './gameObjects/gameState';
import detectMobile from './utils/detectMobile';

let content = document.querySelector('.content');
addButtonsForMobile();

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
            content.innerHTML = '<h1 class="about"><span>Super game Cat vs Ninjas</span><h1>';
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

function addButtonsForMobile() {
    if (detectMobile()) {

        var divForButtons = document.createElement('div');
        divForButtons.classList.add('buttons');

        var buttonLeft = document.createElement('button');
        buttonLeft.innerHTML = '<';
        buttonLeft.classList.add('left');

        var buttonUp = document.createElement('button');
        buttonUp.innerHTML = '^';
        buttonUp.classList.add('up');

        var buttonRight = document.createElement('button');
        buttonRight.innerHTML = '>';
        buttonRight.classList.add('right');

        var buttonDown = document.createElement('button');
        buttonDown.innerHTML = 'v';
        buttonDown.classList.add('down');



        divForButtons.appendChild(buttonLeft);
        divForButtons.appendChild(buttonUp);
        divForButtons.appendChild(buttonRight);
        divForButtons.appendChild(buttonDown);

        divForButtons.addEventListener('click', (event) => {
            if (event.target.matches('.right')) {
                let e = new Event('keydown');
                e.keyCode = 39;
                document.dispatchEvent(e);
                return;
            }
            if (event.target.matches('.left')) {
                let e = new Event('keydown');
                e.keyCode = 37;
                document.dispatchEvent(e);
                return;
            }
            if (event.target.matches('.up')) {
                let e = new Event('keydown');
                e.keyCode = 38;
                document.dispatchEvent(e);
                return;
            }
            if (event.target.matches('.down')) {
                let e = new Event('keydown');
                e.keyCode = 40;
                document.dispatchEvent(e);
                return;
            }
        });

        document.body.appendChild(divForButtons);
    }
}

export default routes;
