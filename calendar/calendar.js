(() => {
    let calendarSection, nextButton, prevButton, todayButton, monthMatrix, currentMonth, monthSpan;

    window.addEventListener('load', () => {
        calendarSection = document.getElementById('calendar');
        nextButton = document.getElementById('next');
        prevButton = document.getElementById('prev');
        todayButton = document.getElementById('today');
        monthSpan = document.getElementById('month');

        nextButton.addEventListener('click', goNextMonth);
        prevButton.addEventListener('click', goPrevMonth);
        todayButton.addEventListener('click', goToday);

        goToday();
        init();
    });

    const init = () => {
        setMonthLabel();
        setMonthMatrix();
        renderMonthMatrix();
    };


    const capitalize = (value) =>
        value.charAt(0).toUpperCase() + value.slice(1);

    const setMonthLabel = () => {
        const label = currentMonth.toLocaleString('ru', { month: 'long' });

        monthSpan.innerText = `${capitalize(label)} ${currentMonth.getFullYear()}`;
    };

    const getWeekday = (date) => {
        const weekday = date.toLocaleString('ru', { weekday: 'long' });

        return capitalize(weekday);
    };

    const goNextMonth = () => {
        currentMonth = addMonths(currentMonth, 1);
        init();
    };

    const goPrevMonth = () => {
        currentMonth = addMonths(currentMonth, -1);
        init();
    };

    const goToday = () => {
        currentMonth = new Date();
        currentMonth.setDate(1);
        init();
    };

    const addMonths = (date, months) =>
        new Date(date.getFullYear(), date.getMonth() + months, date.getDate());

    const addDays = (date, days) =>
        new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

    const settingInPropgress = (currentDay) =>
        currentDay.getMonth() === currentMonth.getMonth();

    const setMonthMatrix = () => {
        monthMatrix = [];
        const firstMonthDay = new Date(currentMonth);
        const firstMonthDayIndex = firstMonthDay.getDay() || 7;
        const firstMatrixDay = addDays(firstMonthDay, 1 - firstMonthDayIndex);
        let currentDay = new Date(firstMatrixDay);
        let week;

        do {
            week = [];

            for (let i = 0; i < 7; i++) {
                week.push(addDays(currentDay, i));
            }

            monthMatrix.push(week);
            currentDay = addDays(currentDay, 7);
        } while (settingInPropgress(currentDay));
    };

    const renderMonthMatrix = () => {
        calendarSection.innerHTML = '';
        const table = document.createElement('table');

        monthMatrix.forEach((week, index) => {
            addWeekRow(table, week, !index);
        });

        calendarSection.appendChild(table);
    };

    const addWeekRow = (table, week, isFirstWeek) => {
        const tr = document.createElement('tr');

        week.forEach(day => {
            addDayCell(tr, isFirstWeek ? getFirstWeekDayLabel(day) : getDayLabel(day));
        });

        table.appendChild(tr);
    };

    const addDayCell = (tr, dayLabel) => {
        const td = document.createElement('td');
        td.innerText = dayLabel;
        td.className = 'day';
        tr.appendChild(td);
    };

    const getDayLabel = (day) =>
        day.getDate();

    const getFirstWeekDayLabel = (day) =>
        `${getWeekday(day)}, ${day.getDate()}`;
})();
