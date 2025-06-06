const birdX = 20;
let birdY = 20;
let velocity = 0;
let gravity = 0.1;
const gap = 56;
let score = 0;
let state = "cover";

let T = 0;
const playerAnimation = [0, 1, 2];

let pipes = [
    { x: 108, y: 0, free: true },
    { x: 108, y: 0, free: true },
    { x: 108, y: 0, free: true },
];

function _update() {
    T += 1;

    switch (state) {
        case "cover":
            break;
        case "play":
            spawnPipes();
            movePipes();
            flap();
            fall();
            break;
        case "gameover":
            fall();
            break;
    }
}

function _draw() {
    cls(12);

    switch (state) {
        case "cover":
            if (btn(5)) {
                state = "play";
            }
            drawCover();
            break;
        case "play":
            for (let i = 0; i < pipes.length; i++) {
                drawPipe(pipes[i]);
            }

            animateBird();
            drawScore();
            //collisionArea();
            checkCollision();
            break;
        case "gameover":
            for (let i = 0; i < pipes.length; i++) {
                drawPipe(pipes[i]);
            }
            drawScore();
            gameOver();
            if (btn(5)) {
                restartGame();
                state = "play";
            }
    }
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
                state = "gameover";
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
        const l = pipes.length;
        for (let i = 0; i < l; i++) {
            if (pipes[i].free) {
                pipes[i].x = 128;
                pipes[i].y = Math.floor(Math.random() * 8) * 8 + 56;
                pipes[i].free = false;
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
    const l = pipes.length;
    for (let i = 0; i < l; i++) {
        if (!pipes[i].free) {
            pipes[i].x -= 1;
            if (pipes[i].x <= -16) {
                pipes[i].free = true;
                pipes[i].x = 128;
                pipes[i].y = 0;
            }

            // increment score
            if (pipes[i].x + 16 === birdX) {
                score += 1;
            }
        }
    }
}

function drawCover() {
    print("Flappy Bird", 42, 40, 7);
    print("Press X to start", 32, 70, 7);
    spr(48, 20, 20, 3, 1);
}

function gameOver() {
    print("Game Over", 49,  44, 0);
    print("Game Over", 49,  45, 0);
    print("Game Over", 48,  45, 0);
    print("Game Over", 48,  44, 9);

    if (Math.sin(0.1*T) > 0) 
        print("Press X to try again!", 24, 60, 7);

    spr(0, birdX, birdY);
}

function restartGame() {
    gameStarted = false;
    birdY = 20;
    velocity = 0;
    pipes.forEach(pipe => {
        pipe.free = true;
        pipe.x = 108;
        pipe.y = 0;
    });
    state = "cover";
    T = 0;
    score = 0;
}

function drawScore() {
    const strLen = score.toString().length;
    const strX = 64 - (strLen * 4) / 2;
    rectfill(strX - 1, 9, 5 * strLen - (strLen - 1), 7, 0);
    print(score.toString(), strX, 10, 7);
}

// Initialize the game
engineInit(_update, _draw, sprites);