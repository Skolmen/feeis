document.addEventListener('DOMContentLoaded', () => {
    const cardList = document.getElementById('card-list');
    const addCardButton = document.getElementById('add-card');
    const currencyRateInput = document.getElementById('currency-rate');
    const compareCostsButton = document.getElementById('compare-costs');
    const amountToWithdrawInput = document.getElementById('amount-to-withdraw');
    const weekdayCheckbox = document.getElementById('weekday-checkbox');
    const resultsContainer = document.getElementById('results-container'); // New container for results

    // Load saved cards and settings from local storage
    loadCards();
    loadGlobalSettings();

    addCardButton.addEventListener('click', addCard);
    compareCostsButton.addEventListener('click', compareCosts);
    currencyRateInput.addEventListener('change', saveGlobalSettings);

    function addCard() {
        const card = createCard();
        cardList.appendChild(card);
        saveCards();
    }

    function createCard(data = {}) {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <label>Card Name:</label>
            <input type="text" class="card-name" value="${data.cardName || 'Card Name'}">
            <label>Withdrawal Fee Low End (%):</label>
            <input type="number" class="withdrawal-fee-low" value="${data.withdrawalFeeLow || 0}">
            <label>Withdrawal Fee Minimum (SEK):</label>
            <input type="number" class="withdrawal-fee-min" value="${data.withdrawalFeeMin || 0}">
            <label>Max Withdrawal Low (SEK):</label>
            <input type="number" class="max-withdrawal-low" value="${data.maxWithdrawalLow || 0}">
            <label>Withdrawal Fee High End (%):</label>
            <input type="number" class="withdrawal-fee-high" value="${data.withdrawalFeeHigh || 0}">
            <label>Withdrawal Fee High Minimum (SEK):</label>
            <input type="number" class="withdrawal-fee-high-min" value="${data.withdrawalFeeHighMin || 0}">
            <label>Exchange Fee Low End (%):</label>
            <input type="number" class="exchange-fee-low" value="${data.exchangeFeeLow || 0}">
            <label>Max Exchange Low End (SEK):</label>
            <input type="number" class="max-exchange-low" value="${data.maxExchangeLow || 0}">
            <label>Exchange Fee High End (%):</label>
            <input type="number" class="exchange-fee-high" value="${data.exchangeFeeHigh || 0}">
            <label>Weekend Fee (%):</label>
            <input type="number" class="weekend-fee" value="${data.weekendFee || 0}">
            <label>Withdrawn (SEK):</label>
            <input type="number" class="withdrawn-amount" value="${data.withdrawnAmount || 0}">
            <label>Exchanged (SEK):</label>
            <input type="number" class="exchanged-amount" value="${data.exchangedAmount || 0}">
            <div class="card-actions">
                <button class="remove-card">Remove</button>
            </div>
        `;

        card.querySelector('.remove-card').addEventListener('click', () => {
            card.remove();
            saveCards();
        });

        const inputs = card.querySelectorAll('input');
        inputs.forEach(input => input.addEventListener('change', () => {
            saveCards();
        }));

        return card;
    }

    function updateCardResults(card) {
        const withdrawalFeeLow = parseFloat(card.querySelector('.withdrawal-fee-low').value);
        const withdrawalFeeMin = parseFloat(card.querySelector('.withdrawal-fee-min').value);
        const maxWithdrawalLow = parseFloat(card.querySelector('.max-withdrawal-low').value);
        const withdrawalFeeHigh = parseFloat(card.querySelector('.withdrawal-fee-high').value);
        const withdrawalFeeHighMin = parseFloat(card.querySelector('.withdrawal-fee-high-min').value);
        const exchangeFeeLow = parseFloat(card.querySelector('.exchange-fee-low').value);
        const maxExchangeLow = parseFloat(card.querySelector('.max-exchange-low').value);
        const exchangeFeeHigh = parseFloat(card.querySelector('.exchange-fee-high').value);
        const weekendFee = parseFloat(card.querySelector('.weekend-fee').value);
        const withdrawnAmount = parseFloat(card.querySelector('.withdrawn-amount').value);
        const exchangedAmount = parseFloat(card.querySelector('.exchanged-amount').value);

        const amountToWithdraw = parseFloat(amountToWithdrawInput.value);
        const isWeekday = weekdayCheckbox.checked;

        const remainingWithdrawal = maxWithdrawalLow - withdrawnAmount;
        const remainingExchange = maxExchangeLow - exchangedAmount;

        const withdrawalCost = calculateWithdrawalCost(amountToWithdraw, withdrawalFeeLow, withdrawalFeeMin, maxWithdrawalLow, withdrawalFeeHigh, withdrawalFeeHighMin, remainingWithdrawal);
        const exchangeCost = calculateExchangeCost(amountToWithdraw, exchangeFeeLow, maxExchangeLow, exchangeFeeHigh, remainingExchange);
        const weekendCost = isWeekday ? 0 : (weekendFee / 100) * amountToWithdraw;

        const totalCost = withdrawalCost + exchangeCost + weekendCost;
        const amountInCurrency = totalCost / parseFloat(currencyRateInput.value);

        card.querySelector('.withdrawal-fee-result').textContent = `${withdrawalCost.toFixed(2)} SEK`;
        card.querySelector('.exchange-cost-result').textContent = `${exchangeCost.toFixed(2)} SEK`;
        card.querySelector('.total-cost-result').textContent = `${totalCost.toFixed(2)} SEK`;
        card.querySelector('.amount-in-currency').textContent = `${amountInCurrency.toFixed(2)} EUR`;
    }

    function saveCards() {
        const cards = [];
        cardList.querySelectorAll('.card').forEach(card => {
            const cardName = card.querySelector('.card-name').value;
            const withdrawalFeeLow = parseFloat(card.querySelector('.withdrawal-fee-low').value);
            const withdrawalFeeMin = parseFloat(card.querySelector('.withdrawal-fee-min').value);
            const maxWithdrawalLow = parseFloat(card.querySelector('.max-withdrawal-low').value);
            const withdrawalFeeHigh = parseFloat(card.querySelector('.withdrawal-fee-high').value);
            const withdrawalFeeHighMin = parseFloat(card.querySelector('.withdrawal-fee-high-min').value);
            const exchangeFeeLow = parseFloat(card.querySelector('.exchange-fee-low').value);
            const maxExchangeLow = parseFloat(card.querySelector('.max-exchange-low').value);
            const exchangeFeeHigh = parseFloat(card.querySelector('.exchange-fee-high').value);
            const weekendFee = parseFloat(card.querySelector('.weekend-fee').value);
            const withdrawnAmount = parseFloat(card.querySelector('.withdrawn-amount').value);
            const exchangedAmount = parseFloat(card.querySelector('.exchanged-amount').value);

            cards.push({
                cardName,
                withdrawalFeeLow,
                withdrawalFeeMin,
                maxWithdrawalLow,
                withdrawalFeeHigh,
                withdrawalFeeHighMin,
                exchangeFeeLow,
                maxExchangeLow,
                exchangeFeeHigh,
                weekendFee,
                withdrawnAmount,
                exchangedAmount,
            });
        });
        localStorage.setItem('cards', JSON.stringify(cards));
    }

    function loadCards() {
        const savedCards = JSON.parse(localStorage.getItem('cards') || '[]');
        savedCards.forEach(data => {
            const card = createCard(data);
            cardList.appendChild(card);
        });
    }

    function saveGlobalSettings() {
        const currencyRate = parseFloat(currencyRateInput.value);
        localStorage.setItem('currencyRate', currencyRate);
        // Update results when global settings change
        cardList.querySelectorAll('.card').forEach(card => {
            updateCardResults(card);
        });
    }

    function loadGlobalSettings() {
        const currencyRate = parseFloat(localStorage.getItem('currencyRate')) || 0.088;
        currencyRateInput.value = currencyRate;
    }

    function compareCosts() {
        resultsContainer.innerHTML = '<h2>Results</h2>'; // Clear previous results
        const amountToWithdraw = parseFloat(amountToWithdrawInput.value);
        const isWeekday = weekdayCheckbox.checked;

        cardList.querySelectorAll('.card').forEach(card => {
            const cardName = card.querySelector('.card-name').value;
            const withdrawalFeeLow = parseFloat(card.querySelector('.withdrawal-fee-low').value);
            const withdrawalFeeMin = parseFloat(card.querySelector('.withdrawal-fee-min').value);
            const maxWithdrawalLow = parseFloat(card.querySelector('.max-withdrawal-low').value);
            const withdrawalFeeHigh = parseFloat(card.querySelector('.withdrawal-fee-high').value);
            const withdrawalFeeHighMin = parseFloat(card.querySelector('.withdrawal-fee-high-min').value);
            const exchangeFeeLow = parseFloat(card.querySelector('.exchange-fee-low').value);
            const maxExchangeLow = parseFloat(card.querySelector('.max-exchange-low').value);
            const exchangeFeeHigh = parseFloat(card.querySelector('.exchange-fee-high').value);
            const weekendFee = parseFloat(card.querySelector('.weekend-fee').value);
            const withdrawnAmount = parseFloat(card.querySelector('.withdrawn-amount').value);
            const exchangedAmount = parseFloat(card.querySelector('.exchanged-amount').value);

            const remainingWithdrawal = maxWithdrawalLow - withdrawnAmount;
            const remainingExchange = maxExchangeLow - exchangedAmount;

            const withdrawalCost = calculateWithdrawalCost(amountToWithdraw, withdrawalFeeLow, withdrawalFeeMin, maxWithdrawalLow, withdrawalFeeHigh, withdrawalFeeHighMin, remainingWithdrawal);
            const exchangeCost = calculateExchangeCost(amountToWithdraw, exchangeFeeLow, maxExchangeLow, exchangeFeeHigh, remainingExchange);
            const weekendCost = !isWeekday ? 0 : (weekendFee / 100) * amountToWithdraw;

            const totalCost = withdrawalCost + exchangeCost + weekendCost;
            const amountInCurrency = (amountToWithdraw - withdrawalCost - exchangeCost) * parseFloat(currencyRateInput.value);

            const resultElement = document.createElement('div');
            resultElement.classList.add('result');
            resultElement.innerHTML = `
                <h3>${cardName}</h3>
                <p><strong>Withdrawal Fee:</strong> ${withdrawalCost.toFixed(2)} SEK</p>
                <p><strong>Exchange Cost (SEK):</strong> ${exchangeCost.toFixed(2)} SEK</p>
                <p><strong>Total Cost (SEK):</strong> ${totalCost.toFixed(2)} SEK</p>
                <p><strong>Amount in Currency:</strong> ${amountInCurrency.toFixed(2)} EUR</p>
            `;
            resultsContainer.appendChild(resultElement);
        });
    }

    function calculateWithdrawalCost(amount, feeLow, feeMin, maxLow, feeHigh, feeHighMin, remaining) {
        if (amount <= remaining) {
            return Math.max(amount * feeLow / 100, feeMin);
        } else {
            return Math.max(amount * feeHigh / 100, feeHighMin);
        }
    }

    function calculateExchangeCost(amount, feeLow, maxLow, feeHigh, remaining) {
        if (amount <= remaining) {
            return amount * feeLow / 100;
        } else {
            return amount * feeHigh / 100;
        }
    }
});
