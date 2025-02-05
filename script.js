const words = ["javascript", "hangman", "programming", "developer", "computer"];
let selectedWord = '';
let guessedWord = [];
let wrongGuesses = 0;

const canvas = document.getElementById("hangman-canvas");
const ctx = canvas.getContext("2d");

// Wait for start button click to start the game
document.getElementById("start-button").addEventListener("click", function() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    startGame();
});

// Event listener to hide the image when clicked
document.getElementById("start-image").addEventListener("click", function() {
    document.getElementById("start-image").style.display = "none";
    document.getElementById("start-button").style.display = "block";
});

function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedWord = Array(selectedWord.length).fill("_");
    wrongGuesses = 0;
    
    document.getElementById("word-display").textContent = guessedWord.join(" ");
    document.getElementById("wrong-guesses").textContent = wrongGuesses;
    document.getElementById("message").textContent = "";
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear canvas for a new game
    drawBase();  // Draw the base structure
}

document.getElementById("guess-btn").addEventListener("click", function() {
    let guess = document.getElementById("guess-input").value.toLowerCase();
    document.getElementById("guess-input").value = "";
    
    if (guess.length === 1 && /^[a-z]$/.test(guess)) {
        if (selectedWord.includes(guess)) {
            for (let i = 0; i < selectedWord.length; i++) {
                if (selectedWord[i] === guess) {
                    guessedWord[i] = guess;
                }
            }
        } else {
            wrongGuesses++;
            document.getElementById("wrong-guesses").textContent = wrongGuesses;
            drawStickman(wrongGuesses);
        }
        document.getElementById("word-display").textContent = guessedWord.join(" ");
        
        if (!guessedWord.includes("_")) {
            alert("You Win!");
        }
        if (wrongGuesses >= 6) {
            alert("Game Over! The word was " + selectedWord);
        }
    }
});

document.getElementById("restart-btn").addEventListener("click", function() {
    startGame();
});

function drawBase() {
    ctx.lineWidth = 4;
    ctx.strokeStyle = "white";  // Set color to white for visibility
    ctx.beginPath();
    ctx.moveTo(75, 250);  // Base stand
    ctx.lineTo(225, 250);
    ctx.moveTo(150, 250);
    ctx.lineTo(150, 50);
    ctx.lineTo(100, 50);
    ctx.lineTo(100, 80);  // Hook where head will be drawn
    ctx.stroke();
}

function drawStickman(wrongGuesses) {
    ctx.lineWidth = 4;
    ctx.strokeStyle = "white";  // White color for visibility
    const centerX = 100;  // Adjusted position for stickman
    const centerY = 100;

    switch (wrongGuesses) {
        case 1: // Head
            ctx.beginPath();
            ctx.arc(centerX, centerY, 20, 0, Math.PI * 2, true);
            ctx.stroke();
            break;
        case 2: // Body
            ctx.beginPath();
            ctx.moveTo(centerX, centerY + 20);
            ctx.lineTo(centerX, centerY + 100);
            ctx.stroke();
            break;
        case 3: // Left Arm
            ctx.beginPath();
            ctx.moveTo(centerX, centerY + 40);
            ctx.lineTo(centerX - 30, centerY + 70);
            ctx.stroke();
            break;
        case 4: // Right Arm
            ctx.beginPath();
            ctx.moveTo(centerX, centerY + 40);
            ctx.lineTo(centerX + 30, centerY + 70);
            ctx.stroke();
            break;
        case 5: // Left Leg
            ctx.beginPath();
            ctx.moveTo(centerX, centerY + 100);
            ctx.lineTo(centerX - 30, centerY + 150);
            ctx.stroke();
            break;
        case 6: // Right Leg
            ctx.beginPath();
            ctx.moveTo(centerX, centerY + 100);
            ctx.lineTo(centerX + 30, centerY + 150);
            ctx.stroke();
            break;
    }
}




