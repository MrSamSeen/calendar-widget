const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
let currentDate = new Date();

function generateCalendar(year, month) {
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const today = new Date();

    let calendarHTML = '<table><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr><tr>';

    for (let i = 0; i < firstDay; i++) {
        calendarHTML += '<td></td>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        if ((day + firstDay - 1) % 7 === 0 && day !== 1) {
            calendarHTML += '</tr><tr>';
        }
        const isCurrentDay = (day === today.getDate() && month === today.getMonth() && year === today.getFullYear());
        calendarHTML += `<td class="${isCurrentDay ? 'current-day' : ''}">${day}</td>`;
    }

    while ((daysInMonth + firstDay) % 7 !== 0) {
        calendarHTML += '<td></td>';
        daysInMonth++;
    }

    calendarHTML += '</tr></table>';
    return calendarHTML;
}

function updateCalendar() {
    const year = parseInt(document.getElementById('yearSelect').value);
    const month = parseInt(document.getElementById('monthSelect').value);
    currentDate.setFullYear(year);
    currentDate.setMonth(month);
    document.getElementById('calendar').innerHTML = generateCalendar(year, month);
}

function populateSelects() {
    const monthSelect = document.getElementById('monthSelect');
    const yearSelect = document.getElementById('yearSelect');

    monthNames.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = month;
        monthSelect.appendChild(option);
    });

    const currentYear = currentDate.getFullYear();
    for (let year = currentYear - 10; year <= currentYear + 10; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }

    monthSelect.value = currentDate.getMonth();
    yearSelect.value = currentDate.getFullYear();
}

function changeMonth(delta) {
    currentDate.setMonth(currentDate.getMonth() + delta);
    document.getElementById('monthSelect').value = currentDate.getMonth();
    document.getElementById('yearSelect').value = currentDate.getFullYear();
    updateCalendar();
}

function goToToday() {
    currentDate = new Date();
    document.getElementById('monthSelect').value = currentDate.getMonth();
    document.getElementById('yearSelect').value = currentDate.getFullYear();
    updateCalendar();
}
document.addEventListener("DOMContentLoaded", function () {
    // Initialize the calendar
    populateSelects();
    updateCalendar();
});