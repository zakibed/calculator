const display = document.querySelector('#output');
const operators = document.querySelectorAll('#operators > button');
const numbers = document.querySelectorAll('.number');
const clear = document.querySelector('#clear');
const equals = document.querySelector('#equals');
const error = document.querySelector('#error');

let numArr = [],
    opArr = [];
let op = '', 
    num = '';

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

    if (solution == Infinity) {
        error.style.display = 'block';
        return 'ERROR';
    }

    return solution;
}

const getOperator = (e) => {
    numArr.push(num);
    num = '';

    op = e.target.value;
    opArr.push(op);

    opArr.length >= 2 ? display.textContent = operate(opArr[opArr.length - 2]) 
                      : display.textContent = operate(op);
    numArr = [display.textContent];

    console.log(op);
    console.log(numArr);
}

const getNumber = (e) => {
    num += e.target.textContent;
    display.textContent = num;

    console.log(op);
    console.log(numArr);
}

const output = () => {
    numArr.push(num);
    num = '';

    display.textContent = operate(op);
    numArr = [display.textContent];

    console.log(op);
    console.log(numArr);
}

const reset = () => {
    numArr = [];
    opArr = [];
    op = '';
    num = '';
    display.textContent = ''; 
    error.style.display = 'none';
}

operators.forEach(btn => btn.addEventListener('click', getOperator));
numbers.forEach(btn => btn.addEventListener('click', getNumber));
equals.addEventListener('click', output);
clear.addEventListener('click', reset);