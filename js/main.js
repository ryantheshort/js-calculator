class Calculator {
	//constructor for class
	constructor(previousOperandTextElement,currentOperandTextElement){
		this.previousOperandTextElement = previousOperandTextElement;
		this.currentOperandTextElement = currentOperandTextElement;
		this.clear();
	}
	
	clear(){
		this.currentOperand = '';
		this.previousOperand = '';
		this.operation = undefined;
	}
	
	//add input numbers to current operand string, don't let it repeat periods
	appendNumber(number){
		//check if current button pressed is period or current operand text has a period symbol, return function if so (keeps rest of function from executing)
		if (number === '.' && this.currentOperand.includes('.')) return;
		//set current operand to whatever it already is "plus" the input number, make everything a string so it doesn't try to add numbers
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}
	
	//choose + - * / etc...
	chooseOperation(operation){
		//check if current operation is empty so it doesn't execute if so
		if(this.currentOperand === '') return;
		//if previous operand is not equal to empty string then do the computation
		//console.log(operation);
		if (this.previousOperand !== '') {
			this.compute();
		}
		//set current operation
		this.operation = operation;
		//set previous operand to current operand if we are done inputing
		this.previousOperand = this.currentOperand;
		//clear out current operand
		this.currentOperand = '';
	}
	
	//does mathmatical computations based on inpuuts
	compute(){
		//define variables
		let computation;//computation variable (let)
		const prev = parseFloat(this.previousOperand);//previous variable set as a number (parseFloat) of the previous operand in order to do calculations
		const current = parseFloat(this.currentOperand);//current variable set as a number of the current operand in order to do calculations
		//check if user has actually entered anything
		if (isNaN(prev) || isNaN(current)) return //checks if current or previous variables are not numbers and returns (keeps rest of function from executing) if so
		//use switch statement instead of a bunch of if statements
		//console.log(this.operation,"2");
		switch (this.operation) {
			case '+'://for case + add the numbers
				computation = prev + current;
				break;//break so it doesn't do anything else
			case '-'://for case - subtract numbers
				computation = prev - current;
				break;
			case 'x'://for case x multiply numbers
				computation = prev * current;
				break;
			case '÷'://for case / divide numbers
				computation = prev / current;
				break;
/* 			case '+/-'://for case +/- switch the positive/negative of number
				computation = -current;
				break;
			case '%'://find percent of number
				computation = current / 100;
				break; */
			default: //execute if none of symbols match operation
				return;//don't want to do computation if none match
		}
		//set computation that has been done
		this.currentOperand = computation;
		//console.log(this.currentOperand);
		this.operation = undefined;
		this.previousOperand = '';
		
	}
	
	//use function to put comma ',' in output
	getDisplayNumber(number){
		//set number to a string value
		const stringNumber = number.toString();
		//get number before decimal place
		const integerDigits = parseFloat(stringNumber.split('.')[0]);
		//get numbers after decimial place
		const decimalDigits = stringNumber.split('.')[1];
		//set text value for display
		let integerDisplay;
		//check if ingergerDigits is not a number
		if (isNaN(integerDigits)) {
			//if not set to empty string
			integerDisplay = '';
		}
		else {
			//if it is use toLocaleString to format
			integerDisplay = integerDigits.toLocaleString('en', {
				maximumFractionDigits: 0});
		}
		//check if there were numbers after decimal
		if (decimalDigits != null) {
			//if there are concatenate back together and format as string
			return `${integerDisplay}.${decimalDigits}`;
		}
		else {
			//if there are not just return integerDisplay
			return integerDisplay;
		}
	}
	
	//output
	updateDisplay(){
		this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);//set the currentoperand text output to the current operand, use getDisplayNumber() to add commas
		//check for operation and display
		if(this.operation != null) {
			this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;//concatenate the operation to the previous operand
		}//need to clear value if operation does not exist
		else {
			this.previousOperandTextElement.innerText = '';
		}
	}
}
//define variables for calculator
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

//create a new calculator object using the class
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);


//use calculator object for number buttons
numberButtons.forEach(button => { //loop through each button and add click event listener
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText); //add number to input
		calculator.updateDisplay();//udpate output
		
	});
});


//use calculator object for operation buttons: + - / * etc..
operationButtons.forEach(button => { //loop through each button and add click event listener
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText); //add number to input
		calculator.updateDisplay();//udpate output
		
	});
});

//add event listener to equals button
equalsButton.addEventListener('click', button => {
	calculator.compute();
	calculator.updateDisplay();
});

//add event listenter to all clear button
allClearButton.addEventListener('click', button => {
	calculator.clear()/
	calculator.updateDisplay();
});