let chart;
let chartData = {
    labels: [],
    datasets: [{
        label: 'Курс USDT/PLN',
        data: [],
        borderColor: 'rgba(0, 255, 0, 1)',
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        fill: true,
        tension: 0.1
    }]
};

// Функція для отримання історичних даних курсу USDT/PLN за 30 днів з CoinGecko API
async function fetchHistoricalData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/tether/market_chart?vs_currency=pln&days=30');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data.prices; // Повертаємо масив [timestamp, price]
    } catch (error) {
        console.error("Не вдалося отримати історичні дані від CoinGecko API:", error);
        return [];
    }
}

// Ініціалізація графіку з історичними даними
async function initChart() {
    const historicalData = await fetchHistoricalData();

    // Обробка історичних даних для отримання середніх значень за день
    let dailyData = {};
    
    historicalData.forEach(point => {
        const date = new Date(point[0]);
        const dateString = date.toLocaleDateString("uk-UA");

        if (!dailyData[dateString]) {
            dailyData[dateString] = [];
        }
        dailyData[dateString].push(point[1]);
    });

    // Розрахунок середнього значення за кожен день
    for (let date in dailyData) {
        const dailyAverage = dailyData[date].reduce((sum, value) => sum + value, 0) / dailyData[date].length;
        chartData.labels.push(date);
        chartData.datasets[0].data.push(dailyAverage);
    }

    const ctx = document.getElementById('rateChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });

    // Оновлюємо графік з поточним курсом і виводимо актуальну ціну
    updateChart();
}

// Функція для отримання поточного курсу USDT/PLN з CoinGecko API
async function fetchCurrentRate() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=pln');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data.tether.pln;
    } catch (error) {
        console.error("Не вдалося отримати дані від CoinGecko API:", error);
        return null;
    }
}

// Функція для оновлення графіку з новими даними і відображення актуальної ціни
async function updateChart() {
    const currentRate = await fetchCurrentRate();
    if (currentRate !== null) {
        const currentTime = new Date().toLocaleDateString("uk-UA");

        // Додаємо або оновлюємо дані для останнього дня
        if (chartData.labels[chartData.labels.length - 1] === currentTime) {
            chartData.datasets[0].data[chartData.datasets[0].data.length - 1] = currentRate;
        } else {
            chartData.labels.push(currentTime);
            chartData.datasets[0].data.push(currentRate);
        }

        // Оновлюємо графік
        chart.update();

        // Оновлюємо значення актуального курсу над графіком
        document.getElementById('currentRate').textContent = currentRate.toFixed(2) + " PLN";
    } else {
        console.error("Помилка оновлення графіку: курс не отримано.");
    }
}

// Запуск ініціалізації графіку після завантаження сторінки
document.addEventListener("DOMContentLoaded", function() {
    initChart();
});

// Функція для розрахунку обміну з урахуванням комісії
function calculateExchange() {
    const amount = parseFloat(document.getElementById("amount").value);
    const rate = chartData.datasets[0].data[chartData.datasets[0].data.length - 1];
    if (!isNaN(amount)) {
        const result = amount * rate * 1.1; // Врахування 10% комісії
        document.getElementById("result").textContent = result.toFixed(2) + " PLN";
    } else {
        alert("Введіть дійсну суму!");
    }
}

// Функція для ініціалізації карти


function initMap() {
    const location = { lat: 51.1089776, lng: 17.0326689 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: location,
    });
    const marker = new google.maps.marker.AdvancedMarkerElement({
        position: location,
        map: map,
    });
}

