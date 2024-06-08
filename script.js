let inputBox = document.querySelector(".input-box")
let msg = document.querySelector(".input-box-text")
let newGameBtn = document.querySelector(".new-game")
let resetGameBtn = document.querySelector(".reset-game")
let boxes = document.querySelectorAll(".box")

// ---------
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];
let turnO = true;
let count = 0;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        }
        else {
            box.innerText = "X";
            turnO = true;

        }
        box.classList.add("disable")
        count++;
        let isWinner=checkWinner()
        if (count === 9 && !isWinner) {
            gameDraw();
          }
    })
})
// -------

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return true
            }
        }
    }
};

// ------
const showWinner = (winner) => {
    msg.innerText = `Congratulations! The winner is ${winner}`;
    disabledButton();
};

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    inputBox.classList.remove("hide");
    disabledButton();
  };

// -----

const disabledButton = () => {
    for (let box of boxes) {
       box.classList.add("disable")
    }
};

// ----
const enabledButton = () => {
    for (let box of boxes) {
       box.classList.add("enable")
       box.innerText=" ";
    }
};

// ---
const resetbutton=()=>{
    turnO=true;
    count=0;
    enabledButton()
    inputBox.classList.add("hide")

}
// ---
resetGameBtn.addEventListener("click",resetbutton)
newGameBtn.addEventListener("click",resetbutton)

