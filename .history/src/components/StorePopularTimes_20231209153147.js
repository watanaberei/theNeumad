export 
function storePopularTimes(popularTimes) {
    const chartsContainer = document.getElementById('chartsContainer');
    if (!chartsContainer) {
        console.error('chartsContainer element not found');
        return;
    }

    // Clear existing content
    chartsContainer.innerHTML = '';

    // Skip the first row as it contains header information
    for (let i = 1; i < popularTimes.length; i++) {
        const dayData = popularTimes[i];

        // Create chart div for each day
        const chartDiv = document.createElement('div');
        chartDiv.className = 'chart';

        // Create day title div
        const dayTitleDiv = document.createElement('div');
        dayTitleDiv.className = 'day-title';
        dayTitleDiv.textContent = dayData[0]; // Day of the week
        chartDiv.appendChild(dayTitleDiv);

        // Create hours
        for (let j = 1; j < dayData.length; j++) {
            // Create hour div
            const hourDiv = document.createElement('div');
            hourDiv.className = 'hour';

            // Hour label
            const hourLabelDiv = document.createElement('div');
            hourLabelDiv.className = 'hour-label';
            hourLabelDiv.textContent = popularTimes[0][j]; // Hour label from the header row

            // Bar div
            const barDiv = document.createElement('div');
            barDiv.className = 'bar';
            barDiv.style.height = dayData[j] + 'px'; // Height based on the data

            hourDiv.appendChild(hourLabelDiv);
            hourDiv.appendChild(barDiv);
            chartDiv.appendChild(hourDiv);
        }

        chartsContainer.appendChild(chartDiv);
    }
}