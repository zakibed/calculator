const display = document.querySelector('#output');
const operators = document.querySelectorAll('#operators > button');
const numbers = document.querySelectorAll('.number');
const decimal = document.querySelector('#decimal');
const clear = document.querySelector('#clear');
const equals = document.querySelector('#equals');
const error = document.querySelector('#error');

let check = true;
let numArr = [],
    opArr = [];
let op = '';
let num = '';

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (op) => {
    numArr = numArr.map(num => Number(num));

    const solution = numArr.reduce((total, num) => { 
        return op == '+' ? add(total, num) 
              : op == '-' ? subtract(total, num) 
              : op == '*' ? multiply(total, num) 
              : divide(total, num); 
    });

    if (solution == Infinity || display.textContent == 'NaN') {
        error.style.display = 'block';
        return 'ERROR';
    }

    return Number(solution.toFixed(4));
}

const getOperator = (e) => {
    if (check == true) numArr.push(display.textContent);

    op = e.target.value;
    opArr.push(op);

    opArr.length >= 2 ? display.textContent = operate(opArr[opArr.length - 2]) 
                      : display.textContent = operate(op);

    numArr = [display.textContent];
    check = true;
    num = '';

    console.log(`operator : ${op}`);
}

const getNumber = (e) => {
    if (check == false) {
        check = true;
        numArr = [];
    }

    num += e.target.textContent; 
    display.textContent = num;

    check = true;

    console.log(`number : ${display.textContent}`);
}

const addDecimal = () => {
    if (!num[0]) num += '0';

    if (!num.includes('.')) {
        num += '.';
        display.textContent = num;
    }
}

const output = () => {
    if (!numArr.length) return;

    numArr.push(display.textContent);
    display.textContent = operate(op);

    numArr = [display.textContent];
    check = false;
    num = '';

    console.log(`[result : ${display.textContent}]`);
}

const reset = () => {
    check = true;
    numArr = [];
    opArr = [];
    op = '';
    num = '';
    display.textContent = '0'; 
    error.style.display = 'none';
}

operators.forEach(btn => btn.addEventListener('click', getOperator));
numbers.forEach(btn => btn.addEventListener('click', getNumber));
decimal.addEventListener('click', addDecimal);
equals.addEventListener('click', output);
clear.addEventListener('click', reset);