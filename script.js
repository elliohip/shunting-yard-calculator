let numButtonArray = [];

let numbers = document.getElementById("number-button");


/** 
 * this array will store string data for the type of operation,
 * as well as the number that is performed by
*/
let ArrOfTotals = [];

/**
 * stores the operations
 */
let operations = [];


/**
 * this will store the numbers for the equation in an array to be added
 */
let equationArray = [];

let equationString = "";

var display = document.getElementById("display")

let clearBtn = document.getElementById("clear");



let selections = [];

var operationCount = 0;

let amountSelected = 0;

let totalNumbers = 0;

let operators = ["x", "/", "+", "-"];


// this is an object for each of the operators, and allots a precedence to each of them, do the 




// create a new Stack datatype to hold the values for Shunting Yard
class Stack {

    constructor() {
        this.items = [];
        
    }

    push(item) {
        this.items.push(item);
    }

    pop() {
        if (this.items.length == 0) {
            return "no items in list"
        }
        
        return this.items.pop();

    }

    clear() {
        this.items = [];
        
    }

    peek() {
        return this.items[this.items.length - 1]
    }

    isEmpty() {
        return this.items.length == 0;
    }

}

class Queue {
    constructor() {
        this.items = [];
        this.head = 0;
        this.tail = 0;
    }

    enqueue(element) {
        this.items[this.tail] = element;
        this.tail++;
    }

    dequeue() {

        let item = this.items[this.head];
        delete this.items[this.head];
        this.head++;
        return item;
    }

    peek() {
        return this.items[this.head];
    }

    get length() {
        return (this.tail - this.head);
    }

    get isEmpty() {

        return (this.tail - this.head) > 0

    }

    clear() {
        this.items = [];
        this.tail = 0;
        this.head = 0;
    }

}

let numberStack = new Stack();

let operatorStack = new Stack();

let outputQueue = new Queue();

/**
 * 
 * sets the display to whatever is passed int the parameter
 * 
 * @param {String} input 
 */
function setDisplay(input) {
    display.innerHTML = input;
}




function operateEv(e) {

    console.log(getNumber());

    outputQueue.enqueue(Number(getNumber()));

    let expressionPol = toString(equationArray) + String(getNumber());

    let index1 = 0;

    let index2 = 0;

    let numb1 = outputQueue.dequeue();
    let numb2 = undefined;
    let operator = undefined;

    let answer;

    console.log(outputQueue);
    

    for (let i = 0; i < operatorStack.items.length; i++) {

        if (outputQueue.length > 1) {
            numb1 = outputQueue.dequeue();
        }
        else {
            
        }

        if (outputQueue.length >= 1) {
            numb2 = outputQueue.dequeue();
        }
        

        operator = operatorStack.pop();
        answer = operate(numb1, numb2, operator);

        

        console.log( "iteration: "  + i + "  number1: " + numb1 + "  number2: " + numb2 + "  operator: " + operator);

        
        outputQueue.enqueue(answer);
        

        console.log(outputQueue);



    }



    setDisplay(answer);
}



function makeExpression(e) {

    let length = 0;


    outputQueue.enqueue(Number(getNumber()));

    operatorStack.push(e.target.innerHTML);
    equationArray[length] = operatorStack.peek();

    length++;


    selections = [];
    amountSelected = 0;
    

}

function opExpression() {


};

function operate(a, b, o) {
    if (o == "+") {
        return a + b;
    }
    if (o == "-") {
        return a - b;
    }
    if (o == "x") {
        return a * b;
    }
    if (o == "/") {
        return a / b;
    }
}

/**
 * returns the precedence, higher is better
 * 
 * @param {char} o 
 */
function getPrecedence(o) {
    if (o == "x") {
        return 4;
    } else if (o == "/") {
        return 3;
    } else if (o == "+") {
        return 2;
    } else if (o == "-") {
        return 1;
    } else {
        return 0;
    }
}

/*
i < expressionPol.length && 
            (expressionPol.charAt(i) == '+' || expressionPol.charAt(i) == '-' || expressionPol.charAt(i) == '*' || expressionPol.charAt(i) == '/')
*/






// Initialize the operator eventListeners
document.getElementById("add").addEventListener("click", makeExpression);
document.getElementById("subtract").addEventListener("click", makeExpression);
document.getElementById("multiply").addEventListener("click", makeExpression);
document.getElementById("divide").addEventListener("click", makeExpression);

document.getElementById("equalsBtn").addEventListener("click", operateEv);
// Exponent one add later



function toString(arr) {

    var string = arr.toString();

    var answer = "";
    
    for (var i = 0; i < string.length; i++) {
        if (string.charAt(i) != ",") {
            answer += string.charAt(i);
        }
    }
    return answer;
}


/**
 * 
 * @param {Event Object} e event object
 */
function chooseNumber(e) {
    if (amountSelected < 10) {
        selections[amountSelected] = Number(e.target.innerHTML);
        amountSelected++;

        console.log(getNumber().toString());

        setDisplay(toString(selections));
    }

    console.log("number chosen");
    console.assert(selections.length > 0);
    console.log(e.target.innerHTML);
    console.log(ArrOfTotals);

    console.log("Selections" + selections);
    // for (let i = 0; i < selections.length; i++) {
    //     console.log(selections);
    // }
    
}



function clearAll() {

    ArrOfTotals = [];
    selections = [];

    numberStack.clear();



    amountSelected = 0;
    totalNumbers = 0;
    equation = 0;

    setDisplay(0);
}

clearBtn.addEventListener("click", clearAll);





/**
 * 
 * @param {* number multiplied} x 
 * @param {* exponent number} n 
 * @returns the value of x to the nth power
 */
function exponent(x, n) {

    
    var ex = 1;

    if (n == 0) {

        // console.log(1);
        return 1;
    }
    if (n > 0) {
        for (let i = 0; i < n; i++) {
            ex = ex * x;
            // console.log(ex);
        }
    }
    else {
        for (let i = 0; i > n; i--) {
            ex = ex / x;
            // console.log(ex);
        }
    }

    return ex;
}



/**
 * 
 * @returns {Number} a value for the number that the user is currently typing
 */
function getNumber() {

    var answer = 0;

    for (var i = 0; i < selections.length; i++) {
        
        if (selections.length != 0) {
            answer += (selections[i] * exponent(10, ((selections.length - 1) - i)));
        }
        
    }



    
    

    return answer;
}






/**
 * 
 * @param {character} char character that is being evaluated
 * @returns boolean
 */
function isOperator(char) {
    if (char == '+') {
        return true;
    } else if (char == '-') {
        return true;
    } else if (char == 'x') {
        return true;
    } else if (char == '/') {
        return true;
    }
}




function evaluate() {

}



document.getElementById("equalsBtn").addEventListener("click", operateEv);

// getEquation();







/**
 * Creates the number buttons for the user to use and interact with
 */
function createNumbers() {

    

    for (let i = 0; i <= 9; i++) {
        let but = document.createElement("button");

        numbers.appendChild(but);

        numButtonArray[i] = but;
        
        if (i == 9) {

            but.innerHTML = 0;

        } else {
            but.innerHTML = i + 1;
        }


        
        but.style.height = "20%";
        but.style.display = "flex";
        but.style.flexBasis = "1 1 0";

        but.addEventListener("click", chooseNumber);
        

    }

    
}

createNumbers();



