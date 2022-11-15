const display = document.querySelector('#output');
const operators = document.querySelectorAll('#operators > button');
const numbers = document.querySelectorAll('.number');
const clear = document.querySelector('#clear');
const equals = document.querySelector('#equals');
let numArr = [];
let check = true;
let op, num = '';

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

const operate = (op, arr) => {
    numArr = numArr.map(num => Number(num));
    return numArr.reduce((total, num) => {
        return op == '+' ? add(total, num) 
              : op == '-' ? subtract(total, num) 
              : op == '*' ? multiply(total, num) 
              : divide(total, num); 
    });
}

const getOperator = (e) => {
    if (check == true) numArr.push(num);
    op = e.target.value;
    num = '';
    check = false;

    display.textContent = operate(op, numArr);
}

const showNumber = (e) => {
    num += e.target.textContent;
    display.textContent = num;
    check = true;
}

const clearDisplay = () => {
    display.textContent = ''; 
    numArr = [];
    op = '';
    num = '';
}

const showOutput = () => {
    if (check == true) numArr.push(num);
    check = false;

    display.textContent = operate(op, numArr);
}

operators.forEach(btn => btn.addEventListener('click', getOperator));
numbers.forEach(btn => btn.addEventListener('click', showNumber));
clear.addEventListener('click', clearDisplay);
equals.addEventListener('click', showOutput);