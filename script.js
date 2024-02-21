const scoreObj = {
  comp: 0,
  user: 0,
};

const compSection = document.querySelectorAll(".compSection .action-wrapper");
const userChoice = document.querySelectorAll(".userSection .action-wrapper");

const userChoiceParent = userChoice[0].parentNode;
const counter = document.getElementById("counter");
const screen = document.getElementsByTagName("section")[0];

function validateUserWin(userMove, compMove) {
  if (userMove === compMove) return -1;

  switch (compMove) {
    case 0:
      if (userMove === 1) return 1;
      else if (userMove === 2) return 0;
    case 1:
      if (userMove === 0) return 0;
      else if (userMove === 2) return 1;
    case 2:
      if (userMove === 0) return 1;
      else if (userMove === 1) return 0;
  }
}

async function onClickOption(userMove) {
  userMove = parseInt(userMove);
  const compMove = Math.floor(Math.random() * 3);

  compSection[compMove].setAttribute("id", "compChoice");
  compSection[compMove].parentNode.setAttribute("id", "selected");

  const winStatus = validateUserWin(userMove, compMove);

  if (winStatus > 0 && winStatus) {
    scoreObj.user += 1;
    counter.innerText = "You Won !!";
    userChoice[userMove].style.opacity = 1;
    compSection[compMove].style.opacity = 0.5;
    userChoice[userMove].style.zIndex = 999;
  } else if (winStatus === 0) {
    scoreObj.comp += 1;
    counter.innerText = "You Lost !!";
    compSection[compMove].style.opacity = 1;
    compSection[compMove].style.zIndex = 999;
    userChoice[userMove].style.opacity = 0.5;
  } else {
    counter.innerText = "Thats a draw !!";
    userChoice[userMove].style.opacity = 1;
    compSection[compMove].style.opacity = 1;
  }

  return { compMove, userMove };
}

const resetScene = async (compMove, userMove) => {
  const currenTotalScore = Math.max(scoreObj.comp, scoreObj.user);

  compSection[compMove].parentNode.removeAttribute("id", "selected");
  userChoice[userMove].parentNode.removeAttribute("id", "selected");

  userChoice[userMove].removeAttribute("id", "userChoice");
  compSection[compMove].removeAttribute("id", "compChoice");

  userChoice[userMove].style = "";
  compSection[compMove].style = "";
  if (currenTotalScore < 3) {
    counter.innerHTML = `Place your Move<br><span>Computer : ${scoreObj.comp} v/s User : ${scoreObj.user}<span>`;
  } else {
    const button = document.createElement("button");
    button.textContent = "Reset";
    button.setAttribute("onclick", "resetGame()");
    button.setAttribute("id", "reset");
    counter.innerHTML = "";
    counter.append("Game Over !!!", button);
  }
};

const resetGame = () => {
  scoreObj.comp = 0;
  scoreObj.user = 0;

  counter.innerHTML = "Start the Game";
};

userChoiceParent.addEventListener("click", async (e) => {
  const currenTotalScore = Math.max(scoreObj.comp, scoreObj.user);
  if (currenTotalScore <= 2) {
    e.target.setAttribute("id", "userChoice");
    const value = e.target.dataset.id;
    userChoice[value].parentNode.setAttribute("id", "selected");
    const { compMove, userMove } = await onClickOption(value);
    setTimeout(() => {
      resetScene(compMove, userMove);
    }, 2000);
  }
});
