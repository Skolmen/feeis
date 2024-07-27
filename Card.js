import { DOM_SELECTORS } from "./selectors";

export class Card {
    constructor(data = {}) {
        this.cardName = data.cardName || 'Card Name';
        this.withdrawalFeeLow = data.withdrawalFeeLow || 0;
        this.withdrawalFeeMin = data.withdrawalFeeMin || 0;
        this.maxWithdrawalLow = data.maxWithdrawalLow || 0;
        this.withdrawalFeeHigh = data.withdrawalFeeHigh || 0;
        this.withdrawalFeeHighMin = data.withdrawalFeeHighMin || 0;
        this.exchangeFeeLow = data.exchangeFeeLow || 0;
        this.maxExchangeLow = data.maxExchangeLow || 0;
        this.exchangeFeeHigh = data.exchangeFeeHigh || 0;
        this.weekendFee = data.weekendFee || 0;
        this.withdrawnAmount = data.withdrawnAmount || 0;
        this.exchangedAmount = data.exchangedAmount || 0;
    }

}