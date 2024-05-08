const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  // adicionando o digito ao visor
  addDigit(digit) {
    console.log(digit);
    // checando se é um .
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  // operações da calculadora
  processOperation(operation) {
    // checando se está vazio
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      // mudando a operação
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    // valor Atual e anterior
    let operationValue;
    let previous = +this.previousOperationText.innerText.split(" ")[0];
    let current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurrentOperator();
        break;
      case "C":
        this.processClearOperator();
        break;
      case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }

  //mudando os numeros da tela
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      // checa se o valor é 0
      if (previous === 0) {
        operationValue = current;
      }
      // mudando de atual para anterior
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  // Mudando as operaçoes matematicas
  changeOperation(operation) {
    const mathOperations = ["*", "-", "+", "/"];

    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  // deleta o digito
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }

  // limpa a opreção atual
  processClearCurrentOperator() {
    this.currentOperationText.innerText = "";
  }

  // Limpa tudo
  processClearOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  // Processa a operação
  processEqualOperator() {
    let operation = this.previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      console.log(value);
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});
