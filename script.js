const scoreObj = {
    "comp": 0,
    "user": 0
};

const scoreCriteria = {
    "stone": 0,
    "paper": 1,
    "scissor": 2,
}

const compSection = document.querySelectorAll(".compSection .action-wrapper");
const userChoice = document.querySelectorAll(".userSection .action-wrapper");
const counter = document.getElementById("counter");

function validateUserWin(userMove, compMove) {
    if (userMove == compMove)
        return -1;

    switch (compMove) {
        case 0:
            if (userMove == 1)
                return 1;
            else if (userMove == 2)
                return 0;
        case 1:
            if (userMove == 0)
                return 0;
            else if (userMove == 2)
                return 1;
        case 2:
            if (userMove == 0)
                return 1;
            else if (userMove == 1)
                return 0;
    }
}


async function onClickOption(userMove) {
    const compMove = Math.floor(Math.random() * 3);

    compSection[compMove].setAttribute("id", "compChoice");
    compSection[compMove].parentNode.setAttribute("id", "selected");

    const winStatus = validateUserWin(userMove, compMove);


    if (winStatus > 0 && winStatus) {
        scoreObj.user += 1;
        counter.innerText = "You Won !!";

    } else if (winStatus === 0) {
        scoreObj.comp += 1
        counter.innerText = "You Lost !!";

    } else {
        counter.innerText = "Thats a draw !!";

    }

    return {compMove,userMove}
}

const createScene = async () => {
    let count = 4;
    const counterFunc = setInterval(() => {
        count--;
        counter.innerText = count;

        if (count == 0) {
            clearInterval(counterFunc);
        }
    }, 1000);

}

const resetScene = async (compMove, userMove) => {
    compSection[compMove].parentNode.removeAttribute("id", "selected");
    userChoice[userMove].parentNode.removeAttribute("id", "selected");

    userChoice[userMove].removeAttribute("id", "userChoice");
    compSection[compMove].removeAttribute("id", "compChoice");
}


const setupOnClick =async (e) => {
    e.target.setAttribute("id", "userChoice");
    e.target.setAttribute("onclick","");
    const value = e.target.dataset.id;
    userChoice[value].parentNode.setAttribute("id", "selected");
    const {compMove,userMove}=await onClickOption(value);

    setTimeout(() => {
        resetScene(compMove, userMove);
        e.target.setAttribute("onclick","setupOnClick(event)");
    }, 2000);


}

createScene();