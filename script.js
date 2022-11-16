const display = document.querySelector('#output');
const operators = document.querySelectorAll('#operators > button');
const numbers = document.querySelectorAll('.number');
const clear = document.querySelector('#clear');
const equals = document.querySelector('#equals');
let numArr = [];
let opArr = [];
let op, num = '';

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

    return solution == Infinity ? 'ERROR' : solution;
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

const showNumber = (e) => {
    num += e.target.textContent;
    display.textContent = num;

    console.log(op);
    console.log(numArr);
}

const clearDisplay = () => {
    numArr = [];
    op = '';
    num = '';
    display.textContent = ''; 
}

const showOutput = () => {
    numArr.push(num);
    num = '';

    display.textContent = operate(op);
    numArr = [display.textContent];

    console.log(op);
    console.log(numArr);
}

operators.forEach(btn => btn.addEventListener('click', getOperator));
numbers.forEach(btn => btn.addEventListener('click', showNumber));
clear.addEventListener('click', clearDisplay);
equals.addEventListener('click', showOutput);