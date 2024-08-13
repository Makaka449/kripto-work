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

const translations = {
    "uk": {
        "title": "Обмін криптовалют",
        "exchange-rate-title": "Поточний курс USDT/PLN:",
        "calculator-title": "Калькулятор обміну",
        "amount-label": "Сума в USDT:",
        "calculate-button": "Розрахувати",
        "result-text": "Сума в PLN з комісією (10%):",
        "card-title-1": "Широкий Вибір Криптовалют",
        "card-content-1": "Ми пропонуємо можливість обміну будь-якої криптовалюти, будь то популярні токени чи більш рідкісні цифрові активи. Наш сервіс забезпечує гнучкість та зручність для кожного з вас, надаючи можливість вибору найбільш підходящого варіанта обміну.",
        "card-title-2": "Прозорі Умови",
        "card-content-2": "У нашому сервісі немає прихованих комісій. Всі витрати чітко зазначені і відомі до проведення угоди. Це дозволяє вам повністю контролювати свої фінанси та уникати несподіваних витрат.",
        "card-title-3": "Зручність і Підтримка",
        "card-content-3": "Процедура обміну проста і зрозуміла. Ми надаємо детальні інструкції та консультації щодо використання криптовалютних гаманців та бірж, щоб кожен з вас міг легко орієнтуватися в процесі. Наша команда завжди готова допомогти і відповісти на всі ваші запитання.",
        "card-title-4": "Швидкі Транзакції",
        "card-content-4": "Для постійних клієнтів, зареєстрованих у нашій базі, транзакції проводяться максимально швидко, забезпечуючи миттєвий доступ до обмінених коштів. Ми цінуємо ваш час і прагнемо зробити процес обміну максимально ефективним.",
        "card-title-5": "Надійність і Доступність",
        "card-content-5": "Наш офіс розташований у центрі Вроцлава, що робить його легко доступним для вас. Всі операції проводяться офіційно і надійно, що забезпечує високий рівень довіри та безпеки.",
        "card-title-6": "Висновок",
        "card-content-6": "Наш сервіс пропонує простий і надійний спосіб обміну криптовалют. Ми гарантуємо прозорі умови, швидку обробку операцій і підтримку на кожному етапі. Незалежно від вашого досвіду у криптовалютах, ми забезпечимо вам комфортну і безпечну взаємодію.",
        "location-title": "Наше розташування",
        "footer-text": "© 2024 Oławska 9, 50-123 Вроцлав, Польща"
    },
    "en": {
        "title": "Cryptocurrency exchange",
        "exchange-rate-title": "Current USDT/PLN rate:",
        "calculator-title": "Exchange Calculator",
        "amount-label": "Amount in USDT:",
        "calculate-button": "Calculate",
        "result-text": "Amount in PLN with 10% fee:",
        "card-title-1": "Wide Selection of Cryptocurrencies",
        "card-content-1": "We offer the possibility to exchange any cryptocurrency, be it popular tokens or rarer digital assets. Our service provides flexibility and convenience for each of you, offering the choice of the most suitable exchange option.",
        "card-title-2": "Transparent Conditions",
        "card-content-2": "There are no hidden fees in our service. All costs are clearly indicated and known before the transaction. This allows you to fully control your finances and avoid unexpected expenses.",
        "card-title-3": "Convenience and Support",
        "card-content-3": "The exchange procedure is simple and clear. We provide detailed instructions and consultations on using cryptocurrency wallets and exchanges so that each of you can easily navigate the process. Our team is always ready to help and answer all your questions.",
        "card-title-4": "Fast Transactions",
        "card-content-4": "For regular customers registered in our database, transactions are carried out as quickly as possible, ensuring instant access to exchanged funds. We value your time and strive to make the exchange process as efficient as possible.",
        "card-title-5": "Reliability and Accessibility",
        "card-content-5": "Our office is located in the center of Wroclaw, making it easily accessible for you. All operations are carried out officially and reliably, ensuring a high level of trust and security.",
        "card-title-6": "Conclusion",
        "card-content-6": "Our service offers a simple and reliable way to exchange cryptocurrencies. We guarantee transparent conditions, fast transaction processing, and support at every stage. Regardless of your experience in cryptocurrencies, we will ensure a comfortable and secure interaction for you.",
        "location-title": "Our Location",
        "footer-text": "© 2024 Oławska 9, 50-123 Wrocław, Poland"
    },
    "pl": {
        "title": "Kantor kryptowalut",
        "exchange-rate-title": "Aktualny kurs USDT/PLN:",
        "calculator-title": "Kalkulator Wymiany",
        "amount-label": "Kwota w USDT:",
        "calculate-button": "Oblicz",
        "result-text": "Kwota w PLN z opłatą 10%:",
        "card-title-1": "Szeroki Wybór Kryptowalut",
        "card-content-1": "Oferujemy możliwość wymiany dowolnej kryptowaluty, niezależnie od tego, czy są to popularne tokeny, czy rzadsze aktywa cyfrowe. Nasza usługa zapewnia elastyczność i wygodę dla każdego z Was, oferując możliwość wyboru najbardziej odpowiedniej opcji wymiany.",
        "card-title-2": "Przejrzyste Warunki",
        "card-content-2": "W naszej usłudze nie ma ukrytych opłat. Wszystkie koszty są wyraźnie określone i znane przed transakcją. Pozwala to w pełni kontrolować swoje finanse i unikać nieoczekiwanych wydatków.",
        "card-title-3": "Wygoda i Wsparcie",
        "card-content-3": "Procedura wymiany jest prosta i przejrzysta. Zapewniamy szczegółowe instrukcje i konsultacje dotyczące korzystania z portfeli kryptowalutowych i giełd, aby każdy z Was mógł łatwo poruszać się po procesie. Nasz zespół jest zawsze gotowy do pomocy i odpowiedzi na wszystkie pytania.",
        "card-title-4": "Szybkie Transakcje",
        "card-content-4": "Dla stałych klientów zarejestrowanych w naszej bazie, transakcje są realizowane maksymalnie szybko, zapewniając natychmiastowy dostęp do wymienionych środków. Cenimy Twój czas i dążymy do maksymalnej efektywności procesu wymiany.",
        "card-title-5": "Niezawodność i Dostępność",
        "card-content-5": "Nasze biuro znajduje się w centrum Wrocławia, co sprawia, że jest łatwo dostępne dla Ciebie. Wszystkie operacje są przeprowadzane oficjalnie i niezawodnie, co zapewnia wysoki poziom zaufania i bezpieczeństwa.",
        "card-title-6": "Podsumowanie",
        "card-content-6": "Nasza usługa oferuje prosty i niezawodny sposób wymiany kryptowalut. Gwarantujemy przejrzyste warunki, szybką realizację transakcji i wsparcie na każdym etapie. Niezależnie od Twojego doświadczenia w kryptowalutach, zapewnimy Ci komfortową i bezpieczną współpracę.",
        "location-title": "Nasza lokalizacja",
        "footer-text": "© 2024 Oławska 9, 50-123 Wrocław, Polska"
    }
};

function setLanguage(language) {
    document.getElementById('title').textContent = translations[language]['title'];
    document.getElementById('exchange-rate-title').textContent = translations[language]['exchange-rate-title'];
    document.getElementById('calculator-title').textContent = translations[language]['calculator-title'];
    document.getElementById('amount-label').textContent = translations[language]['amount-label'];
    document.getElementById('calculate-button').textContent = translations[language]['calculate-button'];
    document.getElementById('result-text').textContent = translations[language]['result-text'];

    for (let i = 1; i <= 6; i++) {
        document.getElementById(`card-title-${i}`).textContent = translations[language][`card-title-${i}`];
        document.getElementById(`card-content-${i}`).textContent = translations[language][`card-content-${i}`];
    }

    document.getElementById('location-title').textContent = translations[language]['location-title'];
    document.getElementById('footer-text').textContent = translations[language]['footer-text'];
}

// Установка языка по умолчанию
document.addEventListener("DOMContentLoaded", function() {
    setLanguage('uk'); // Язык по умолчанию - украинский
});



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
