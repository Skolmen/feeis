const STORAGE_KEYS = {
    EXCHANGE_RATE: 'exchangeRate',
};

class LocalStorageManager {
    constructor() {
        this.localStorage = window.localStorage;
    }

    init() {
        this.localStorage = window.localStorage;
    }

    loadExchangeRate() {
        const exchangeRate = this.localStorage.getItem(STORAGE_KEYS.EXCHANGE_RATE);
        if (exchangeRate) {
            return JSON.parse(exchangeRate);
        }
        return 0;
    }

    saveExchangeRate(exchangeRate) {
        this.localStorage.setItem(STORAGE_KEYS.EXCHANGE_RATE, JSON.stringify(exchangeRate));
    }
}

export default new LocalStorageManager();