/**
 * Stopwatch Application
 * Handles time tracking with millisecond precision
 */
class Stopwatch {
	constructor() {
		this.timeElement = document.getElementById('time');
		this.startStopButton = document.getElementById('startStop');
		this.resetButton = document.getElementById('reset');

		this.startTime = 0;
		this.elapsed = 0; // milliseconds
		this.timerId = null;
		this.isRunning = false;

		this.TICK_INTERVAL = 10; // 10ms for smooth updates

		this.init();
	}

	/**
	 * Initialize event listeners and render initial state
	 */
	init() {
		this.startStopButton.addEventListener('click', () => this.toggleStartStop());
		this.resetButton.addEventListener('click', () => this.reset());
		this.render();
	}

	/**
	 * Format milliseconds to HH:MM:SS.CS format
	 * @param {number} ms - Milliseconds to format
	 * @returns {string} Formatted time string
	 */
	formatTime(ms) {
		const totalCentiseconds = Math.floor(ms / 10);
		const centiseconds = totalCentiseconds % 100;
		const totalSeconds = Math.floor(totalCentiseconds / 100);
		const seconds = totalSeconds % 60;
		const totalMinutes = Math.floor(totalSeconds / 60);
		const minutes = totalMinutes % 60;
		const hours = Math.floor(totalMinutes / 60);

		return [hours, minutes, seconds]
			.map((val) => String(val).padStart(2, '0'))
			.join(':') + '.' + String(centiseconds).padStart(2, '0');
	}

	/**
	 * Update display with current time
	 */
	render() {
		this.timeElement.textContent = this.formatTime(this.elapsed);
	}

	/**
	 * Internal tick function for timer updates
	 */
	tick() {
		const now = performance.now();
		this.elapsed = now - this.startTime;
		this.render();
	}

	/**
	 * Start the stopwatch
	 */
	start() {
		if (this.isRunning) return;

		this.isRunning = true;
		this.startTime = performance.now() - this.elapsed;
		this.timerId = setInterval(() => this.tick(), this.TICK_INTERVAL);
		this.updateButtonStates();
	}

	/**
	 * Stop the stopwatch
	 */
	stop() {
		if (!this.isRunning) return;

		this.isRunning = false;
		clearInterval(this.timerId);
		this.timerId = null;
		this.tick();
		this.updateButtonStates();
	}

	/**
	 * Toggle between start and stop
	 */
	toggleStartStop() {
		if (this.isRunning) {
			this.stop();
		} else {
			this.start();
		}
	}

	/**
	 * Reset the stopwatch
	 */
	reset() {
		this.stop();
		this.elapsed = 0;
		this.render();
	}

	/**
	 * Update button states based on running status
	 */
	updateButtonStates() {
		this.startStopButton.textContent = this.isRunning ? 'Stop' : 'Start';
		this.resetButton.disabled = this.isRunning;
	}
}

// Initialize stopwatch when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
	new Stopwatch();
});
