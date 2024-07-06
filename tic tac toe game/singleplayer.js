let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnX = true; // Human is 'X', Computer is 'O'

const winPatterns = [ // Winning patterns
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const resetGame = () => {
    turnX = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    resetBtn.classList.remove("hide");
   
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("x-marker", "o-marker");
    }
};

const showWinner = (winner) => {
    resetBtn.classList.add("hide");
    msg.innerText = winner === "X" ? "Congratulations, you win!" : "You Lose, Computer wins!";
    msgContainer.classList.remove("hide");
    disableBoxes();
    
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};

const computerMove = () => {
    let availableBoxes = [];
    boxes.forEach((box, index) => {
        if (box.innerText === "") {
            availableBoxes.push(index);
        }
    });
    if (availableBoxes.length > 0) {
        let randomIndex = Math.floor(Math.random() * availableBoxes.length);
        let selectedBox = boxes[availableBoxes[randomIndex]];
        
        selectedBox.innerText = "O";
        selectedBox.classList.add("o-marker");
        selectedBox.disabled = true;
        if (!checkWinner()) {
            turnX = true;
        }
    }
};


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnX) {
            box.innerText = "X";
            box.classList.add("x-marker");
            box.disabled = true;
            if (!checkWinner()) {
                turnX = false;
                setTimeout(computerMove, 1200); // Delay computer's move
            }
        }
    });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

resetGame();


