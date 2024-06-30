document.addEventListener('DOMContentLoaded', () => {
    const cardList = document.getElementById('card-list');
    const addCardButton = document.getElementById('add-card');
    const currencyRateInput = document.getElementById('currency-rate');
    const compareCostsButton = document.getElementById('compare-costs');
    const compareExchangeButton = document.getElementById('compare-exchange');
    const amountToWithdrawInput = document.getElementById('amount-to-withdraw');
    const weekdayCheckbox = document.getElementById('weekday-checkbox');
    const atmFeeLocInput = document.getElementById('atm-fee-loc'); // New input field for ATM fee in LOC
    const resultsContainer = document.getElementById('results-container');

    loadCards();
    loadGlobalSettings();

    addCardButton.addEventListener('click', addCard);
    compareCostsButton.addEventListener('click', compareCosts);
    compareExchangeButton.addEventListener('click', compareExchange);
    currencyRateInput.addEventListener('change', saveExchangeRate);

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

    function saveExchangeRate() {
        const currencyRate = parseFloat(currencyRateInput.value);
        localStorage.setItem('currencyRate', currencyRate);
    }

    function loadGlobalSettings() {
        const currencyRate = parseFloat(localStorage.getItem('currencyRate')) || 0.088;
        currencyRateInput.value = currencyRate;
    }

    function compareCosts() {
        resultsContainer.innerHTML = '<h2>Results</h2>';
        const amountToWithdraw = parseFloat(amountToWithdrawInput.value);
        const atmFeeLoc = parseFloat(atmFeeLocInput.value);

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
            const withdrawnAmount = parseFloat(card.querySelector('.withdrawn-amount').value);
            const exchangedAmount = parseFloat(card.querySelector('.exchanged-amount').value);
            const weekendFee = parseFloat(card.querySelector('.weekend-fee').value);
            const weekday = weekdayCheckbox.checked;

            const remainingWithdrawal = maxWithdrawalLow - withdrawnAmount;
            const remainingExchange = maxExchangeLow - exchangedAmount;

            const atmFeeSek = atmFeeLoc / parseFloat(currencyRateInput.value); // Convert ATM fee to SEK

            const amountToExchange = amountToWithdraw + atmFeeLoc;

            const amountInSEK = amountToWithdraw / currencyRateInput.value;

            const exchangeFee = calculateExchangeFee(amountToExchange, exchangeFeeLow, exchangeFeeHigh, remainingExchange, weekday, weekendFee);

            const withdrawalFee = calculateWithdrawalFee(amountToWithdraw, withdrawalFeeLow, withdrawalFeeMin, withdrawalFeeHigh, withdrawalFeeHighMin, remainingWithdrawal);
            
            const totalWithdrawalFee = withdrawalFee[0] + withdrawalFee[1];

            const exchangeFeeTotal = exchangeFee[0] + exchangeFee[1] + exchangeFee[2];

            const totalCost = amountInSEK + totalWithdrawalFee + exchangeFeeTotal + atmFeeSek;

            const totalFees = totalWithdrawalFee + exchangeFeeTotal + atmFeeSek;

            const resultElement = document.createElement('div');
            resultElement.classList.add('result');
            resultElement.innerHTML = `
                <h3>${cardName}</h3>
                <p><strong>Amount to withdraw (LOC):</strong> ${amountToWithdraw.toFixed(2)} LOC</p>
                <p><strong>Amount in SEK:</strong> ${amountInSEK.toFixed(2)} SEK</p>
                <p><strong>Total Cost (SEK):</strong> ${totalCost.toFixed(2)} SEK</p>
                <p><strong>Total Fees (SEK):</strong> ${totalFees.toFixed(2)} SEK</p>
                <p><strong>- Withdrawal Fee (SEK):</strong> ${totalWithdrawalFee.toFixed(2)} SEK</p>
                <p>-- Withdrawal Fee Low (SEK): ${withdrawalFee[0].toFixed(2)} SEK</p>
                <p>-- Withdrawal Fee High (SEK): ${withdrawalFee[1].toFixed(2)} SEK</p>
                <p><strong>- Exchange Fee (SEK):</strong> ${exchangeFeeTotal.toFixed(2)} SEK</p>
                <p>-- Exchange Fee Low (SEK): ${exchangeFee[0].toFixed(2)} SEK</p>
                <p>-- Exchange Fee High (SEK): ${exchangeFee[1].toFixed(2)} SEK</p>
                <p>-- Weekend Fee (SEK): ${exchangeFee[2].toFixed(2)} SEK</p>
                <p><strong>- ATM Fee (SEK):</strong> ${atmFeeSek.toFixed(2)} SEK</p>
                <p><strong>Total fee percentage:</strong> ${((totalFees / amountInSEK) * 100).toFixed(2)} %</p>
                <p><strong>New exchange rate:</strong> 1 SEK = ${(amountToWithdraw / totalCost).toFixed(4)} LOC</p>
            `;
            resultsContainer.appendChild(resultElement);
        });
    }

    function compareExchange() {
        resultsContainer.innerHTML = '<h2>Exchange Only Results</h2>';
        const amountToExchange = parseFloat(amountToWithdrawInput.value);

        cardList.querySelectorAll('.card').forEach(card => {
            const cardName = card.querySelector('.card-name').value;
            const exchangeFeeLow = parseFloat(card.querySelector('.exchange-fee-low').value);
            const maxExchangeLow = parseFloat(card.querySelector('.max-exchange-low').value);
            const exchangeFeeHigh = parseFloat(card.querySelector('.exchange-fee-high').value);
            const exchangedAmount = parseFloat(card.querySelector('.exchanged-amount').value);
            const weekendFee = parseFloat(card.querySelector('.weekend-fee').value);
            const weekday = weekdayCheckbox.checked;

            const remainingExchange = maxExchangeLow - exchangedAmount;

            const exchangeFee = calculateExchangeFee(amountToExchange, exchangeFeeLow, exchangeFeeHigh, remainingExchange, weekday, weekendFee);

            const amountInSEK = amountToExchange / currencyRateInput.value;

            const exchangeFeeTotal = exchangeFee[0] + exchangeFee[1] + exchangeFee[2];

            const exchangeCost = exchangeFee[0] + exchangeFee[1] + exchangeFee[2] + amountInSEK;
            
            const totalFees = exchangeFee[0] + exchangeFee[1] + exchangeFee[2];

            const resultElement = document.createElement('div');
            resultElement.classList.add('result');
            resultElement.innerHTML = `
                <h3>${cardName}</h3>
                <p><strong>Amount to exchange (LOC):</strong> ${amountToExchange.toFixed(2)} LOC</p>
                <p><strong>Amount in SEK:</strong> ${amountInSEK.toFixed(2)} SEK</p>
                <p><strong>Cost in (SEK):</strong> ${exchangeCost.toFixed(2)} SEK</p>
                <p><strong>Total Fees:</strong> ${totalFees.toFixed(2)} SEK</p>
                <p><strong>- Exchange Fee:</strong> ${exchangeFeeTotal.toFixed(2)} SEK</p>
                <p>-- Exchange Fee Low: ${exchangeFee[0].toFixed(2)} SEK</p>
                <p>-- Exchange Fee High: ${exchangeFee[1].toFixed(2)} SEK</p>
                <p>-- Weekend Fee: ${exchangeFee[2].toFixed(2)} SEK</p>
                <p><strong>Total fee percentage:</strong> ${((totalFees / amountInSEK) * 100).toFixed(2)} %</p>
                <p><strong>New exhange rate:</strong> 1 SEK = ${((amountToExchange / exchangeCost).toFixed(4))} LOC</p>
            `;
            resultsContainer.appendChild(resultElement);
        });
    }

    function calculateWithdrawalFee(amount, feeLow, feeMin, feeHigh, feeHighMin, remaining) {
        let lowFee = 0;
        let highFee = 0;
    
        let amountInSEK = amount / currencyRateInput.value;

        // Convert percentage fees to fractions
        feeLow /= 100;
        feeHigh /= 100;

        // Calculate withdrawal fee for the remaining amount using low fee
        if (remaining > 0) {
            const lowFeeAmount = Math.min(amountInSEK, remaining);
            lowFee = lowFeeAmount * feeLow;
            lowFee = Math.max(lowFee, feeMin);
            amountInSEK -= lowFeeAmount;
        }

        // Calculate withdrawal fee for the remaining amount using high fee
        if (amountInSEK > 0) {
            highFee = amountInSEK * feeHigh;
            highFee = Math.max(highFee, feeHighMin);
        }
    
        return [lowFee, highFee];
    }

    function calculateExchangeFee(amountToExchange, exchangeFeeLow, exchangeFeeHigh, remainingExchange, isWeekday, weekendFee) {
        // Convert amount to exchange from local currency to SEK (assuming SEK is the target currency)
        let amountInSEK = amountToExchange / currencyRateInput.value;
        
        let highFee = 0;
        let lowFee = 0;
        let weekendTotFee = 0;
    
        // Convert percentage fees to fractions
        exchangeFeeLow /= 100;
        exchangeFeeHigh /= 100;
        weekendFee /= 100;
    
        // Apply weekday/weekend fee adjustment
        if (isWeekday) {
            // It's a weekend (assuming weekday is a boolean where false means weekend)
            weekendTotFee = amountInSEK * weekendFee;
        }

        // Calculate exchange fee for the remaining exchange using low fee
        if (remainingExchange > 0) {
            const lowFeeAmount = Math.min(amountInSEK, remainingExchange);
            lowFee = lowFeeAmount * exchangeFeeLow;
            amountInSEK -= lowFeeAmount;
        }

        // Calculate exchange fee for the remaining amount using high fee
        if (amountInSEK > 0) {
            highFee = amountInSEK * exchangeFeeHigh;
        }

        // Return the calculated exchange cost
        return [lowFee, highFee, weekendTotFee];
    }
});
