const topDisplay = document.querySelector('#display > div:first-of-type');
const mainDisplay = document.querySelector('#display > div:last-of-type');
const operatorBtns = document.querySelectorAll('.operator');
const numberBtns = document.querySelectorAll('.number');
const clearBtn = document.querySelector('#clear');
const deleteBtn = document.querySelector('#delete');
const percentBtn = document.querySelector('#percent');
const equalsBtn = document.querySelector('#equals');
let operatorClicked = false;

function getNumber() {
    mainDisplay.append(this.textContent);
}

function getOperator() {
    let operatorClicked = true;

    topDisplay.append(` ${mainDisplay.textContent} ${this.textContent}`);
}

function clearAll() {
    mainDisplay.textContent = '';
    topDisplay.textContent = '';
}

numberBtns.forEach((e) => {
    e.addEventListener('click', getNumber);
});

operatorBtns.forEach((e) => {
    e.addEventListener('click', getOperator);
});

clearBtn.addEventListener('click', clearAll);
