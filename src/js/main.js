var canvas = document.querySelector('canvas');

var position = {
    x: 0,
    y: 0
}

canvas.width = 800;
canvas.height = 800;

var context = canvas.getContext("2d");

var sprites = [].slice.call(document.querySelectorAll('.cat-img'));

var currentImg = 0;
function getNextSprite() {
    if (currentImg >= sprites.length) {
        currentImg = 0;
    }
    return sprites[currentImg++];
}

var sprite = document.querySelector('.cat-img');


setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(getNextSprite(), position.x, position.y, 115, 100)
}, 30);

document.addEventListener('keydown', (event) => {
    if (event.keyCode === 37) {
        position.x -= 5;
    }
    if (event.keyCode === 38) {
        position.y -= 5;
    }
    if (event.keyCode === 39) {
        position.x += 5;
    }
    if (event.keyCode === 40) {
        position.y += 5;
    }
})