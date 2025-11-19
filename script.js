//your JS code here. If required.
const p1 = document.getElementById("player-1");
const p2 = document.getElementById("player-2");
const startBtn = document.getElementById("submit");

const inputSection = document.getElementById("input-section");
const gameSection = document.getElementById("game-section");
const msg = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "X";

let board = ["", "", "", "", "", "", "", "", ""];

const winningCombos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

startBtn.onclick = () => {
    player1 = p1.value.trim();
    player2 = p2.value.trim();

    if (player1 === "" || player2 === "") {
        alert("Please enter both names!");
        return;
    }

    inputSection.style.display = "none";
    gameSection.style.display = "block";

    currentPlayer = player1;
    msg.textContent = `${currentPlayer}, you're up`;
};
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const id = parseInt(cell.id);

        if (board[id - 1] !== "") return;

        board[id - 1] = currentSymbol;
        cell.textContent = currentSymbol;

        if (checkWinner()) {
            msg.textContent = `${currentPlayer}, congratulations you won!`;
            disableBoard();
            return;
        }

        switchTurn();
    });
});

function switchTurn() {
    if (currentPlayer === player1) {
        currentPlayer = player2;
        currentSymbol = "O";
    } else {
        currentPlayer = player1;
        currentSymbol = "X";
    }

    msg.textContent = `${currentPlayer}, you're up`;
}

function disableBoard() {
    cells.forEach(c => c.style.pointerEvents = "none");
}

function checkWinner() {
    return winningCombos.some(combo => {
        let [a, b, c] = combo;
        return (
            board[a - 1] !== "" &&
            board[a - 1] === board[b - 1] &&
            board[a - 1] === board[c - 1]
        );
    });
}