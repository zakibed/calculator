let numArr = [];
let op, num = '';
const display = document.querySelector('#output');
const operators = document.querySelectorAll('#operators > button');
const numbers = document.querySelectorAll('.number');
const clear = document.querySelector('#clear');
const equals = document.querySelector('#equals');

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

const spliceArray = () => {
    const lastLength = numArr[numArr.length - 1].length;
    numArr.splice(numArr.length - lastLength, lastLength - 1);
}

const showOperator = (e) => {
    op = e.target.value;
    num = '';
    display.textContent = operate(op, numArr);
}

const showNumber = (e) => {
    num += e.target.textContent;
    display.textContent = num;

    numArr.push(num);
    spliceArray();
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