import { CLASSES, DOM_SELECTORS, IDS } from '../constants/selectors.js';
import { Page } from '../components/Page.js';

const PAGE = `
    <div class="${CLASSES.PAGE}" id="${IDS.CARD_PAGE}">
        
        <h1>Cards</h1>

        <div class="${CLASSES.CARD_LIST}">

        </div>

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
        // Add a card to the page.
        const $card = this.renderCard();

        this.$element.find(DOM_SELECTORS.CARD_LIST).append($card);

        return this;
    }

    renderCard(card) {
    const $card = $(`
        <div class="${CLASSES.CARD}">
            <div class="${CLASSES.CARD_INNER}">
                <div class="${CLASSES.CARD_FRONT}">
                    <h2>Revolut</h2>
                    <label>Withdrawn</label>
                    <input type="number" value="0">
                    <label>Exchanged</label>
                    <input type="number" value="0">
                    <button>Flip</button>
                </div>
                <div class="${CLASSES.CARD_BACK}">
                    <div>
                        <h3>Withdrawal Low End</h3>
                        <label>Fee (%)</label>
                        <input type="number" value="0">
                        <label>Minimum Fee (HOM)</label>
                        <input type="number" value="0">
                        <label>Maximum to Low (HOM)</label>
                        <input type="number" value="0">
                    </div>

                    <div>
                        <h3>Withdrawal High End</h3>
                        <label>Fee (%)</label>
                        <input type="number" value="0">
                        <label>Minimum Fee (HOM)</label>
                        <input type="number" value="0">
                    </div>

                    <div>
                        <h3>Exchange</h3>
                        <label>Fee Low End (%)</label>
                        <input type="number" value="0">
                        <label>Max Low End (HOM)</label>
                        <input type="number" value="0">
                        <label>Fee High End (%)</label>
                        <input type="number" value="0">
                    </div>

                    <div>
                        <h3>Other</h3>
                        <label>Weekend Fee (%)</label>
                        <input type="number" value="0">
                    </div>

                    <button>Flip</button>
                </div>
            </div>
        </div>
    `);

    const $button = $card.find('button');

    $button.on('click', () => {
        $card.toggleClass('card-flipped');
    });

    return $card;
    }
}