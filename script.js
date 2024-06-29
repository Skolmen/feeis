document.addEventListener('DOMContentLoaded', () => {
    const cardList = document.getElementById('card-list');
    const addCardButton = document.getElementById('add-card');
    const currencyRateInput = document.getElementById('currency-rate');
    const compareCostsButton = document.getElementById('compare-costs');
    const amountToWithdrawInput = document.getElementById('amount-to-withdraw');
    const weekdayCheckbox = document.getElementById('weekday-checkbox');

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
        const cardRow = document.createElement('tr');

        cardRow.innerHTML = `
            <td><input type="text" class="card-name" value="${data.name || ''}"></td>
            <td><input type="number" class="withdrawal-fee-low" value="${data.withdrawalFeeLow || 0}"></td>
            <td><input type="number" class="withdrawal-fee-min" value="${data.withdrawalFeeMin || 0}"></td>
            <td><input type="number" class="max-withdrawal-low" value="${data.maxWithdrawalLow || 0}"></td>
            <td><input type="number" class="withdrawal-fee-high" value="${data.withdrawalFeeHigh || 0}"></td>
            <td><input type="number" class="withdrawal-fee-high-min" value="${data.withdrawalFeeHighMin || 0}"></td>
            <td><input type="number" class="exchange-fee-low" value="${data.exchangeFeeLow || 0}"></td>
            <td><input type="number" class="max-exchange-low" value="${data.maxExchangeLow || 0}"></td>
            <td><input type="number" class="exchange-fee-high" value="${data.exchangeFeeHigh || 0}"></td>
            <td><input type="number" class="weekend-fee" value="${data.weekendFee || 0}"></td>
            <td class="card-actions"><button class="remove-card">Remove</button></td>
        `;

        cardRow.querySelector('.remove-card').addEventListener('click', () => {
            cardRow.remove();
            saveCards();
        });

        const inputs = cardRow.querySelectorAll('input');
        inputs.forEach(input => input.addEventListener('change', saveCards));

        return cardRow;
    }

    function saveCards() {
        const cards = [];
        cardList.querySelectorAll('tr').forEach(cardRow => {
            const name = cardRow.querySelector('.card-name').value;
            const withdrawalFeeLow = parseFloat(cardRow.querySelector('.withdrawal-fee-low').value);
            const withdrawalFeeMin = parseFloat(cardRow.querySelector('.withdrawal-fee-min').value);
            const maxWithdrawalLow = parseFloat(cardRow.querySelector('.max-withdrawal-low').value);
            const withdrawalFeeHigh = parseFloat(cardRow.querySelector('.withdrawal-fee-high').value);
            const withdrawalFeeHighMin = parseFloat(cardRow.querySelector('.withdrawal-fee-high-min').value);
            const exchangeFeeLow = parseFloat(cardRow.querySelector('.exchange-fee-low').value);
            const maxExchangeLow = parseFloat(cardRow.querySelector('.max-exchange-low').value);
            const exchangeFeeHigh = parseFloat(cardRow.querySelector('.exchange-fee-high').value);
            const weekendFee = parseFloat(cardRow.querySelector('.weekend-fee').value);

            cards.push({
                name,
                withdrawalFeeLow,
                withdrawalFeeMin,
                maxWithdrawalLow,
                withdrawalFeeHigh,
                withdrawalFeeHighMin,
                exchangeFeeLow,
                maxExchangeLow,
                exchangeFeeHigh,
                weekendFee,
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
        localStorage.setItem('globalSettings', JSON.stringify({ currencyRate }));
    }

    function loadGlobalSettings() {
        const globalSettings = JSON.parse(localStorage.getItem('globalSettings') || '{}');
        if (globalSettings.currencyRate) {
            currencyRateInput.value = globalSettings.currencyRate;
        }
    }

    function compareCosts() {
        const amountToWithdraw = parseFloat(amountToWithdrawInput.value);
        const isWeekday = weekdayCheckbox.checked;

        cardList.querySelectorAll('tr').forEach(cardRow => {
            const cardName = cardRow.querySelector('.card-name').value;
            const withdrawalFeeLow = parseFloat(cardRow.querySelector('.withdrawal-fee-low').value);
            const withdrawalFeeMin = parseFloat(cardRow.querySelector('.withdrawal-fee-min').value);
            const maxWithdrawalLow = parseFloat(cardRow.querySelector('.max-withdrawal-low').value);
            const withdrawalFeeHigh = parseFloat(cardRow.querySelector('.withdrawal-fee-high').value);
            const withdrawalFeeHighMin = parseFloat(cardRow.querySelector('.withdrawal-fee-high-min').value);
            const exchangeFeeLow = parseFloat(cardRow.querySelector('.exchange-fee-low').value);
            const maxExchangeLow = parseFloat(cardRow.querySelector('.max-exchange-low').value);
            const exchangeFeeHigh = parseFloat(cardRow.querySelector('.exchange-fee-high').value);
            const weekendFee = parseFloat(cardRow.querySelector('.weekend-fee').value);

            // Calculate costs based on user inputs
            const withdrawalCost = calculateWithdrawalCost(amountToWithdraw, withdrawalFeeLow, withdrawalFeeMin, maxWithdrawalLow, withdrawalFeeHigh, withdrawalFeeHighMin);
            const exchangeCost = calculateExchangeCost(amountToWithdraw, exchangeFeeLow, maxExchangeLow, exchangeFeeHigh);
            const totalCost = !isWeekday ? withdrawalCost + exchangeCost : withdrawalCost + (weekendFee / 100 * amountToWithdraw);

            console.log(`Card: ${cardName}, Total Cost: ${totalCost.toFixed(2)} SEK`);
        });
    }

    function calculateWithdrawalCost(amount, feeLow, feeMin, maxLow, feeHigh, feeHighMin) {
        if (amount <= maxLow) {
            return Math.max(amount * feeLow / 100, feeMin);
        } else {
            return Math.max(amount * feeHigh / 100, feeHighMin);
        }
    }

    function calculateExchangeCost(amount, feeLow, maxLow, feeHigh) {
        if (amount <= maxLow) {
            return amount * feeLow / 100;
        } else {
            return amount * feeHigh / 100;
        }
    }
});
