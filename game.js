let posX = 0;
let inc = 1;
let birdY = 20;

let velocity = 0;
let gravity = 0.1;

let T = 0;
const playerAnimation = [0, 1, 2];

function _update() {
    T += 1;
}

function _draw() {
    cls(12);
    animateBird();

    fall();
    flap();
    print("hello world!", 40, 60); 
}

function animateBird() {
    const sp = Math.floor(T / 6) % playerAnimation.length;
    spr(playerAnimation[sp], 20, birdY);
}

function flap() {
    if (btnp(2)) {
        velocity = -2;
    }
}
function fall() {
    velocity += gravity;
    birdY += velocity;

    if (birdY >= 121) {
        birdY = 121;
        velocity = 0;
    }
}

// Sprites

const sprites = {
    0: [
        [],
        [,,,9,7,7,7,],
        [,9,9,9,7,7,5],
        [7,7,7,9,9,7,7,],
        [7,7,7,7,9,8,8,8],
        [7,7,7,7,9,9,9,],
        [,7,7,9,9,9,,],
        []
    ],
    1: [
        [],
        [,,,9,7,7,7,],
        [,9,9,9,7,7,5],
        [9,9,9,9,9,7,7,],
        [7,7,7,7,9,8,8,8],
        [7,7,7,7,9,9,9,],
        [,9,9,9,9,9,,],
        []
    ],
    2: [
        [],
        [,,,9,7,7,7,],
        [,9,9,9,7,7,5],
        [9,9,9,9,9,7,7,],
        [9,7,7,7,9,8,8,8],
        [7,7,7,9,9,9,9,],
        [7,7,9,9,9,9,,],
        []
    ]
}