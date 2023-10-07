// Import modules.
import { miscFunctions } from './miscFunctions.js';

// get essential DOM elements.
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

// Declare global variables.
let finalInputs = [];
let initialInputs = [];
var operatorIndex = 0;
let operator;
let result;
let input;
let input1;
let input2;
let currentOperator;
let currentOperatorsList = [];

// Call startup functions.
miscFunctions.disableOperatorButtons();

// Define basic math functions.
function sum(input1, input2) {
	return (result = input1 + input2);
}
function subtract(input1, input2) {
	return (result = input1 - input2);
}
function multiply(input1, input2) {
	return (result = input1 * input2);
}
function divide(input1, input2) {
	return parseFloat((result = input1 / input2));
}
function negate(input1) {
	result = input1 * -1;
	display.textContent = result;
	return (finalInputs = [result]);
}
function percentage(input1) {
	result = input1 / 100;
	display.textContent = result;
	return (finalInputs = [result]);
}

// This function is called only when there are atleast two inputs. It then check
//for the correct operator and executes corresponding math function.
function evaluation(currentOperator, input1, input2) {
	// Check for operator type and evaluate accordingly.
	if (currentOperator === '+') {
		sum(input1, input2);
	}
	if (currentOperator === '-') {
		subtract(input1, input2);
	}
	if (currentOperator === '*') {
		multiply(input1, input2);
	}
	if (currentOperator === '/') {
		divide(input1, input2);
	}
	display.textContent = result;
	return (finalInputs = [result]);
}

// This function is called when "AC" button is clicked.It resets the calculator.
function reset() {
	display.textContent = '';
	miscFunctions.disableOperatorButtons();
	finalInputs = [];
	initialInputs = [];
	currentOperatorsList = [];
	result = 0;
	operatorIndex = 0;
}

// This function is when numbers are clicked, it adds them to input for evaluation.
function inputValues(button) {
	if(input){try {
		if(input.includes(".") && button.getAttribute('data-value') === '.'){
			throw new Error ("You can't enter more then one decimal point.");
		}
	} catch (error) {
		console.error(error.message)
		throw error;
	} }
	let initialInput = button.getAttribute('data-value');
	console.log(initialInput);
	initialInputs.push(initialInput);
	input = initialInputs.join('');
	display.textContent = input;
	return input;
}

// This function is called when operator buttons are clicked. It stores the
// operator clicked.
function operators(button) {
	finalInputs.push(input);
	operatorIndex++; //This will be used to access the correct operator
	input1 = parseFloat(finalInputs[0]); // Important to use parseFloat rather then parseInt as we want decimal numbers.
	input2 = parseFloat(finalInputs[1]);
	initialInputs = [];
	operator = button.getAttribute('data-value');
	currentOperatorsList.push(operator);
	currentOperator = currentOperatorsList[operatorIndex - 2];
	return input1, input2, currentOperator;
}

// This function is called when "=", "%" or "+/_" buttons are clicked.
function outPut(button) {
	finalInputs.push(input);
	operatorIndex++;
	input1 = parseFloat(finalInputs[0]);
	input2 = parseFloat(finalInputs[1]);
	initialInputs = [];
	operator = button.getAttribute('data-value');
	currentOperatorsList.push(operator);
	return (currentOperator = currentOperatorsList[operatorIndex - 2]);
}

// Add event listeners to buttons.
buttons.forEach((button) => {
	button.addEventListener('click', () => {
		// First ensure that user doesn't click on operation buttons without
		// entering any input.
		try {
			if (button.disabled === true) {
				throw new Error('Clicked operator button without entering any numbers');
			}
		} catch (error) {
			display.textContent = 'Please enter some number to start calculations';
			throw error; // This ensures that no further code is executed.
		}

		if (button.getAttribute('data-type') !== 'operator-button') {
			miscFunctions.enableOperatorButtons();
			inputValues(button);
		}
		if (
			button.getAttribute('data-type') === 'operator-button' &&
			button.getAttribute('data-value') !== 'AC' &&
			button.getAttribute('data-value') !== '=' &&
			button.getAttribute('data-value') !== '%' &&
			button.getAttribute('data-value') !== '+/-'
		) {
			operators(button);
		}
		if (button.getAttribute('data-value') === '=') {
			console.log('equal button clicked');
			outPut(button);
		}
		if (button.getAttribute('data-value') === '%') {
			outPut(button);
			percentage(input1, input2);
		}
		if (button.getAttribute('data-value') === '+/-') {
			outPut(button);
			negate(input1);
		}
		if (button.getAttribute('data-value') === 'AC') {
			reset();
		}
		if (finalInputs.length === 2) {
			evaluation(currentOperator, input1, input2);
		}
	});
});
