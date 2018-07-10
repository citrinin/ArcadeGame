import detectMobile from './detectMobile';

export default function addButtonsForMobile() {
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
