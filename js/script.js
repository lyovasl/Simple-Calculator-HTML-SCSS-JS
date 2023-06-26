let firstNumber = "";
let secondNumber = "";
let signOperation = "";
let finish = false;

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const action = ["+", "-", "*", "/"];

const signAction = document.querySelector(".calc__input-sign");
const AC = document.querySelector(".calc__ac");
const numBtn = document.querySelector(".calc__btn");

const outContent = function () {
  firstNumber = "";
  secondNumber = "";
  signOperation = "";
  finish = false;
  signAction.textContent = 0;
};

AC.addEventListener("click", function () {
  signAction.value = 0;
  outContent();
});

numBtn.addEventListener("click", function (value) {
  if (!value.target.classList.contains("btn")) return;
  if (value.target.classList.contains("calc__ac")) return;

  outContent.textContent = "";

  const key = value.target.textContent;

  if (digit.includes(key)) {
    if (secondNumber === "" && signOperation === "") {
      firstNumber += key;
      signAction.value = firstNumber;
    } else if (firstNumber !== "" && secondNumber !== "" && finish) {
      secondNumber = key;
      finish = false;
      signAction.value = secondNumber;
    } else {
      secondNumber += key;
      signAction.value = secondNumber;
    }
  }

  if (action.includes(key)) {
    signOperation = key;
    signAction.value = signOperation;
    return;
  }

  if (key === "=") {
    switch (signOperation) {
      case "+":
        firstNumber = +firstNumber + +secondNumber;
        break;
      case "-":
        firstNumber = firstNumber - secondNumber;
        break;
      case "*":
        firstNumber = firstNumber * secondNumber;
        break;
      case "/":
        if (secondNumber === "0") {
          signAction.value = "Cannot divide by zero";
          firstNumber = "";
          secondNumber = "";
          signOperation = "";
          return;
        }
        firstNumber = firstNumber / secondNumber;
        break;
      case " %":
        firstNumber = firstNumber % secondNumber;
    }
    finish = true;
    signAction.value = firstNumber;
  }
});
