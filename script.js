
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const messageElement = document.getElementById('start-message');

// Установка разрешения (внутреннее)
canvas.width = 320;
canvas.height = 480;

// Игровые параметры
let bird = { x: 50, y: 200, w: 34, h: 24, velocity: 0, gravity: 0.25, jump: -4.5 };
let pipes = [];
let score = 0;
let gameRunning = false;
let animationId;

// Управление
function handleAction() {
    if (!gameRunning) {
        startGame();
    } else {
        bird.velocity = bird.jump;
    }
}

window.addEventListener('keydown', (e) => { if (e.code === 'Space') handleAction(); });
canvas.addEventListener('touchstart', (e) => { e.preventDefault(); handleAction(); }, {passive: false});
canvas.addEventListener('mousedown', handleAction);

function startGame() {
    gameRunning = true;
    score = 0;
    bird.y = 200;
    bird.velocity = 0;
    pipes = [];
    scoreElement.innerText = '0';
    messageElement.style.display = 'none';
    loop();
}

function gameOver() {
    gameRunning = false;
    cancelAnimationFrame(animationId)messageElement.innerHTML = ИГРА ОКОНЧЕНА<br>Счет: ${score}<br>Нажми, чтобы начать заново; messageElement.style.display = 'block'; }
function createPipe() { const gap = 120; const minPipeHeight = 50; const pipeWidth = 50; const randomHeight = Math.floor(Math.random()  (canvas.height - gap - (minPipeHeight  2))) + minPipeHeight;
pipes.push({
    x: canvas.width,
    y: 0,
    w: pipeWidth,
    h: randomHeight,
    passed: false
});
pipes.push({
    x: canvas.width,
    y: randomHeight + gap,
    w: pipeWidth,
    h: canvas.height - randomHeight - gap,
    passed: false
});
}
function update() { bird.velocity += bird.gravity; bird.y += bird.velocity;
// Проверка границ экрана
if (bird.y + bird.h > canvas.height || bird.y < 0) {
    gameOver();
}

// Управление трубами
if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 150) {
    createPipe();
}

for (let i = pipes.length - 1; i >= 0; i--) {
    let p = pipes[i];
    p.x -= 2;

    // Столкновение
    if (
        bird.x < p.x + p.w &&
        bird.x + bird.w > p.x &&
        bird.y < p.y + p.h &&
        bird.y + bird.h > p.y
    ) {
        gameOver();
    }

    // Подсчет очков (только для верхних труб)
    if (!p.passed && p.y === 0 && bird.x > p.x + p.w) {
        score++;
        p.passed = true;
        scoreElement.innerText = score;
    }

    // Удаление вышедших труб
    if (p.x + p.w < 0) {
        pipes.splice(i, 1);
    }
}
}
function draw() { // Фон ctx.fillStyle = "#70c5ce"; ctx.fillRect(0, 0, canvas.width, canvas.height);
// Трубы
ctx.fillStyle = "#2ecc71";
pipes.forEach(p => {
    ctx.fillRect(p.x, p.y, p.w, p.h);
    // Декор труб (полоска)
    ctx.strokeStyle = "#27ae60";
    ctx.lineWidth = 4;
    ctx.strokeRect(p.x, p.y, p.w, p.h);
});

// Птица (рисуем эмодзи 🐥)
ctx.font = "30px Arial";
ctx.fillText("🐥", bird.x, bird.y + bird.h);
}
function loop() { if (!gameRunning) return; update(); draw(); animationId = requestAnimationFrame(loop); }
// Начальный экран draw();


--