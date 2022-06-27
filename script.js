const buttons = document.getElementsByClassName("key");
const input = document.getElementById("screen2");

var parsedValue = 0;
var stringValue = '';
var answer = 0;
var aggregatedValue = 0;
var operationToBeDone = null;

var isDataSufficient = false;

printValue(0);

const buttonValues = ['%', 'C', 'del', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', 'X', '0', '.', '='];

const operators = [
    '/', '*', '+', '-', '%', 'del', 'C', 'X', '='
    ]

Array.from(buttons).forEach((button, index) => {
    button.addEventListener("click", () => keyPressed(buttonValues[index]));
});

function keyPressed(keyValue){
    const isOperator = operators.includes(keyValue);
    if (!isOperator) {
        stringValue += keyValue;
        parsedValue = +stringValue;
        
        printValue(parsedValue);
    } else{
        
        if (!isDataSufficient) {
            if (keyValue !== '=') {
                operationToBeDone = keyValue;
            }
            aggregatedValue = parsedValue;
            isDataSufficient = true;
            stringValue = '';
            parsedValue = 0;
            return;
        }
        
        
        // printValue(answer);
        aggregatedValue = performOperation(aggregatedValue, operationToBeDone, parsedValue);
        printValue(aggregatedValue);
        answerSolved()
    }
}

function answerSolved() {
    isDataSufficient = false;
    operationToBeDone = null;
    stringValue = '';
    parsedValue = 0;
}

function performOperation(currentValue, operator, nextValue) {
    switch(operator) {
        case '+':
            return currentValue + nextValue;
        case '-':
            return currentValue - nextValue;
        case '*':
            return currentValue * nextValue;
        case '/':
            return currentValue / nextValue;
        case '%':
            return currentValue % nextValue;
        case 'C':
            return resetAll();    
        case 'del':
            return; 
        default:
            return currentValue;
    }
}

function resetAll() {
    stringValue = '';
    parsedValue = 0;
    answer = 0;
}

function consolePrint(msg) {
    document.getElementById("screen1").innerHTML = msg;
}

function printValue(value) {
    input.value = value;
}
