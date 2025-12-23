/**
 * Calculator Application
 * Handles calculator operations with safe expression evaluation
 */
class Calculator {
	constructor() {
		this.displayElement = document.getElementById('display');
		this.expression = '';
		this.VALID_CHARS_REGEX = /^[0-9+\-*/.()\s]+$/;
		this.PRECISION = 1e10;
		this.init();
	}

	/**
	 * Initialize event listeners
	 */
	init() {
		document.addEventListener('click', (e) => this.handleButtonClick(e));
		document.addEventListener('keydown', (e) => this.handleKeyboard(e));
	}

	/**
	 * Update display value
	 * @param {string} value - Value to display
	 */
	updateDisplay(value) {
		this.displayElement.value = value;
	}

	/**
	 * Clear all data
	 */
	clear() {
		this.expression = '';
		this.updateDisplay('');
	}

	/**
	 * Delete last character
	 */
	deleteLastChar() {
		this.expression = this.expression.slice(0, -1);
		this.updateDisplay(this.expression);
	}

	/**
	 * Append character to expression
	 * @param {string} char - Character to append
	 */
	append(char) {
		this.expression += char;
		this.updateDisplay(this.expression);
	}

	/**
	 * Validate expression contains only safe characters
	 * @param {string} expr - Expression to validate
	 * @returns {boolean}
	 */
	isValidExpression(expr) {
		return this.VALID_CHARS_REGEX.test(expr);
	}

	/**
	 * Round number to prevent floating-point precision issues
	 * @param {number} num - Number to round
	 * @returns {number}
	 */
	roundResult(num) {
		return Math.round((num + Number.EPSILON) * this.PRECISION) / this.PRECISION;
	}

	/**
	 * Evaluate the expression safely
	 */
	evaluate() {
		if (!this.expression) return;

		if (!this.isValidExpression(this.expression)) {
			this.handleError();
			return;
		}

		try {
			// Use Function constructor for safe evaluation in isolated scope
			const result = Function(`"use strict"; return (${this.expression})`)();
			const rounded = this.roundResult(result);
			const resultStr = String(rounded);
			this.updateDisplay(resultStr);
			this.expression = resultStr;
		} catch (error) {
			this.handleError();
		}
	}

	/**
	 * Handle calculation errors
	 */
	handleError() {
		this.updateDisplay('Error');
		this.expression = '';
	}

	/**
	 * Handle button clicks
	 * @param {Event} event - Click event
	 */
	handleButtonClick(event) {
		const button = event.target.closest('[data-key]');
		if (!button) return;

		const key = button.getAttribute('data-key');
		this.processKey(key);
	}

	/**
	 * Handle keyboard input
	 * @param {KeyboardEvent} event - Keyboard event
	 */
	handleKeyboard(event) {
		const { key } = event;

		switch (key) {
			case 'Enter':
				event.preventDefault();
				this.evaluate();
				break;
			case 'Backspace':
				event.preventDefault();
				this.deleteLastChar();
				break;
			case 'Escape':
				event.preventDefault();
				this.clear();
				break;
			default:
				if (/^[0-9+\-*/.()]$/.test(key)) {
					this.append(key);
				}
		}
	}

	/**
	 * Process calculator key action
	 * @param {string} key - Key value
	 */
	processKey(key) {
		switch (key) {
			case 'C':
				this.clear();
				break;
			case 'DEL':
				this.deleteLastChar();
				break;
			case '=':
				this.evaluate();
				break;
			default:
				this.append(key);
		}
	}
}

// Initialize calculator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
	new Calculator();
});
