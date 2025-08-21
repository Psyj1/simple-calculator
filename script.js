function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "You can't divide by 0!";
  return a / b;
}

function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch (operator) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: return null;
  }
}

let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.getElementById('display');
const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');
const decimalButton = document.querySelector('.decimal');
const backspaceButton = document.getElementById('backspace');

// Populate Display
digitButtons.forEach(button => {
  button.addEventListener('click', () => appendNumber(button.textContent));
});

operatorButtons.forEach(button => {
  button.addEventListener('click', () => setOperation(button.textContent));
});

clearButton.addEventListener('click', clear);
equalsButton.addEventListener('click', evaluate);
decimalButton.addEventListener('click', appendDecimal);
backspaceButton.addEventListener('click', backspace);

function appendNumber(number) {
  if (display.textContent === '0' || shouldResetDisplay) resetDisplay();
  display.textContent += number;
}

function resetDisplay() {
  display.textContent = '';
  shouldResetDisplay = false;
}

function clear() {
  display.textContent = '0';
  firstOperand = null;
  secondOperand = null;
  currentOperator = null;
  shouldResetDisplay = false;
}

function setOperation(operator) {
  if (currentOperator !== null) evaluate();
  firstOperand = display.textContent;
  currentOperator = operator;
  shouldResetDisplay = true;
}

function evaluate() {
  if (currentOperator === null || shouldResetDisplay) return;

  secondOperand = display.textContent;

  if (currentOperator === '/' && secondOperand === '0') {
    display.textContent = "Nice try!";
    return;
  }

  display.textContent = roundResult(
    operate(currentOperator, firstOperand, secondOperand)
  );
  currentOperator = null;
}

function appendDecimal() {
  if (shouldResetDisplay) resetDisplay();
  if (!display.textContent.includes('.')) {
    display.textContent += '.';
  }
}

function roundResult(num) {
  return Math.round(num * 1000) / 1000;
}

function backspace() {
  display.textContent = display.textContent.slice(0, -1) || '0';
}

window.addEventListener('keydown', handleKeyboardInput);

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === '.') appendDecimal();
  if (e.key === '=' || e.key === 'Enter') evaluate();
  if (e.key === 'Backspace') backspace();
  if (e.key === 'Escape') clear();
  if (['+', '-', '*', '/'].includes(e.key)) setOperation(e.key);
}
