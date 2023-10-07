/*Miscellaneous functions to enable and disable operator button when they are
not needed.*/
// Import essential dom elements.
const display = document.querySelector('.display');
const operatorButtons = document.querySelectorAll(
	'.operators,.special-operators'
);

export const miscFunctions = {
	disableOperatorButtons() {
		operatorButtons.forEach((element) => {
			element.disabled = true;
			display.textContent =
				'Please start entering numbers to initiate calculations';
		});
	},
	enableOperatorButtons() {
		operatorButtons.forEach((element) => {
			element.disabled = false;
		});
	},
};
