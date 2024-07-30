import { CLASSES, IDS } from '../constants/selectors.js';
import { Page } from '../components/Page.js';

const PAGE = `
    <div class="${CLASSES.PAGE}" id="${IDS.CARD_PAGE}">
        Hejsan!
    </div>
`;

/**
 * This renders and manages the card page. 
 * 
 * This page will display the cards that are added by the user.
 */
export class CardPage extends Page {
    constructor () {
        super();
        this.$element = $(PAGE);
    } 

    init() {
        return this;
    }

}