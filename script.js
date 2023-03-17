const topDisplay = document.querySelector('#display > div:first-of-type');
const mainDisplay = document.querySelector('#display > div:last-of-type');
const operatorBtns = document.querySelectorAll('.operator');
const numberBtns = document.querySelectorAll('.number');
const clearBtn = document.querySelector('#clear');
const deleteBtn = document.querySelector('#delete');
const percentBtn = document.querySelector('#percent');
const equalsBtn = document.querySelector('#equals');
let operatorClicked = false;
let equalsClicked = false;
let currentNum;
let previousNum;
let currentOp;
let previousOp;

function updateDisplay(main, top) {
    mainDisplay.textContent = main;
    topDisplay.textContent = top;
}

function clearAll() {
    mainDisplay.textContent = '';
    topDisplay.textContent = '';
    previousNum = '';
}

function calculate(num1, num2, op) {
    if (op === '+') return num1 + num2;
    if (op === '-') return num1 - num2;
    if (op === '×') return num1 * num2;
    if (op === '÷') return num1 / num2;
}

function getAnswer() {
    if (previousNum === '' || topDisplay.textContent.includes('=')) return;

    if (operatorClicked) {
        const output = calculate(previousNum, previousNum, previousOp);
        updateDisplay(output, `${previousNum} ${previousOp} ${previousNum} =`);
    } else {
        const output = calculate(previousNum, currentNum, previousOp);
        updateDisplay(output, `${previousNum} ${previousOp} ${currentNum} =`);
    }

    equalsClicked = true;
    previousNum = '';
    currentNum = Number(mainDisplay.textContent);
}

function getNumber() {
    if (operatorClicked || equalsClicked) mainDisplay.textContent = '';

    mainDisplay.append(this.textContent);

    currentNum = Number(mainDisplay.textContent);
}

function getOperator() {
    currentOp = this.textContent;

    if (operatorClicked) {
        const output = calculate(previousNum, previousNum, previousOp);
        updateDisplay(output, `${output} ${currentOp}`);
    } else if (equalsClicked || !previousNum) {
        updateDisplay(currentNum, `${currentNum} ${currentOp}`);
    } else {
        const output = calculate(previousNum, currentNum, previousOp);
        updateDisplay(output, `${output} ${currentOp}`);
    }

    operatorClicked = true;
    previousOp = this.textContent;
    previousNum = Number(mainDisplay.textContent);
}

numberBtns.forEach((e) => e.addEventListener('click', getNumber));

operatorBtns.forEach((e) => e.addEventListener('click', getOperator));

equalsBtn.addEventListener('click', getAnswer);

clearBtn.addEventListener('click', clearAll);

document.querySelectorAll('button:not(#equals)').forEach((e) =>
    e.addEventListener('click', () => {
        equalsClicked = false;
    })
);

document.querySelectorAll('button:not(.operator)').forEach((e) =>
    e.addEventListener('click', () => {
        operatorClicked = false;
    })
);
