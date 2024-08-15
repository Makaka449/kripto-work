document.addEventListener('DOMContentLoaded', function() {
    const rates = {
        usd: { buy: 1.00, sell: 1.01 },   // USDT to USD
        pln: { buy: 3.90, sell: 3.92 },   // USDT to PLN
        eur: { buy: 0.91, sell: 0.92 }    // USDT to EUR
    };
 
    const rateUsdtUsdBuy = document.getElementById('rate-usdt-usd');
    const rateUsdtUsdSell = document.getElementById('rate-usdt-usd-sale');
    const rateUsdtPlnBuy = document.getElementById('rate-usdt-pln');
    const rateUsdtPlnSell = document.getElementById('rate-usdt-pln-sale');
    const rateUsdtEurBuy = document.getElementById('rate-usdt-eur');
    const rateUsdtEurSell = document.getElementById('rate-usdt-eur-sale');

    if (rateUsdtUsdBuy && rateUsdtUsdSell) {
        rateUsdtUsdBuy.textContent = rates.usd.buy.toFixed(2);
        rateUsdtUsdSell.textContent = rates.usd.sell.toFixed(2);
    }
    if (rateUsdtPlnBuy && rateUsdtPlnSell) {
        rateUsdtPlnBuy.textContent = rates.pln.buy.toFixed(2);
        rateUsdtPlnSell.textContent = rates.pln.sell.toFixed(2);
    }
    if (rateUsdtEurBuy && rateUsdtEurSell) {
        rateUsdtEurBuy.textContent = rates.eur.buy.toFixed(2);
        rateUsdtEurSell.textContent = rates.eur.sell.toFixed(2);
    }
});





let chart;


document.querySelector('.burger-menu').addEventListener('click', function() {
    document.getElementById('nav-modal').style.display = 'flex';
});


document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('nav-modal').style.display = 'none';
});


window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('nav-modal')) {
        document.getElementById('nav-modal').style.display = 'none';
    }
});


document.querySelectorAll('.nav-list a').forEach(function(navItem) {
    navItem.addEventListener('click', function() {
        document.getElementById('nav-modal').style.display = 'none';
    });
});


document.querySelectorAll('#language-selector-modal button').forEach(function(langButton) {
    langButton.addEventListener('click', function() {
        document.getElementById('nav-modal').style.display = 'none';
    });
});




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


function setLanguage(lang) {
    document.getElementById('title').textContent = translations[lang]['title'];
    
    updateExchangeRates();

    document.getElementById('calculator-title').textContent = translations[lang]['calculator-title'];
    document.getElementById('amount-label').textContent = translations[lang]['amount-label'];
    document.getElementById('currency-label').textContent = translations[lang]['currency-label'];
    document.getElementById('calculate-button').textContent = translations[lang]['calculate-button'];
    document.getElementById('result-text').textContent = translations[lang]['result-text'];

    for (let i = 1; i <= 3; i++) {
        document.getElementById(`card-title-${i}`).textContent = translations[lang][`card-title-${i}`];
        document.getElementById(`card-content-${i}`).textContent = translations[lang][`card-content-${i}`];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setLanguage('uk'); 
   
    fetchExchangeRate(); 
});
