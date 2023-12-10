export async function storePopularTimes(popularTimes) {
    try {
 const currentHour = new Date().getHours();
        const currentDay = new Date().getDay();
        const chartsContainer = document.getElementById('chartsContainer');

        for (let dayIndex = 1; dayIndex < popularTimes[0].length; dayIndex++) {
            const dayContainer = document.createElement('div');
            dayContainer.classList.add('chart');

            const header = document.createElement('div');
            header.classList.add('day-title');
            header.textContent = popularTimes[0][dayIndex];
            dayContainer.appendChild(header);

            if (dayIndex === currentDay + 1) {
                const currentStatus = document.createElement('div');
                currentStatus.classList.add('status');
                const currentValue = parseInt(popularTimes[currentHour + 1][dayIndex]);
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

            for (let i = 1; i < popularTimes.length; i++) {
                const hourContainer = document.createElement('div');
                hourContainer.classList.add('hour');
                if (i === currentHour + 0) {
                    hourContainer.classList.add('current-hour');
                }

                const hourLabel = document.createElement('div');
                hourLabel.classList.add('hour-label');
                hourLabel.textContent = popularTimes[i][0];
                hourContainer.appendChild(hourLabel);

                const bar = document.createElement('div');
                bar.classList.add('bar');
                bar.style.height = `${parseInt(popularTimes[i][dayIndex]) * 10}px`; // 10 times the value
                if (i === currentHour + 1) {
                    bar.classList.add('current-time');
                }
                hourContainer.appendChild(bar);

                dayContainer.appendChild(hourContainer);
            }

if (chartsContainer) {
            chartsContainer.appendChild(dayContainer);
} else {
console.error('chartsContainer element not found');
}
        }
    } catch (err) {
        console.log(err);
    }
}

export async function storePopularTimes(popularTimes) {
    const chartsContainer = document.getElementById('chartsContainer');
    if (!chartsContainer) {
        console.error('chartsContainer element not found');
        return;
    }

    // Clear existing content
    chartsContainer.innerHTML = '';

    popularTimes.forEach(dayData => {
        // Create chart div
        const chartDiv = document.createElement('div');
        chartDiv.className = 'chart';

        // Create day title div
        const dayTitleDiv = document.createElement('div');
        dayTitleDiv.className = 'day-title';
        dayTitleDiv.textContent = dayData.day; // Assuming dayData has a 'day' property
        chartDiv.appendChild(dayTitleDiv);

        // Create hours
        dayData.hours.forEach(hourData => {
            // Create hour div
            const hourDiv = document.createElement('div');
            hourDiv.className = 'hour';

            // Hour label
            const hourLabelDiv = document.createElement('div');
            hourLabelDiv.className = 'hour-label';
            hourLabelDiv.textContent = hourData.label; // Assuming hourData has a 'label' property

            // Bar div
            const barDiv = document.createElement('div');
            barDiv.className = 'bar';
            barDiv.style.height = hourData.value + 'px'; // Assuming hourData has a 'value' property

            hourDiv.appendChild(hourLabelDiv);
            hourDiv.appendChild(barDiv);
            chartDiv.appendChild(hourDiv);
        });

        chartsContainer.appendChild(chartDiv);
    });
}