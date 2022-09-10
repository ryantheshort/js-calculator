//alert "hello" when page is refreshed
window.onload = function () {
	alert("hello");
}

function processCalculation(calculation){
	if(!(calculation.includes('+') || calculation.includes('-') || calculation.includes('*') || calculation.includes('x') || calculation.includes('\xF7') || calculation.includes('+/-') || calculation.includes('%'))){
		prev = calculation.join('');
	} else {
		calculation.forEach(element => {
			if(element === '+' || element === '-' || element === '*' || element === 'x' || element === '\xF7' || element === '+/-' || element === '%'){
				const joinCalc = calculation.join('').toString();
				console.log(joinCalc,'2');
				calcItems = joinCalc.split(element);
				console.log(calcItems.join(''), 'calcitems proc');
				if (calcItems.length = 3){
					console.log(calcItems.join('').toString(),'4');
					prev = calcItems[0];
					console.log(prev,'prev proc');
					current = calcItems[1];
					console.log(current,'current proc');
					op = element;
					console.log(op,'op proc');
				}else if(calcItems.length = 2){
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
		calculation.push(operator.toString());
	} else {
		calculate();
		updateDisplay();
		calculation.push(operator.toString());

	};
};

//Define a function named calculate that alerts() = when pressed; add this function as an event listener for the = button
function calculate(){
	console.log(calculation.join('').toString(),'1');
	calcItems = processCalculation(calculation);
	prev = parseFloat(calcItems[0]);
	current = parseFloat(calcItems[1]);
	op = calcItems[2].toString();
	if(prev !== 0 && current !== 0 && op !== ''){
		switch (op) {
			case '+'://for case + add the numbers
				computation = prev + current;
				break;//break so it doesn't do anything else
			case '-'://for case - subtract numbers
				computation = prev - current;
				break;
			case 'x'://for case x multiply numbers
				computation = prev * current;
				break;
			case '\xF7'://for case / divide numbers
				computation = prev / current;
				break;
			case '%':
				computation = .01 * prev;
				break;
			 case '+/-'://for case +/- switch the positive/negative of number
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
		currentOperandTextElement.innerText = prev;
	}else if(current !== ''	&& op !== '' && computation === ''){
		console.log('current string disp check');
		currentOperandTextElement.innerText = current;
	} else if(prev !== '' && current!==''	&& op !== '' && !isNaN(computation)){
		console.log('equal disp check');
		currentOperandTextElement.innerText = computation.toString();
		console.log(calculation.join(''), 'array check 1');
		calculation = [computation];
		console.log(calculation.join(''), 'array check 2');
	};
};

//define variables for calculator
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
var calcItems = [];
var prev = 0;
var current = 0;
var op = '';
var computation = '';
//Define a variable calculation pointing to an empty array
var calculation = [];





//create event listener for number buttons
numberButtons.forEach(button => { //loop through each button and add click event listener
	button.addEventListener('click', () => {
		pushNumber(button.innerText); //add number to input
		updateDisplay();
	});
});

//create event listener operation buttons: + - / * etc..
operationButtons.forEach(button => { //loop through each button and add click event listener
	button.addEventListener('click', () => {
		pushOperator(button.innerText); //add operator to input
	});
});

//add event listener to equals button
equalsButton.addEventListener('click', button => {
	calculate();
	updateDisplay();
});