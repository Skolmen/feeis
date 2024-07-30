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
                            <h3>Withdrawal Low End <span class="toggle-icon">⬇</span></h3>
                            <div class="submenu">
                                <label>Fee (%)</label>
                                <input type="number" value="0">
                                <label>Minimum Fee (HOM)</label>
                                <input type="number" value="0">
                                <label>Maximum to Low (HOM)</label>
                                <input type="number" value="0">
                            </div>
                        </div>
        
                        <div>
                            <h3>Withdrawal High End <span class="toggle-icon">⬇</span></h3>
                            <div class="submenu">
                                <label>Fee (%)</label>
                                <input type="number" value="0">
                                <label>Minimum Fee (HOM)</label>
                                <input type="number" value="0">
                            </div>
                        </div>
        
                        <div>
                            <h3>Exchange Fees<span class="toggle-icon">⬇</span></h3>
                            <div class="submenu">
                                <label>Low End (%)</label>
                                <input type="number" value="0">
                                <label>Maximum to Low End (HOM)</label>
                                <input type="number" value="0">
                                <label>High End (%)</label>
                                <input type="number" value="0">
                            </div>
                        </div>
        
                        <div>
                            <h3>Other <span class="toggle-icon">⬇</span></h3>
                            <div class="submenu">
                                <label>Weekend Fee (%)</label>
                                <input type="number" value="0">
                            </div>
                        </div>
        
                        <button>Flip</button>
                    </div>
                </div>
            </div>
        `);
        
        $card.find('h3').on('click', function() {
            const $submenu = $(this).next('.submenu');
            const $icon = $(this).find('.toggle-icon');
        
            if ($submenu.hasClass('submenu-expanded')) {
                // If the clicked submenu is already expanded, close it
                $submenu.removeClass('submenu-expanded');
                $icon.text('⬇'); // Change to down arrow
            } else {
                // Close any open submenu
                $card.find('.submenu-expanded').removeClass('submenu-expanded');
                $card.find('.toggle-icon').text('⬇'); // Reset all icons to down arrow
        
                // Open the clicked submenu
                $submenu.addClass('submenu-expanded');
                $icon.text('⬆'); // Change to up arrow if expanded
            }
        });
        
        $card.on('click', 'button', function() {
            $card.toggleClass('card-flipped');
        });
        
        
        return $card;
    }
}