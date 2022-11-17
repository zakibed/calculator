const display = document.querySelector('#output');
const operators = document.querySelectorAll('#operators > button');
const numbers = document.querySelectorAll('.number');
const clear = document.querySelector('#clear');
const equals = document.querySelector('#equals');
const error = document.querySelector('#error');

let check = true;
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

    // if (numArr.includes(0)) {
    //     const index = numArr.findIndex(index => numArr[index] == 0);
    //     numArr.splice(index, 1);
    // }

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

    return solution;
}

const getOperator = (e) => {
    if (check == true) numArr.push(display.textContent);

    op = e.target.value;
    opArr.push(op);

    opArr.length >= 2 ? display.textContent = operate(opArr[opArr.length - 2]) 
                      : display.textContent = operate(op);

    numArr = [display.textContent];
    check = false;
    num = '';
    console.log(`operator : ${op}`);
}

const getNumber = (e) => {
    num += e.target.textContent; 
    display.textContent = num;

    check = true;
    console.log(`number : ${display.textContent}`);
}

const output = () => {
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
    display.textContent = ''; 
    error.style.display = 'none';
}

operators.forEach(btn => btn.addEventListener('click', getOperator));
numbers.forEach(btn => btn.addEventListener('click', getNumber));
equals.addEventListener('click', output);
clear.addEventListener('click', reset);