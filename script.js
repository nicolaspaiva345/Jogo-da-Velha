const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]")

let isCircleTurn;

const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const startGame = () => {
    isCircleTurn = false;
    for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
}

setBoardHoverClass()
winningMessage.classList.remove("show-winning-message");
};

const endGame = (isdraw) => {
if (isdraw) {
    winningMessageTextElement.innerText = 'Empate!'
} else {
    winningMessageTextElement.innerText = isCircleTurn ? "O Venceu!" : "X Venceu!";
}

winningMessage.classList.add("show-winning-message");
};

const checkForWin = (currentPlayer) => {
    return winningCombination.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const checkForDraw = () => {
    return [...cellElements].every(cell => {
     return cell.classList.contains("x") || cell.classList.contains("circle");  
    });
};

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
    board.classList.remove("circle");
    board.classList.remove("x");

    if (isCircleTurn) {
        board.classList.add("circle");
    } else {
        board.classList.add("x");
    }
};

const swapTurns = () => {
    isCircleTurn = !isCircleTurn

    setBoardHoverClass();
};

 //Colocar a marca (x ou Circulo)
const handleClick = (e)=> {
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(cell, classToAdd);

    //Checar por vitória
    const isWin = checkForWin(classToAdd);

    //Verificar por empate
    const isDraw = checkForDraw();

    if (isWin) {
        endGame(false)
    } else if (isDraw) {
        endGame(true)
    } else {
    //Mudar o simbolo
    swapTurns()
    }

};

startGame();

restartButton.addEventListener("click", startGame);