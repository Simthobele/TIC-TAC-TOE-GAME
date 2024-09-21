// game_logic.js

// Step 3: Define Game State
let currentPlayer = 'X';
const spaces = Array(9).fill(null);

// Define winning combinations (indexes of gameboard cells)
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6]              // Diagonal
];

// Define constants for X and O
const X_TEXT = 'X';
const O_TEXT = 'O';

// Step 4: Render Gameboard
function renderGameboard() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cellSize = canvas.width / 3;

    // Draw grid lines
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 1; i < 3; i++) {
        // Vertical lines
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, canvas.height);
        // Horizontal lines
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(canvas.width, i * cellSize);
    }
    ctx.stroke();

    // Render X's and O's
    for (let i = 0; i < spaces.length; i++) {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const x = col * cellSize + cellSize / 2;
        const y = row * cellSize + cellSize / 2;
        const symbol = spaces[i];
        if (symbol === X_TEXT) {
            renderX(ctx, x, y, cellSize);
        } else if (symbol === O_TEXT) {
            renderO(ctx, x, y, cellSize);
        }
    }
}

// Step 5: Render X and O
function renderX(ctx, x, y, size) {
    ctx.strokeStyle = '#f00'; // Red color
    ctx.lineWidth = 4;
    const offset = size / 4;
    ctx.beginPath();
    ctx.moveTo(x - offset, y - offset);
    ctx.lineTo(x + offset, y + offset);
    ctx.moveTo(x + offset, y - offset);
    ctx.lineTo(x - offset, y + offset);
    ctx.stroke();
}

function renderO(ctx, x, y, size) {
    ctx.strokeStyle = '#00f'; // Blue color
    ctx.lineWidth = 4;
    const radius = size / 4;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
}

// Step 6: Handle Click Events
function handleCanvasClick(event) {
    const canvas = document.getElementById('gameCanvas');
    const rect = canvas.getBoundingClientRect();
    const cellSize = canvas.width / 3;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    const index = row * 3 + col;

    if (!spaces[index]) {
        spaces[index] = currentPlayer;
        renderGameboard();
        if (playerHasWon()) {
            alert(currentPlayer + ' wins!'); // Show alert message when player wins
            restart(); // Restart the game
        } else if (spaces.every(cell => cell !== null)) {
            alert('It\'s a draw!'); // Show alert message when it's a draw
            restart(); // Restart the game
        } else {
            currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
        }
    }
}

// Add click event listener to the canvas
const canvas = document.getElementById('gameCanvas');
canvas.addEventListener('click', handleCanvasClick);

// Step 7: Check Win Condition
function playerHasWon() {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
            return true;
        }
    }
    return false;
}

// Step 8: Restart Game
function restart() {
    currentPlayer = X_TEXT;
    spaces.fill(null);
    renderGameboard();
}

// Add event listener for the restart button
const restartBtn = document.getElementById('restartBtn');
restartBtn.addEventListener('click', restart);

// WebGL initialization and rendering loop
function initWebGL() {
    // WebGL initialization code here
    // Initialize WebGL viewport
    //const canvas = document.getElementById('gameCanvas');
    //const gl = canvas.getContext('webgl');
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.22, 0.45, 0.63, 1.0); // Set clear color to blue

    // Clear the canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Render the gameboard, X's, and O's
    renderGameboard();
    renderX(gl, -0.5, 0.5);
    renderO(gl, 0.5, 0.5);
    
    // Render the gameboard initially
    renderGameboard();
}

function render() {
    // WebGL rendering code here
    // Clear the canvas
    //const canvas = document.getElementById('gameCanvas');
    //const gl = canvas.getContext('webgl');
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Render the gameboard, X's, and O's
    renderGameboard();
    renderX(gl, -0.5, 0.5);
    renderO(gl, 0.5, 0.5);

    // Request the next frame
    requestAnimationFrame(render);
}

// Initialize WebGL and start rendering loop
initWebGL();
render();

