const topDisplay = document.querySelector('#display > div:first-of-type');
const mainDisplay = document.querySelector('#display > div:last-of-type');
const operatorBtns = document.querySelectorAll('.operator');
const numberBtns = document.querySelectorAll('.number');
const decimalBtn = document.querySelector('#decimal');
const deleteBtn = document.querySelector('#delete');
const clearBtn = document.querySelector('#clear');
const percentBtn = document.querySelector('#percent');
const equalsBtn = document.querySelector('#equals');
const lightTheme = document.querySelector('#light-theme');
const root = document.querySelector(':root');
let operatorClicked = false;
let equalsClicked = false;
let currentNum = 0;
let previousNum = 0;
let currentOp = '';
let previousOp = '';
let solution = 0;

function updateDisplay(main, top) {
    mainDisplay.textContent = main;
    topDisplay.textContent = top;
}

function clearAll() {
    previousNum = 0;
    currentNum = 0;

    updateDisplay(0, '');
}

function calculate(num1, num2, op) {
    if (op === '+') solution = num1 + num2;
    if (op === '-') solution = num1 - num2;
    if (op === '×') solution = num1 * num2;
    if (op === '÷') solution = num1 / num2;

    if (String(solution).length > 9) solution = solution.toPrecision(1);
}

function getNumber() {
    if (
        operatorClicked ||
        equalsClicked ||
        (!currentNum && !mainDisplay.textContent.includes('.'))
    ) {
        mainDisplay.textContent = '';
    }

    mainDisplay.append(this.textContent);
    currentNum = +mainDisplay.textContent;
}

function getOperator() {
    currentOp = this.textContent;

    if (operatorClicked) {
        calculate(currentNum, currentNum, previousOp);
        updateDisplay(solution, `${solution} ${currentOp}`);

        currentNum = solution;
    } else if (equalsClicked || !previousNum) {
        updateDisplay(+currentNum, `${+currentNum} ${currentOp}`);
    } else {
        calculate(previousNum, currentNum, previousOp);
        updateDisplay(solution, `${solution} ${currentOp}`);
    }

    operatorClicked = true;
    previousOp = this.textContent;
    previousNum = +mainDisplay.textContent;
}

function getDecimal() {
    if (operatorClicked || equalsClicked) mainDisplay.textContent = 0;

    if (
        mainDisplay.textContent.includes('.') ||
        mainDisplay.textContent.includes('e')
    )
        return;

    mainDisplay.append(this.textContent);
    currentNum = mainDisplay.textContent;
}

function getPercent() {
    let percentage = currentNum / 100;

    if (String(percentage).length > 9) percentage = percentage.toPrecision(1);

    mainDisplay.textContent = percentage;
    currentNum = percentage;
}

function getAnswer() {
    if (!previousOp || topDisplay.textContent.includes('=')) return;

    if (operatorClicked) {
        calculate(previousNum, previousNum, previousOp);
        updateDisplay(
            solution,
            `${+previousNum} ${previousOp} ${+previousNum} =`
        );
    } else {
        calculate(previousNum, currentNum, previousOp);
        updateDisplay(
            solution,
            `${+previousNum} ${previousOp} ${+currentNum} =`
        );
    }

    equalsClicked = true;
    previousOp = '';
    previousNum = 0;
    currentNum = +mainDisplay.textContent;
}

function removeNumber() {
    const display = mainDisplay.textContent;

    mainDisplay.textContent = display.length > 1 ? display.slice(0, -1) : 0;
    currentNum = +mainDisplay.textContent;
}

numberBtns.forEach((e) => e.addEventListener('click', getNumber));
operatorBtns.forEach((e) => e.addEventListener('click', getOperator));
decimalBtn.addEventListener('click', getDecimal);
percentBtn.addEventListener('click', getPercent);
equalsBtn.addEventListener('click', getAnswer);
deleteBtn.addEventListener('click', removeNumber);
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

lightTheme.checked = true;
root.className = 'light';

document.querySelectorAll('input[type="radio"]').forEach((e) => {
    e.addEventListener('change', () => {
        root.className = lightTheme.checked ? 'light' : 'dark';
    });
});
