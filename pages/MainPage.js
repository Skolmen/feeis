import LocalStorageManager from '../components/LocalStorageManager.js';
import { Page } from '../components/Page.js';
import { CLASSES, DOM_SELECTORS, IDS } from '../constants/selectors.js';

const PAGE = `
    <div class="${CLASSES.PAGE}" id="${IDS.MAIN_PAGE}">
    </div>
`;

const CURRENT_EXCHANGE_RATE = `
    <div class="${CLASSES.CURRENT_EXCHANGE_RATE_BOX}">
        <h2>Exchange Rate</h2>
        <div class="${CLASSES.INPUT_BOX_WRAPPER}">
             <span>
                <span>1 HOM = </span>
                <input type="number" id="${IDS.EXCHANGE_RATE}" value="0">
                <span>LOC</span>
            </span>
        </div>
        <p>HOM is your home currency and LOC is the currency of the country you are visiting.</p> 
    </div>
`;

const COMPARISON_AMOUNT = `
    <div class="${CLASSES.COMPARSION_BOX}">
        <h2>Comapre Costs</h2>
        <div>
            <div class="${CLASSES.INPUT_BOX_WRAPPER}">
                <label for="${IDS.AMOUNT_TO_EXCHANGE}">Amount to exchange/withdraw in LOC</label>
                <span>
                    <input type="number" id="${IDS.AMOUNT_TO_EXCHANGE}" name="${IDS.AMOUNT_TO_EXCHANGE}" value="0">
                    <span>LOC</span>
                </span>
            </div>
            <div class="${CLASSES.INPUT_BOX_WRAPPER}">
                <label for="${IDS.ATM_FEE}">ATM Fee</label>
                <span>
                    <input type="number" id="${IDS.ATM_FEE}" name="${IDS.ATM_FEE}" value="0">
                    <span>LOC</span>
                </span>
            </div>
        </div>
    </div>
`;

const WEEKEND_CHECKBOX = `
    <div class="${CLASSES.WEEKEND_CHECKBOX}">
        <h2>Weekend</h2>
        <p>Are you exchanging or withdrawing money on the weekend?</p>
        <span>
            <input type="checkbox" id="${IDS.WEEKEND_CHECKBOX}" name="${IDS.WEEKEND_CHECKBOX}">
            <label for="${IDS.WEEKEND_CHECKBOX}">Yes</label>
        </span>
    </div>
`;

const COMPARE_BUTTON_BOX = `
    <div class="${CLASSES.COMAPRE_BUTTON_BOX}">
        <button id="${IDS.COMPARE_WITHDRAWAL}">Compare withdrawal</button>
        <button id="${IDS.COMPARE_EXCHANGE}">Compare exchange</button>
    </div>
`;

const EXCHANGE_RESULT = `
    <div>
        <h2>Exchange Result</h2>
        <div id="${IDS.EXCHANGE_RESULT}">
            The exchange result will be displayed here.
        </div>
    </div>
`;

/**
 * This is the main page of the application.
 * 
 * Here the user will enter the exchange rate and the amount they want to convert.
 */
export class MainPage extends Page {
    constructor () {
        super();
        this.$element = $(PAGE);
    } 

    init() {
        const $comparisonAmount = this.initComparisonAmount();
        const $exchangeResult = $(EXCHANGE_RESULT);
        const $compareButton = this.initCompareButton();
        const $exchangeRate = this.initExchangeRate();
        const $weekendCheckbox = this.initWeekendCheckbox();

        this.$element.append($exchangeRate);
        this.$element.append($comparisonAmount);
        this.$element.append($weekendCheckbox);
        this.$element.append($compareButton);
        this.$element.append($exchangeResult);

        return this;
    }

    initExchangeRate() {
        const $exchangeRate = $(CURRENT_EXCHANGE_RATE);

        const exchangeRate = LocalStorageManager.loadExchangeRate();

        const $inputBox = $exchangeRate.find(DOM_SELECTORS.EXCHANGE_RATE);
        $inputBox.val(Number(exchangeRate));

        $inputBox.on('change', (event) => {
            const exchangeRate = event.target.value;
            LocalStorageManager.saveExchangeRate(exchangeRate);
        });

        return $exchangeRate;
    }

    initComparisonAmount() {
        const $comparisonAmount = $(COMPARISON_AMOUNT);

        return $comparisonAmount;
    }

    initCompareButton() {
        const $compareButton = $(COMPARE_BUTTON_BOX);

        const $compareWithdrawal = $compareButton.find(DOM_SELECTORS.COMPARE_WITHDRAWAL);
        const $compareExchange = $compareButton.find(DOM_SELECTORS.COMPARE_EXCHANGE);

        $compareWithdrawal.on('click', () => {
            console.log('Compare withdrawal');
        });

        $compareExchange.on('click', () => {
            console.log('Compare exchange');
        });

        return $compareButton;
    }

    initWeekendCheckbox() {
        const $weekendCheckbox = $(WEEKEND_CHECKBOX);

        return $weekendCheckbox;
    }

}