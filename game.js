const birdX = 20;
let birdY = 20;
let velocity = 0;
let gravity = 0.1;
const gap = 48;
let gameOver = false;
let gameStarted = false;

let T = 0;
const playerAnimation = [0, 1, 2];

let pipes = [
    { x: 108, y: 0, free: true },
    { x: 108, y: 0, free: true },
    { x: 108, y: 0, free: true },
];

function _update() {
    T += 1;
    fall();
    flap();
    movePipes();
}

function _draw() {
    cls(12);
    animateBird();

    spawnPipes();
    for (let i = 0; i < pipes.length; i++) {
        drawPipe(pipes[i]);
    }

    collisionArea();
    checkCollision();
}

function animateBird() {
    const sp = Math.floor(T / 6) % playerAnimation.length;
    spr(playerAnimation[sp], birdX, birdY);
}

function flap() {
    if (birdY <= 0) {
        birdY = 0;
        velocity = 0;
    }

    if (btnp(2)) {
        velocity = -2;
    }
}

function collisionArea() {
    for (let i = 0; i < pipes.length; i++) {
        if (pipes[i].free) continue;

        const pipeY = pipes[i].y;
        const pipeX = pipes[i].x;

        rect(pipeX + 2, 0, 12, pipeY - gap + 8 + 7, 10); // top pipe
        rect(pipeX + 2, pipeY - 7, 12, 126, 11); // bottom pipe

        //if (birdY >= pipeY - 7 && birdY <= pipeY + gap) {
        //    if (pipeX <= 20 && pipeX + 2 >= 20) {
        //        return true;
        //    }
        //}
    }
    return false;
}

function checkCollision() {
    for (let i = 0; i < pipes.length; i++) {
        if (pipes[i].free) continue;

        const pipeY = pipes[i].y;
        const pipeX = pipes[i].x;

        if ((birdX + 8 >= pipeX + 2 && birdX + 8 <= pipeX + 14) || (birdX >= pipeX + 2 && birdX <= pipeX + 14)) {
            if ((birdY + 8 >= pipeY - 7 && birdY <= 128) || (birdY <= pipeY - gap + 8 + 7 && birdY >= 0)) {
                rectfill(birdX, birdY, 8, 8, 0);
                gameOver = true;
                console.log(Date.now(), "Game Over");
                return;
            }
        }
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

function spawnPipes() {
    if (T % 100 === 0) {
        for (let i = 0; i < pipes.length; i++) {
            if (pipes[i].free) {
                pipes[i].x = 128;
                pipes[i].y = Math.floor(Math.random() * 8) * 8 + 48;
                pipes[i].free = false;
                //console.log("Spawned pipe at", pipes[i].y);
                return;
            }
        }
    }
}

function drawPipe(pipe) {
    if (pipe.free) return;

    const pipeY = pipe.y;
    const pipeX = pipe.x;
    for (let i = 0; i < 128; i+=8) {
        if (i < pipeY && i > pipeY - gap) {
            continue;
        }
        spr(16, pipeX, i, 2, 1);
    }

    spr(32, pipeX, pipeY - 7, 2, 1);
    spr(32, pipeX, pipeY - gap + 8, 2, 1);
}

function movePipes() {
    for (let i = 0; i < pipes.length; i++) {
        pipes[i].x -= 1;
        if (pipes[i].x < -16) {
            pipes[i].free = true;
            pipes[i].x = 128;
            pipes[i].y = 0;
        }
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
    ],
    16: [
        [,,5,3,3,11,7,11],
        [,,5,3,3,11,7,11],
        [,,5,3,3,11,7,11],
        [,,5,3,3,11,7,11],
        [,,5,3,3,11,7,11],
        [,,5,3,3,11,7,11],
        [,,5,3,3,11,7,11],
        [,,5,3,3,11,7,11],
    ],
    17: [
        [11,11,11,3,3,5,],
        [11,11,11,3,3,5,],
        [11,11,11,3,3,5,],
        [11,11,11,3,3,5,],
        [11,11,11,3,3,5,],
        [11,11,11,3,3,5,],
        [11,11,11,3,3,5,],
        [11,11,11,3,3,5,],
    ],
    32: [
        [5,5,5,5,5,5,5,5],
        [5,3,3,11,7,11,11,11],
        [5,3,3,11,7,11,11,11],
        [5,3,3,11,7,11,11,11],
        [5,3,3,11,7,11,11,11],
        [5,3,3,11,7,11,11,11],
        [5,5,5,5,5,5,5,5],
        [],
    ],
    33: [
        [5,5,5,5,5,5,5,5],
        [11,11,3,3,3,3,3,5],
        [11,11,3,3,3,3,3,5],
        [11,11,3,3,3,3,3,5],
        [11,11,3,3,3,3,3,5],
        [11,11,3,3,3,3,3,5],
        [5,5,5,5,5,5,5,5],
    ],
}