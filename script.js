// Select elements from the DOM
let inputBox = document.querySelector(".input-box"); // Input box element
let msg = document.querySelector(".input-box-text"); // Message element
let newGameBtn = document.querySelector(".new-game"); // New game button element
let resetGameBtn = document.querySelector(".reset-game"); // Reset game button element
let boxes = document.querySelectorAll(".box"); // Array of box elements

// Define win patterns for the game
const winPatterns = [
    [0, 1, 2], // Row 1
    [0, 3, 6], // Column 1
    [0, 4, 8], // Diagonal 1
    [1, 4, 7], // Row 2
    [2, 5, 8], // Row 3
    [2, 4, 6], // Diagonal 2
    [3, 4, 5], // Column 2
    [6, 7, 8] // Column 3
];

// Initialize game state variables
let turnO = true; // Current turn (true for O, false for X)
let count = 0; // Move count

// Add event listeners to box elements
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Handle box click event
        if (turnO) {
            box.innerText = "O"; // Set box text to O
            turnO = false; // Switch to X's turn
        } else {
            box.innerText = "X"; // Set box text to X
            turnO = true; // Switch to O's turn
        }
        box.classList.add("disable"); // Disable box to prevent further clicks
        count++; // Increment move count
        let isWinner = checkWinner(); // Check for winner
        if (count === 9 && !isWinner) {
            gameDraw(); // Game is a draw if no winner after 9 moves
        }
    });
});

// Check for winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1); // Show winner message
                return true;
            }
        }
    }
};

// Show winner message
const showWinner = (winner) => {
    msg.innerText = `Congratulations! The winner is ${winner}`;
    disabledButton(); // Disable all boxes
};

// Game is a draw
const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    inputBox.classList.remove("hide"); // Show input box
    disabledButton(); // Disable all boxes
};

// Disable all boxes
const disabledButton = () => {
    for (let box of boxes) {
        box.classList.add("disable");
    }
};

// Enable all boxes
const enabledButton = () => {
    for (let box of boxes) {
        box.classList.add("enable");
        box.innerText = " "; // Reset box text
    }
};

// Reset game button handler
const resetbutton = () => {
    turnO = true; // Reset turn to O
    count = 0; // Reset move count
    enabledButton(); // Enable all boxes
    inputBox.classList.add("hide"); // Hide input box
};

// Add event listeners to reset and new game buttons
resetGameBtn.addEventListener("click", resetbutton);
newGameBtn.addEventListener("click", resetbutton);
