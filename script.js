let boxs = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset");
let newGamebutton = document.querySelector("#newGame");
let msgBox = document.querySelector(".msgBox");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerY
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxs.forEach((box) => {
    box.addEventListener("click", ()=>{
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        checkWinner(count);
    });
} );

showWinner = (winner) =>{
    msg.innerText =`Congratulations, winner is ${winner}`
    msgBox.classList.remove("hide");
}

draw = () => {
    msg.innerText = "DRAW, PLAY AGAIN";
    msgBox.classList.remove("hide");
}

const disableBoxs = () => {
    for(let box of boxs){
        box.disabled = true;
    }
}
const enableBoxs = () => {
    for(let box of boxs){
        box.disabled = false;
        box.innerText = "";
    }
}
const checkWinner = (count) => {
    for (let pattern of winPatterns) {
        // Retrieve the values of the cells specified in the current pattern
        let pos0Val = boxs[pattern[0]].innerText;
        let pos1Val = boxs[pattern[1]].innerText;
        let pos2Val = boxs[pattern[2]].innerText;

        // Check if all three positions in the pattern are non-empty
        if (pos0Val !== "" && pos1Val !== "" && pos2Val !== "") {
            // Check if the values are the same, indicating a win
            if (pos0Val === pos1Val && pos1Val === pos2Val) {
                disableBoxs();
                showWinner(pos0Val);
            }
            if(count === 9){
                draw();
            }
        }
    }
};
const resetGame = () =>{
    turnO = true;
    count = 0;
    enableBoxs();
    msgBox.classList.add("hide");
}

newGamebutton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);