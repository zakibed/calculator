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
let solution = 0;
let previousNum = 0;
let currentNum = 0;
let previousOp = '';
let currentOp = '';

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
    switch (op) {
        case '+':
            solution = num1 + num2;
            break;
        case '-':
            solution = num1 - num2;
            break;
        case '×':
            solution = num1 * num2;
            break;
        case '÷':
            solution = num1 / num2;
            break;
        default:
            solution = 0;
    }

    if (String(solution).length > 9) {
        solution = solution.toPrecision(1);
    }
}

function getNumber(e) {
    const numContent = typeof e === 'string' ? e : this.textContent;

    if (
        operatorClicked ||
        equalsClicked ||
        (!currentNum && !mainDisplay.textContent.includes('.'))
    ) {
        mainDisplay.textContent = '';
    }

    mainDisplay.append(numContent);
    currentNum = +mainDisplay.textContent;
}

function getOperator(e) {
    const opContent = typeof e === 'string' ? e : this.textContent;

    currentOp = opContent;

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
    previousOp = opContent;
    previousNum = +mainDisplay.textContent;
}

function getDecimal() {
    if (['.', 'e'].some((n) => mainDisplay.textContent.includes(n))) return;

    if (operatorClicked || equalsClicked) {
        mainDisplay.textContent = 0;
    }

    mainDisplay.append('.');
    currentNum = mainDisplay.textContent;
}

function getPercent() {
    let percentage = currentNum / 100;

    if (String(percentage).length > 9) {
        percentage = percentage.toPrecision(1);
    }

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

    if (display.length > 1 && Number.isFinite(+display)) {
        mainDisplay.textContent = display.slice(0, -1);
    } else {
        mainDisplay.textContent = 0;
    }

    currentNum = +mainDisplay.textContent;
}

function getKey(e) {
    const operators = {
        '+': '+',
        '-': '-',
        '*': '×',
        '/': '÷'
    };
    const key = e.key;
    const btnEl = document.querySelector(`[data-code="${key.charCodeAt(0)}"]`);

    if (!Number.isNaN(+key)) getNumber(key);
    if (Object.keys(operators).includes(key)) getOperator(operators[key]);
    if (key === '.') getDecimal();
    if (key === '%') getPercent();
    if (key === '=' || key === 'Enter') getAnswer();
    if (key === 'Backspace' && !e.shiftKey) removeNumber();
    if (key === 'Delete' && !e.shiftKey) clearAll();

    if (key !== '=' || key !== 'Enter') {
        equalsClicked = false;
    }

    if (!Object.keys(operators).includes(key)) {
        operatorClicked = false;
    }

    if (btnEl !== null) {
        btnEl.classList.add('active');
        btnEl.addEventListener('transitionend', () => {
            btnEl.classList.remove('active');
        });
    }

    e.preventDefault();
}

lightTheme.checked = true;
root.className = 'light';

numberBtns.forEach((e) => e.addEventListener('click', getNumber));
operatorBtns.forEach((e) => e.addEventListener('click', getOperator));
decimalBtn.addEventListener('click', getDecimal);
percentBtn.addEventListener('click', getPercent);
equalsBtn.addEventListener('click', getAnswer);
deleteBtn.addEventListener('click', removeNumber);
clearBtn.addEventListener('click', clearAll);

document.querySelectorAll('button:not(#equals)').forEach((btn) =>
    btn.addEventListener('click', () => {
        equalsClicked = false;
    })
);

document.querySelectorAll('button:not(.operator)').forEach((btn) =>
    btn.addEventListener('click', () => {
        operatorClicked = false;
    })
);

document.querySelectorAll('input[type="radio"]').forEach((btn) => {
    btn.addEventListener('change', () => {
        root.className = lightTheme.checked ? 'light' : 'dark';
    });
});

document.addEventListener('keydown', getKey);
