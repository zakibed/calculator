const input = document.querySelector('#display > div:first-of-type'),
      output = document.querySelector('#display > div:last-of-type');

const operators = document.querySelectorAll('.operator'),
      numbers = document.querySelectorAll('.number'),
      decimal = document.querySelector('#decimal'),
      plusMinus = document.querySelector('#plus-minus'),
      percent = document.querySelector('#percent'),
      buttons = document.querySelectorAll('#buttons > button');

const clear = document.querySelector('#clear'),
      equals = document.querySelector('#equals');
      
const error = document.querySelector('#error');

let check = true;
let opArr = [];
let numArr = [];
let op, num = '';
let key;

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

    return Number(solution.toFixed(8));
}

const getOperator = (e) => {
    const target = key ? key : e.target;

    if (check == true) numArr.push(output.textContent);

    op = target.value;
    opArr.push(op);

    output.textContent = (opArr.length >= 2) ? operate(opArr[opArr.length - 2]) : operate(op);
    input.textContent = `${output.textContent} ${target.textContent}`;
    input.style.visibility = 'visible';

    numArr = [output.textContent];
    check = true;
    num = '';

    console.log(`operator : ${op}`);
    console.log(opArr);
}

const getNumber = (e) => {
    if (check == false) numArr = [];

    num += key ? key.textContent : e.target.textContent; 
    output.textContent = num;

    check = true;

    console.log(`number : ${output.textContent}`);
}

const getDecimal = () => {
    if (!num[0]) num += '0';

    if (!num.includes('.')) {
        num += '.';
        output.textContent = num;
    }
}

const getSign = () => {
    if (!output.textContent[0].includes('-')) {
        output.textContent = `-${output.textContent}`;
    } else {
        output.textContent = Math.abs(output.textContent);
    }

    if (check == false) numArr = [output.textContent];
}

const getPercent = () => {
    const percentage = output.textContent / 100;
    output.textContent = Number(percentage.toFixed(8));

    if (check == false) numArr = [output.textContent];
}

const getOutput = () => {
    if (!numArr.length || input.textContent.includes('=')) return;

    numArr.push(output.textContent);

    if (num[num.length - 1] == '.') {
        num = num.slice(0, [num.length - 1]);
        output.textContent = num;
    }

    input.textContent += ` ${output.textContent} =`;
    output.textContent = operate(op);

    numArr = [output.textContent];
    check = false;
    num = '';

    console.log(`[result : ${output.textContent}]`);
}

const reset = () => {
    check = true;
    opArr = [];
    numArr = [];
    op, num = '';
    key = '';
    output.textContent = '0'; 
    input.style.visibility = 'hidden';
    error.style.display = 'none';
}

operators.forEach(btn => btn.addEventListener('click', getOperator));
numbers.forEach(btn => btn.addEventListener('click', getNumber));
decimal.addEventListener('click', getDecimal);
plusMinus.addEventListener('click', getSign);
percent.addEventListener('click', getPercent);
equals.addEventListener('click', getOutput);
clear.addEventListener('click', reset);

// keyboard support
const getKey = (e) => {
    key = e.shiftKey ? document.querySelector(`button[data-key="${e.keyCode} sh"]`) 
        : document.querySelector(`button[data-key="${e.keyCode}"]`);

    if (!key) return;

    key.className == 'number' ? getNumber() 
        : key.className == 'operator' ? getOperator() 
        : key.id == 'decimal' ? getDecimal() 
        : key.id == 'percent' ? getPercent() 
        : key.id == 'equals' ? getOutput()
        : reset(); 

    if (key.id == 'equals') {
        equals.style.boxShadow = 'none';
        equals.style.border = 'none';
    }

    if (key.classList) key.classList.add('active');

    event.preventDefault();

    buttons.forEach(btn => {
        btn.addEventListener('transitionend', () => btn.classList.remove('active'));
    });

    equals.addEventListener('transitionend', () => {
        equals.style.boxShadow = 'var(--equals-shadow)';
        equals.style.borderTop = '3px solid var(--light-orange)';
    });
}

window.addEventListener('keydown', getKey);