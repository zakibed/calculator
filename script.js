const display = document.querySelector('#output');
const operators = document.querySelectorAll('#operators > button');
const numbers = document.querySelectorAll('.number');
const clear = document.querySelector('#clear');
const equals = document.querySelector('#equals');

let numArr = [];
let op = '';
let num = '';
let output = 0;

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

const operate = (op, arr) => {
    return numArr.reduce((total, num) => {
        parseInt(num);
        return op == '+' ? add(total, num) 
              : op == '-' ? subtract(total, num) 
              : op == '*' ? multiply(total, num) 
              : divide(total, num); 
    });
}

const showOperator = (e) => {
    op = e.target.value;
    numArr.push(num);
    num = '';
}

const showNumber = (e) => {
    num += e.target.textContent;
    display.textContent = num;
}

const showOutput = () => {
    display.textContent = operate(op, numArr);
}

operators.forEach(btn => {
    btn.addEventListener('click', showOperator);
});

numbers.forEach(btn => {
    btn.addEventListener('click', showNumber);
});

equals.addEventListener('click', showOutput);

clear.addEventListener('click', () => {
    display.textContent = ''; 
    numArr = [];
    op = '';
    num = '';
});
