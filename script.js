const display = document.querySelector('#output');
const operators = document.querySelectorAll('#operators > button');
const numbers = document.querySelectorAll('.number');
const clear = document.querySelector('#clear');
const equals = document.querySelector('#equals');

let displayValue = 0;

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

const operate = (op, n1, n2) => {
    return op == '+' ? add(n1, n2) 
          : op == '-' ? subtract(n1, n2) 
          : op == '*' ? multiply(n1, n2) 
          : divide(n1, n2);
}

const showOperator = (e) => {
    console.log(e.target.value);
}

const showNumber = (e) => {
    display.textContent += e.target.textContent;
    displayValue = display.textContent;
}

operators.forEach(btn => {
    btn.addEventListener('click', showOperator);
});

numbers.forEach(btn => {
    display.textContent = '';
    btn.addEventListener('click', showNumber);
});

clear.addEventListener('click', () => {
    displayValue = 0;
    display.textContent = ''; 
});