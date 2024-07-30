import { Page } from '../components/Page.js';
import { CLASSES, IDS } from '../constants/selectors.js';

const PAGE = `
    <div class="${CLASSES.PAGE}" id="${IDS.MAIN_PAGE}">
        Hejsan!
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
        return this;
    }

}