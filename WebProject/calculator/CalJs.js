document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.querySelector(".input");
  const numberButtons = document.querySelectorAll(".number");
  const operatorButtons = document.querySelectorAll(".operator");
  const clearButton = document.querySelector("#clear");
  const equalButton = document.querySelector("#equal");

  let currentInput = "";
  let operator = "";
  let firstOperand = null;

  // Handle number button clicks
  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentInput += button.textContent;
      inputField.value = currentInput;
    });
  });

  operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (currentInput === "") return;
      if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
      } else {
        firstOperand = operate(
          firstOperand,
          parseFloat(currentInput),
          operator
        );
      }
      operator = button.textContent;
      currentInput = "";
      inputField.value = "";
    });
  });

  clearButton.addEventListener("click", () => {
    currentInput = "";
    operator = "";
    firstOperand = null;
    inputField.value = "";
  });

  equalButton.addEventListener("click", () => {
    if (currentInput === "" || firstOperand === null || operator === "") return;
    const secondOperand = parseFloat(currentInput);
    const result = operate(firstOperand, secondOperand, operator);
    inputField.value = result;
    currentInput = result.toString();
    firstOperand = null;
    operator = "";
  });

  function operate(first, second, operator) {
    switch (operator) {
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "*":
        return first * second;
      case "/":
        return first / second;
      default:
        return second;
    }
  }
});
