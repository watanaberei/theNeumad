export async function storePopuplarTimes(popularTimes) {
    try {
 const currentHour = new Date().getHours();
        const currentDay = new Date().getDay();
        const chartsContainer = document.getElementById('chartsContainer');

        for (let dayIndex = 1; dayIndex < data[0].length; dayIndex++) {
            const dayContainer = document.createElement('div');
            dayContainer.classList.add('chart');

            const header = document.createElement('div');
            header.classList.add('day-title');
            header.textContent = data[0][dayIndex];
            dayContainer.appendChild(header);

            if (dayIndex === currentDay + 1) {
                const currentStatus = document.createElement('div');
                currentStatus.classList.add('status');
                const currentValue = parseInt(data[currentHour + 1][dayIndex]);
                if (currentValue >= 0 && currentValue <= 5) {
                    currentStatus.textContent = "NOT BUSY";
                    currentStatus.classList.add('not-busy');
                } else if (currentValue > 5 && currentValue <= 10) {
                    currentStatus.textContent = "MODERATELY BUSY";
                    currentStatus.classList.add('moderately-busy');
                } else if (currentValue > 10 && currentValue <= 12) {
                    currentStatus.textContent = "BUSY";
                    currentStatus.classList.add('busy');
                } else {
                    currentStatus.textContent = "PACKED";
                    currentStatus.classList.add('packed');
                }

                dayContainer.appendChild(currentStatus);
            }

            for (let i = 1; i < data.length; i++) {
                const hourContainer = document.createElement('div');
                hourContainer.classList.add('hour');
                if (i === currentHour + 0) {
                    hourContainer.classList.add('current-hour');
                }

                const hourLabel = document.createElement('div');
                hourLabel.classList.add('hour-label');
                hourLabel.textContent = data[i][0];
                hourContainer.appendChild(hourLabel);

                const bar = document.createElement('div');
                bar.classList.add('bar');
                bar.style.height = `${parseInt(data[i][dayIndex]) * 10}px`; // 10 times the value
                if (i === currentHour + 1) {
                    bar.classList.add('current-time');
                }
                hourContainer.appendChild(bar);

                dayContainer.appendChild(hourContainer);
            }

            chartsContainer.appendChild(dayContainer);
        }
    } catch (err) {
        console.log(err);
    }
}