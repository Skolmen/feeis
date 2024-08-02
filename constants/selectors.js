export const IDS = {
    MAIN_PAGE: 'main-page',
    NEW_CARD_PAGE: 'new-card-page',
    CARD_PAGE: 'card-page',
    EXCHANGE_RATE: 'exchange-rate',
    EXCHANGE_RESULT: 'exchange-result',
    ATM_FEE: 'atm-fee',
    AMOUNT_TO_EXCHANGE: 'amount-to-exchange',
    COMPARE_WITHDRAWAL: 'compare-withdrawal',
    COMPARE_EXCHANGE: 'compare-exchange',
    WEEKEND_CHECKBOX: 'weekend-checkbox',
}

export const CLASSES = {
    ACTIVE: 'active',
    PAGE: 'page',
    CURRENT_EXCHANGE_RATE_BOX: 'current-exchange-rate-box',
    COMPARSION_BOX: 'comparison-box',
    INPUT_BOX_WRAPPER: 'input-box-wrapper',
    COMAPRE_BUTTON_BOX: 'compare-button-box',
    CARD_LIST: 'card-list',
    CARD: 'card',
    CARD_TOP: 'card-top',
    CARD_MIDDLE: 'card-middle',
    CARD_BOTTOM: 'card-bottom',
    WEEKEND_CHECKBOX: 'weekend-checkbox',
    POPUP: 'popup',
    POPUP_CONTENT: 'popup-content',
    POPUP_CLOSE: 'popup-close',
    DELETE_CARD_POPUP: 'delete-card-popup',
}

/**
 * Take a class name string and return a class name selector that can be used by jQuery to find an HTML Element.
 *
 * @function buildSelectorsFromClassNames
 * @return {object}
 */
const buildSelectorsFromClassNames = () => {
    return Object.keys(CLASSES).reduce((acc, key) => {
        acc[key] = `.${CLASSES[key]}`;
        return acc;
    }, {});
};

/**
 * Take an ID string and return an ID selector that can be used by jQuery to find an HTML Element.
 *
 * @function buildSelectorsFromIds
 * @return {object}
 */
const buildSelectorsFromIds = () => {
    return Object.keys(IDS).reduce((acc, key) => {
        acc[key] = `#${IDS[key]}`;
        return acc;
    }, {});
};

/**
 * @property DOM_SELECTORS
 * @type {Object}
 * @final
 */
export const DOM_SELECTORS = {
    ...buildSelectorsFromClassNames(),
    ...buildSelectorsFromIds(),
};