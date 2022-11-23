const input = document.querySelector('#display > div:first-of-type'),
      output = document.querySelector('#display > div:last-of-type');

const operators = document.querySelectorAll('.operator'),
      numbers = document.querySelectorAll('.number'),
      decimal = document.querySelector('#decimal'),
      plusMinus = document.querySelector('#plus-minus'),
      percent = document.querySelector('#percent'),
      buttons = document.querySelectorAll('button:not(#equals)');

const clear = document.querySelector('#clear'),
      equals = document.querySelector('#equals');
      
const error = document.querySelector('#error');

const root = document.querySelector(':root'),
      body = document.querySelector('body'),
      inputs = document.querySelectorAll('input'),
      defaultTheme = document.querySelector('input[value="default"]'),
      darkTheme = document.querySelector('input[value="dark"]');

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
    if (check == true) numArr.push(output.textContent);

    op = e.target.value;
    opArr.push(op);

    output.textContent = (opArr.length >= 2) ? operate(opArr[opArr.length - 2]) : operate(op);
    input.textContent = `${output.textContent} ${e.target.textContent}`;
    input.style.visibility = 'visible';

    numArr = [output.textContent];
    check = true;
    num = '';

    console.log(`operator : ${op}`);
    console.log(opArr);
}

const getNumber = (e) => {
    if (check == false) numArr = [];

    num += e.target.textContent; 
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

// set theme
defaultTheme.checked = true;

inputs.forEach(input => {
    input.onchange = () => {
        const setColor = (v, val) => root.style.setProperty(v, val);

        if (defaultTheme.checked == true) {
            buttons.forEach(btn => btn.style.borderColor = 'white');

            body.style.background = 'linear-gradient(135deg,#FFB178 55%, #F5A66B 45%)';
            body.style.color = 'black';

            setColor('--btn-background', '#faf7f9');
            setColor('--cont-background', '#EBEBEB');
            setColor('--color-one', '#919191');
            setColor('--color-two', '#757576');
            setColor('--color-three', '#182229');
            setColor('--btn-shadow', '127, 127, 127');
            setColor('--cont-shadow-one', '192, 192, 192');
            setColor('--cont-shadow-two', '138, 92, 40');
            setColor('--eq-shadow', '140, 140, 140');
        } else {
            buttons.forEach(btn => btn.style.borderColor = '#314352');

            body.style.background = 'linear-gradient(135deg, #23303c 55%, #1f2934 45%)';
            body.style.color = 'white';

            setColor('--btn-background', '#283947');
            setColor('--cont-background', '#243441');
            setColor('--color-one', '#738390');
            setColor('--color-two', '#ed802e');
            setColor('--color-three', '#faf7f9');
            setColor('--btn-shadow', '9, 15, 19');
            setColor('--eq-shadow', '9, 15, 19');
            setColor('--cont-shadow-one', '21, 30, 37');
            setColor('--cont-shadow-two', '9, 15, 19');
        }
    }
});

// keyboard support
const getKey = (e) => {
    key = e.shiftKey ? document.querySelector(`button[data-key="${e.keyCode} sh"]`) 
        : document.querySelector(`button[data-key="${e.keyCode}"]`);

    if (!key) return;

    if (key.className == 'number') {
        if (check == false) numArr = [];
    
        num += key.textContent; 
        output.textContent = num;
    
        check = true;
    
        console.log(`number : ${output.textContent}`);
    }

    if (key.className == 'operator') {
        if (check == true) numArr.push(output.textContent);

        op = key.value;
        opArr.push(op);

        output.textContent = (opArr.length >= 2) ? operate(opArr[opArr.length - 2]) : operate(op);
        input.textContent = `${output.textContent} ${key.textContent}`;
        input.style.visibility = 'visible';

        numArr = [output.textContent];
        check = true;
        num = '';

        console.log(`operator : ${op}`);
        console.log(opArr);
    }

    if (key.id == 'decimal') getDecimal();
    if (key.id == 'percent') getPercent();
    if (key.id == 'clear') reset();
    if (key.id == 'equals') getOutput();

    key.classList.add('active');

    e.preventDefault();
}

window.addEventListener('keydown', getKey);

buttons.forEach(btn => {
    btn.addEventListener('transitionend', () => btn.classList.remove('active'));
});