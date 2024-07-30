export const IDS = {
    MAIN_PAGE: 'main-page',
    NEW_CARD_PAGE: 'new-card-page',
    CARD_PAGE: 'card-page',
}

export const CLASSES = {
    ACTIVE: 'active',
    PAGE: 'page',
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