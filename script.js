const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Paddles
const paddleWidth = 10, paddleHeight = 100;
const paddleSpeed = 5;
let leftPaddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;

// Ball
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
const ballRadius = 10;
let ballSpeedX = 4;
let ballSpeedY = 4;

// Control paddles
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'w':
            leftPaddleY = Math.max(leftPaddleY - paddleSpeed, 0);
            break;
        case 's':
            leftPaddleY = Math.min(leftPaddleY + paddleSpeed, canvas.height - paddleHeight);
            break;
        case 'ArrowUp':
            rightPaddleY = Math.max(rightPaddleY - paddleSpeed, 0);
            break;
        case 'ArrowDown':
            rightPaddleY = Math.min(rightPaddleY + paddleSpeed, canvas.height - paddleHeight);
            break;
    }
});

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    ctx.fillStyle = 'white';
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

function update() {
    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX - ballRadius < paddleWidth) {
        if (ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        }
    } else if (ballX + ballRadius > canvas.width - paddleWidth) {
        if (ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        }
    }

    // Ball out of bounds
    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
    }
}

function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();