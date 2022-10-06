
//alert "hello" when page is refreshed
window.onload = function () {
	alert("hello");
}

function clear(str){ //allows functionality for the AC button.
	console.log('I a hitting the clear button!', str)
	console.log(str,'clear');
	if(str === 'C') { // if the text is 'AC' then all data is cleared in array.
		clearText='AC'
		clearButton.innerText = clearText;
		currentOperandTextElement.innerText = '0';
	}else if (str === 'AC' && currentOperandTextElement.innerText === '0') { //if the text is just 'C', 
		clearText='C';
		currentOperandTextElement.innerText = '';
	} 
	
	if ((str ==='AC' && currentOperandTextElement.innerText === '') || str === 'reset'){
		console.log('ac check');
		currentOperandTextElement.innerText = '';
		calculation = [];
		current = 0;
		prev = [];
		op = '';
		calcItems = [];
		computation = '';
		console.log(calculation,prev, 'ac calc check');//issue is it takes a second AC click to enter this if statement and also the prev, current & op variables are not getting reset 
	}; //currently does not clear the last value from the original calc array.
};


function processCalculation(calculation){
	if(!(calculation.includes('+') || calculation.includes('-') || calculation.includes('*') || calculation.includes('x') || calculation.includes('\xF7') || calculation.includes('+/-') || calculation.includes('%'))){
		prev = calculation.join(''); //join takes all of the little boxes in your array, and squishes them into one data point. the empty string will ensure that there will be no separator character (a space).
	} else {
		calculation.forEach(element => { //for each element in the array, DO SOMETHING! 
			if(element === '+' || element === '-' || element === '*' || element === 'x' || element === '\xF7' || element === '+/-' || element === '%'){
				const joinCalc = calculation.join('').toString(); //joined the array back together into a string...
				console.log(joinCalc,'2');
				calcItems = joinCalc.split(element); //...then splits the string based on our OPERATOR. we want to focus on the numbers before/after an operator.
				console.log(calcItems.join(''), 'calcitems proc');
				if (calcItems.length = 2){
					console.log(calcItems.join('').toString(),'4');
					prev = calcItems[0];
					console.log(prev,'prev proc');
					current = calcItems[1];
					console.log(current,'current proc');
					op = element;
					console.log(op,'op proc');
				}else if(calcItems.length = 1){  // for your LENGTH: i.e. (A +) = 1 (A + B)=2.
					prev = calcItems[0];
					op = element;
				};
			};
		});
	};
	console.log(prev.toString(), 'prev 3');
	console.log(current.toString(), 'current 3');
	console.log(prev, current, op, '3');
	return [prev, current, op];
};

//Define a function named pushNumber that alert()s the number associated with its event argument when called; add this function as an event listener for the number buttons
function pushNumber (number) {
	//add check to not duplicate periods
	if (number === '.' && calculation.includes('.')) return;
	//add number to array
	calculation.push(number.toString());
};

//Define a function named pushOperator that alert()s the operator (+, -, *, /, C) associated with its event argument when called; add this function as an event listener for the operator buttons
function pushOperator(operator){
	if(!(calculation.includes('+') || calculation.includes('-') || calculation.includes('*') || calculation.includes('x') || calculation.includes('\xF7') || calculation.includes('+/-') || calculation.includes('%'))){
		calculation.push(operator.toString()); // if it DOES NOT include one of these ^^^operators already, then they can actually be used. prevents duplicate operators.
	} else {
		calculate();
		updateDisplay();
		calculation.push(operator.toString()); //stores the operator to be reused in the next calculation.
	};
};

//Define a function named calculate that alerts() = when pressed; add this function as an event listener for the = button. AKA "eval".
function calculate(){
	console.log(calculation.join('').toString(),'1');
	calcItems = processCalculation(calculation);
	prev = parseFloat(calcItems[0]);
	current = parseFloat(calcItems[1]);
	op = calcItems[2].toString();
	if(!isNaN(prev) && !isNaN(current) && op !== ''){
		switch (op) {
			case '+'://for case +, add the numbers
				computation = prev + current;
				break;//break so it doesn't do anything else
			case '-'://for case -, subtract numbers
				computation = prev - current;
				break;
			case 'x'://for case x, multiply numbers
				computation = prev * current;
				break;
			case '\xF7'://for case /, divide numbers
				computation = prev / current;
				break;
			case '%'://for case %, multiply by .01
				computation = .01 * prev;
				break;
			 case '+/-'://for case +/-, switch the positive/negative of number
				computation = -1 * prev;
				break;
			default: //execute if none of symbols match operation
				computation = '';
				return;//don't want to do computation if none match
			};
	} else {
		computation = '';
	};
		
};

	
//update display
function updateDisplay() {
	clearButton.innerText = 'C'; //when press a number, the updateDisplay function changes the 'AC' button to 'C'
	console.log(computation, 'comp disp');
	calcItems = processCalculation(calculation);
	console.log(calcItems.join(''),'calcitems disp');
	prev = calcItems[0].toString();
	console.log(prev, 'prev disp');
	console.log(calcItems[0].charAt(0), 'period check');
	current = calcItems[1].toString();
	console.log(current, 'current disp');
	op = calcItems[2].toString();
	console.log(op, 'op disp');
	if (prev !== '' &&  op === '' && computation === ''){
		console.log('prev string disp check');
		currentOperandTextElement.innerText = prev; //output the initial number
	}else if(current !== ''	&& op !== '' && computation === ''){
		console.log('current string disp check');
		currentOperandTextElement.innerText = current; //output the second number
	} else if(prev !== '' &&  current!==''	&& op !== '' && !isNaN(computation)){
		console.log('equal disp check');
		currentOperandTextElement.innerText = computation.toString(); //output the calculation result
		console.log(calculation.join(''), 'array check 1');
		calculation = [computation];
		console.log(calculation.join(''), 'array check 2');
	};
};

//define variables for calculator
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-all-clear]');
const currentOperandTextElement = document.querySelector('[data-current-operand]'); //currentOpereandTextElement, this is where a result(text) is being linked to and placed into the "current-operand" html element. Where your results/numbers are displayed.
// prev=initial operand the user enters. current=the 2nd operand the user enters. op=the operator the user selects.
var calcItems = [];
var prev = 0;
var current = 0;
var op = '';
var computation = '';
var clearText = '';
//Define a variable calculation pointing to an empty array
var calculation = [];
let usePreviousCalc = false;





//create event listener for number buttons
numberButtons.forEach(button => { //loop through each button and add click event listener
	button.addEventListener('click', () => {
		if(usePreviousCalc){
			console.log('firing');
			clear('reset');
			usePreviousCalc = false;
		};
		pushNumber(button.innerText); //add number to input
		updateDisplay();
	});
});

//create event listener operation buttons: + - / * etc.. (assigns a job to the 'click')
operationButtons.forEach(button => { //loop through each button and add click event listener
	button.addEventListener('click', () => {
		if(usePreviousCalc) {
			usePreviousCalc = false;
		};
		pushOperator(button.innerText); //add operator to input
	});
});

//add event listener to equals button
equalsButton.addEventListener('click', button => {
	usePreviousCalc = true;
	calculate();
	updateDisplay();
});

//add event listener to clear button
clearButton.addEventListener('click', button => {
	console.log(clearButton.innerText, 'clear test');
	clear(clearButton.innerText);
	
});