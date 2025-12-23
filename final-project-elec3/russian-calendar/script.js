// Russian work calendar application
class RussianCalendar {
    constructor() {
        this.currentYear = new Date().getFullYear();
        this.today = new Date();
        this.monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        this.dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        this.init();
    }

    init() {
        this.loadDarkMode();
        this.setupEventListeners();
        this.renderCalendar();
    }

    setupEventListeners() {
        document.getElementById('prevYear').addEventListener('click', () => {
            this.currentYear--;
            this.renderCalendar();
        });

        document.getElementById('nextYear').addEventListener('click', () => {
            this.currentYear++;
            this.renderCalendar();
        });

        document.getElementById('darkModeToggle').addEventListener('click', () => {
            this.toggleDarkMode();
        });

        document.getElementById('searchBtn').addEventListener('click', () => {
            this.searchDate();
        });

        document.getElementById('clearSearch').addEventListener('click', () => {
            this.clearSearch();
        });

        // Allow Enter key to trigger search
        ['searchYear', 'searchMonth', 'searchDay'].forEach(id => {
            document.getElementById(id).addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.searchDate();
                }
            });
        });
    }

    // Dark mode functionality
    loadDarkMode() {
        const darkMode = localStorage.getItem('darkMode') === 'true';
        if (darkMode) {
            document.body.classList.add('dark-mode');
            document.getElementById('darkModeToggle').textContent = '☀️';
        }
    }

    toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        document.getElementById('darkModeToggle').textContent = isDarkMode ? '☀️' : '🌙';
    }

    // Search functionality
    searchDate() {
        const year = parseInt(document.getElementById('searchYear').value);
        const monthInput = document.getElementById('searchMonth').value;
        const dayInput = document.getElementById('searchDay').value;

        if (!year || isNaN(year)) {
            alert('Please enter a valid year');
            return;
        }

        // Clear previous highlights
        document.querySelectorAll('.day.highlight').forEach(el => {
            el.classList.remove('highlight');
        });

        // Change year if different
        if (year !== this.currentYear) {
            this.currentYear = year;
            this.renderCalendar();
        }

        // Highlight specific date or month
        setTimeout(() => {
            if (monthInput !== '' && dayInput) {
                // Search for specific date
                const month = parseInt(monthInput);
                const day = parseInt(dayInput);
                this.highlightDate(month, day);
            } else if (monthInput !== '') {
                // Highlight entire month
                const month = parseInt(monthInput);
                this.highlightMonth(month);
            }
        }, 100);
    }

    highlightDate(month, day) {
        const months = document.querySelectorAll('.month');
        if (months[month]) {
            const days = months[month].querySelectorAll('.day:not(.empty)');
            days.forEach(dayEl => {
                if (parseInt(dayEl.textContent) === day) {
                    dayEl.classList.add('highlight');
                    dayEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        }
    }

    highlightMonth(month) {
        const months = document.querySelectorAll('.month');
        if (months[month]) {
            months[month].scrollIntoView({ behavior: 'smooth', block: 'center' });
            const days = months[month].querySelectorAll('.day:not(.empty)');
            days.forEach(dayEl => {
                dayEl.classList.add('highlight');
            });
        }
    }

    clearSearch() {
        document.getElementById('searchYear').value = this.currentYear;
        document.getElementById('searchMonth').value = '';
        document.getElementById('searchDay').value = '';
        document.querySelectorAll('.day.highlight').forEach(el => {
            el.classList.remove('highlight');
        });
    }

    // Russian holidays and special dates
    getHolidays(year) {
        const holidays = {
            // New Year holidays (January 1-8)
            '01-01': 'New Year',
            '01-02': 'New Year Holidays',
            '01-03': 'New Year Holidays',
            '01-04': 'New Year Holidays',
            '01-05': 'New Year Holidays',
            '01-06': 'New Year Holidays',
            '01-07': 'Orthodox Christmas',
            '01-08': 'New Year Holidays',
            // Defender of the Fatherland Day
            '02-23': 'Defender of the Fatherland Day',
            // International Women's Day
            '03-08': 'International Women\'s Day',
            // Spring and Labour Day
            '05-01': 'Spring and Labour Day',
            // Victory Day
            '05-09': 'Victory Day',
            // Russia Day
            '06-12': 'Russia Day',
            // Unity Day
            '11-04': 'Unity Day'
        };

        return holidays;
    }

    // Pre-holiday shortened work days
    getShortDays(year) {
        const shortDays = [
            '02-22', // Before Defender's Day
            '03-07', // Before Women's Day
            '04-30', // Before May 1
            '05-08', // Before Victory Day
            '06-11', // Before Russia Day
            '11-03', // Before Unity Day
            '12-31'  // New Year's Eve
        ];
        return shortDays;
    }

    // Check if date is a holiday
    isHoliday(date) {
        const dateStr = this.formatDate(date);
        const holidays = this.getHolidays(date.getFullYear());
        return holidays[dateStr] !== undefined;
    }

    // Check if date is a short day
    isShortDay(date) {
        const dateStr = this.formatDate(date);
        const shortDays = this.getShortDays(date.getFullYear());
        return shortDays.includes(dateStr);
    }

    // Check if date is weekend (Saturday or Sunday)
    isWeekend(date) {
        const day = date.getDay();
        return day === 0 || day === 6;
    }

    // Check if date is today
    isToday(date) {
        return date.getDate() === this.today.getDate() &&
               date.getMonth() === this.today.getMonth() &&
               date.getFullYear() === this.today.getFullYear();
    }

    // Format date as MM-DD
    formatDate(date) {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${month}-${day}`;
    }

    // Get day type
    getDayType(date) {
        if (this.isHoliday(date)) return 'holiday';
        if (this.isShortDay(date)) return 'short-day';
        if (this.isWeekend(date)) return 'weekend';
        return 'workday';
    }

    // Calculate statistics for the year
    calculateStats() {
        let totalDays = 0;
        let workDays = 0;
        let weekendDays = 0;
        let holidayDays = 0;

        for (let month = 0; month < 12; month++) {
            const daysInMonth = new Date(this.currentYear, month + 1, 0).getDate();
            
            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(this.currentYear, month, day);
                totalDays++;

                const dayType = this.getDayType(date);
                
                if (dayType === 'holiday') {
                    holidayDays++;
                } else if (dayType === 'weekend') {
                    weekendDays++;
                } else if (dayType === 'workday' || dayType === 'short-day') {
                    workDays++;
                }
            }
        }

        return { totalDays, workDays, weekendDays, holidayDays };
    }

    // Update statistics display
    updateStats() {
        const stats = this.calculateStats();
        document.getElementById('totalDays').textContent = stats.totalDays;
        document.getElementById('workDays').textContent = stats.workDays;
        document.getElementById('weekendDays').textContent = stats.weekendDays;
        document.getElementById('holidayDays').textContent = stats.holidayDays;
    }

    // Render month
    renderMonth(monthIndex) {
        const monthDiv = document.createElement('div');
        monthDiv.className = 'month';

        // Month name
        const monthName = document.createElement('div');
        monthName.className = 'month-name';
        monthName.textContent = this.monthNames[monthIndex];
        monthDiv.appendChild(monthName);

        // Day names header
        const daysHeader = document.createElement('div');
        daysHeader.className = 'days-header';
        this.dayNames.forEach(dayName => {
            const dayNameDiv = document.createElement('div');
            dayNameDiv.className = 'day-name';
            dayNameDiv.textContent = dayName;
            daysHeader.appendChild(dayNameDiv);
        });
        monthDiv.appendChild(daysHeader);

        // Days grid
        const daysGrid = document.createElement('div');
        daysGrid.className = 'days-grid';

        // Get first day of month (0 = Sunday, 1 = Monday, etc.)
        const firstDay = new Date(this.currentYear, monthIndex, 1).getDay();
        // Convert to Monday-based (0 = Monday, 6 = Sunday)
        const firstDayMonday = firstDay === 0 ? 6 : firstDay - 1;

        // Add empty cells for days before month starts
        for (let i = 0; i < firstDayMonday; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'day empty';
            daysGrid.appendChild(emptyDay);
        }

        // Get number of days in month
        const daysInMonth = new Date(this.currentYear, monthIndex + 1, 0).getDate();

        // Add days
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(this.currentYear, monthIndex, day);
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day';
            dayDiv.textContent = day;

            // Add appropriate class based on day type
            const dayType = this.getDayType(date);
            dayDiv.classList.add(dayType);

            // Highlight today
            if (this.isToday(date)) {
                dayDiv.classList.add('today');
            }

            // Add tooltip with holiday name
            const holidays = this.getHolidays(this.currentYear);
            const dateStr = this.formatDate(date);
            if (holidays[dateStr]) {
                dayDiv.title = holidays[dateStr];
            }

            daysGrid.appendChild(dayDiv);
        }

        monthDiv.appendChild(daysGrid);
        return monthDiv;
    }

    // Render entire calendar
    renderCalendar() {
        // Update year display
        document.getElementById('currentYear').textContent = this.currentYear;

        // Clear existing calendar
        const calendarDiv = document.getElementById('calendar');
        calendarDiv.innerHTML = '';

        // Render all months
        for (let month = 0; month < 12; month++) {
            const monthDiv = this.renderMonth(month);
            calendarDiv.appendChild(monthDiv);
        }

        // Update statistics
        this.updateStats();
    }
}

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RussianCalendar();
});
