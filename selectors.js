export const IDS = {
    ADD_CARD: 'add-card',
}

export const CLASSES = {
    CARD: 'card',
    CARD_TITLE: 'card-title',
    CARD_DESCRIPTION: 'card-description',
    CARD_BUTTON: 'card-button',
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