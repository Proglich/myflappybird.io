
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const messageElement = document.getElementById('message');

// Настройки экрана
canvas.width = 320;
canvas.height = 480;

// Игровые переменные
let bird = { x: 50, y: 150, w: 20, h: 20, velocity: 0, gravity: 0.5, jump: -8 };
let pipes = [];
let frame = 0;
let score = 0;
let gameActive = false;

// Управление
function input() {
    if (!gameActive) {
        resetGame();
        gameActive = true;
        messageElement.innerText = "";
    }
    bird.velocity = bird.jump;
}

window.addEventListener('keydown', (e) => { if (e.code === 'Space') input(); });
canvas.addEventListener('mousedown', input);

function resetGame() {
    bird.y = 150;
    bird.velocity = 0;
    pipes = [];
    score = 0;
    frame = 0;
    scoreElement.innerText = `Счет: ${score}`;
}

function createPipe() {
    const gap = 100; // Размер прохода между трубами
    const minHeight = 50;
    const maxHeight = canvas.height - gap - minHeight;
    const height = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

    pipes.push({
        x: canvas.width,
        y: 0,
        w: 40,
        h: height,
        type: 'top'
    });
    pipes.push({
        x: canvas.width,
        y: height + gap,
        w: 40,
        h: canvas.height - height - gap,
        type: 'bottom'
    });
}

function update() {
    if (!gameActive) return;

    // Физика птицы
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    // Столкновение с полом или потолком
    if (bird.y + bird.h > canvas.height || bird.y < 0) {
        gameOver();
    }

    // Трубы
    if (frame % 90 === 0) createPipe();

    pipes.forEach((pipe, index) => {
        pipe.x -= 2; // Скорость движения труб

        // Столкновение с трубами
        if bird.x < pipe.x + pipe.w && bird.x + bird.w > pipe.x && bird.y < pipe.y + pipe.h && bird.y + bird.h > pipe.y ) { gameOver(); }
          // Удаление труб за экраном и счет
    if (pipe.x + pipe.w < 0) {
        if (pipe.type === 'top') {
            score++;
            scoreElement.innerText = `Счет: ${score}`;
        }
        pipes.splice(index, 1);
    }
});

fram
}
function gameOver() { gameActive = false; messageElement.innerText = "ИГРА ОКОНЧЕНА\nНажми, чтобы начать заново"; }
function draw() { // Очистка холста ctx.clearRect(0, 0, canvas.width, canvas.height);
// Рисуем птицу (желтый квадрат)
ctx.fillStyle = "#FFD700";
ctx.fillRect(bird.x, bird.y, bird.w, bird.h);

// Рисуем трубы (зеленые прямоугольники)
ctx.fillStyle = "#2ecc71";
pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, pipe.y, pipe.w, pipe.h);
});

update();
requestAnimationFrame(draw);
}
// Запуск цикла draw();
