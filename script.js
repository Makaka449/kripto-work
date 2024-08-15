// Обмінні курси
let rates = {
    usd: 1.00,   // USDT to USD
    pln: 3.90,   // USDT to PLN
    eur: 0.91    // USDT to EUR
};

// Дані графіка
let chartData = {
    labels: [],  // Дати або маркери часу
    datasets: [{
        label: 'Курс USDT/PLN',
        data: [],  // Дані обмінного курсу
        borderColor: 'rgba(0, 255, 0, 1)',
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        fill: true,
        tension: 0.1
    }]
};

// Ініціалізація графіка
let chart;

// Оновлення таблиці з обмінними курсами
function updateExchangeRates() {
    document.getElementById('rate-usdt-usd').textContent = rates.usd.toFixed(2);
    document.getElementById('rate-usdt-pln').textContent = rates.pln.toFixed(2);
    document.getElementById('rate-usdt-eur').textContent = rates.eur.toFixed(2);
}

// Оновлення графіка
function updateChart() {
    const ctx = document.getElementById('myChart').getContext('2d');

    if (chart) {
        chart.destroy(); // Очищення старого графіка
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Розрахунок процентної ставки
function getRate(amount) {
    if (amount < 1000) {
        return 1.10; // 10% для сум менше 1000$
    } else if (amount >= 1000 && amount <= 10000) {
        return 1.05; // 5% для сум від 1000$ до 10000$
    } else {
        return 1.01; // 1% для сум більше 10000$
    }
}

// Розрахунок обміну
function calculateExchange() {
    const amount = parseFloat(document.getElementById('amount').value);
    const currency = document.getElementById('currency').value;

    if (isNaN(amount) || amount <= 0) {
        document.getElementById('result').textContent = 'Введіть дійсну суму';
        return;
    }

    const rate = rates[currency];
    if (!rate) {
        document.getElementById('result').textContent = 'Курс обміну недоступний';
        return;
    }

    const feeRate = getRate(amount);
    const result = amount * rate;
    const resultWithFee = result * feeRate; // Віднімання комісії

    document.getElementById('result').textContent = resultWithFee.toFixed(2);
}

// Мовні переклади
const translations = {
    "uk": {
        "title": "Обмін криптовалют",
        "exchange-rate-title": "Поточний курс USDT/PLN: ",
        "calculator-title": "Калькулятор обміну",
        "amount-label": "Сума:",
        "currency-label": "Оберіть валюту:",
        "calculate-button": "Розрахувати",
        "result-text": "Результат:",
        "rate-tiers-title": "Процентні ставки в залежності від суми",
        "card-title-1": "Широкий Вибір Криптовалют",
        "card-content-1": "Ми пропонуємо можливість обміну будь-якої криптовалюти, будь то популярні токени чи більш рідкісні цифрові активи. Наш сервіс забезпечує гнучкість та зручність для кожного з вас, надаючи можливість вибору найбільш підходящого варіанта обміну.",
        "card-title-2": "Прозорі Умови",
        "card-content-2": "У нашому сервісі немає прихованих комісій. Всі витрати чітко зазначені і відомі до проведення угоди. Це дозволяє вам повністю контролювати свої фінанси та уникати несподіваних витрат.",
        "card-title-3": "Зручність і Підтримка",
        "card-content-3": "Процедура обміну проста і зрозуміла. Ми надаємо детальні інструкції та консультації щодо використання криптовалютних гаманців та бірж, щоб кожен з вас міг легко орієнтуватися в процесі. Наша команда завжди готова допомогти і відповісти на всі ваші запитання."
    },
    "en": {
        "title": "Cryptocurrency Exchange",
        "exchange-rate-title": "Current USDT/PLN Rate: ",
        "calculator-title": "Exchange Calculator",
        "amount-label": "Amount:",
        "currency-label": "Select Currency:",
        "calculate-button": "Calculate",
        "result-text": "Result:",
        "rate-tiers-title": "Interest Rates Based on Amount",
        "card-title-1": "Wide Range of Cryptocurrencies",
        "card-content-1": "We offer the ability to exchange any cryptocurrency, whether it’s popular tokens or rarer digital assets. Our service provides flexibility and convenience for each of you, offering the option to choose the most suitable exchange.",
        "card-title-2": "Transparent Conditions",
        "card-content-2": "Our service has no hidden fees. All costs are clearly stated and known before the transaction is conducted. This allows you to fully control your finances and avoid unexpected expenses.",
        "card-title-3": "Convenience and Support",
        "card-content-3": "The exchange procedure is simple and clear. We provide detailed instructions and advice on using cryptocurrency wallets and exchanges so that each of you can easily navigate the process. Our team is always ready to assist and answer all your questions."
    },
    "pl": {
        "title": "Wymiana Kryptowalut",
        "exchange-rate-title": "Aktualny kurs USDT/PLN: ",
        "calculator-title": "Kalkulator wymiany",
        "amount-label": "Kwota:",
        "currency-label": "Wybierz walutę:",
        "calculate-button": "Oblicz",
        "result-text": "Wynik:",
        "rate-tiers-title": "Stopy procentowe w zależności od kwoty",
        "card-title-1": "Szeroki wybór kryptowalut",
        "card-content-1": "Oferujemy możliwość wymiany dowolnej kryptowaluty, czy to popularnych tokenów, czy rzadszych aktywów cyfrowych. Nasza usługa zapewnia elastyczność i wygodę dla każdego z Was, oferując możliwość wyboru najbardziej odpowiedniej wymiany.",
        "card-title-2": "Przejrzyste warunki",
        "card-content-2": "W naszej usłudze nie ma ukrytych opłat. Wszystkie koszty są jasno określone i znane przed dokonaniem transakcji. Dzięki temu możecie w pełni kontrolować swoje finanse i unikać nieoczekiwanych wydatków.",
        "card-title-3": "Wygoda i wsparcie",
        "card-content-3": "Procedura wymiany jest prosta i zrozumiała. Oferujemy szczegółowe instrukcje i porady dotyczące korzystania z portfeli kryptowalutowych i giełd, aby każdy z Was mógł łatwo poruszać się w tym procesie. Nasz zespół jest zawsze gotowy do pomocy i odpowiedzi na wszystkie pytania."
    }
};

// Зміна мови і оновлення відображення
function setLanguage(lang) {
    document.getElementById('title').textContent = translations[lang]['title'];
    
    // Оновлення таблиці з курсами обміну
    updateExchangeRates();

    document.getElementById('calculator-title').textContent = translations[lang]['calculator-title'];
    document.getElementById('amount-label').textContent = translations[lang]['amount-label'];
    document.getElementById('currency-label').textContent = translations[lang]['currency-label'];
    document.getElementById('calculate-button').textContent = translations[lang]['calculate-button'];
    document.getElementById('result-text').textContent = translations[lang]['result-text'];

    // Оновлення карток
    for (let i = 1; i <= 3; i++) {
        document.getElementById(`card-title-${i}`).textContent = translations[lang][`card-title-${i}`];
        document.getElementById(`card-content-${i}`).textContent = translations[lang][`card-content-${i}`];
    }
}

// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    setLanguage('uk'); // Встановлення мови за замовчуванням на українську
    updateChart();     // Ініціалізація графіка
    fetchExchangeRate(); // Отримання обмінних курсів
});

// Обробник подій для кнопки розрахунку
document.getElementById('calculate-button').addEventListener('click', calculateExchange);

// Функція для отримання обмінних курсів (можете замінити на реальний API)
function fetchExchangeRate() {
    // Імітація запиту до API для отримання курсів валют
    setTimeout(() => {
        // Оновлення даних
        rates = {
            usd: (Math.random() * 2).toFixed(2),
            pln: (Math.random() * 5).toFixed(2),
            eur: (Math.random() * 2).toFixed(2)
        };

        console.log('Updated Rates:', rates); // Для перевірки

        updateExchangeRates(); // Оновлення таблиці
        updateChart();         // Оновлення графіка
    }, 1000); // Затримка для імітації запиту до API
}
