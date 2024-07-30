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
                        <div class="card-back-left">
                            <h3>Withdrawal Fees</h3>
                            <h3 class="withdrawal-low-end-header clickable-header">Low End</h3>
                            <h3 class="withdrawal-high-end-header clickable-header">High End </h3>
                            <h3></br></h3>
                            <h3 class="exchange-fees-header clickable-header">Exchange Fees</h3>
                            <h3 class="other-fees-header clickable-header">Other</h4>
                            <button>Flip</button>
                        </div>
    
                        <div class="card-back-right">
                            <div class="submenu withdrawal-low-end">
                                <label>Fee (%)</label>
                                <input type="number" value="0">
                                <label>Minimum Fee (HOM)</label>
                                <input type="number" value="0">
                                <label>Maximum to Low (HOM)</label>
                                <input type="number" value="0">
                            </div>
        
                            <div class="submenu withdrawal-high-end">
                                <label>Fee (%)</label>
                                <input type="number" value="0">
                                <label>Minimum Fee (HOM)</label>
                                <input type="number" value="0">
                            </div>
        
                            <div class="submenu exchange-fees">
                                <label>Low End (%)</label>
                                <input type="number" value="0">
                                <label>Maximum to Low End (HOM)</label>
                                <input type="number" value="0">
                                <label>High End (%)</label>
                                <input type="number" value="0">
                            </div>
        
                            <div class="submenu other-fees">
                                <label>Weekend Fee (%)</label>
                                <input type="number" value="0">
                            </div>
                        </div>
    
                    </div>
                </div>
            </div>
        `);
        
        const $withdrawalLowEndHeader = $card.find('.withdrawal-low-end-header');
        const $withdrawalHighEndHeader = $card.find('.withdrawal-high-end-header');
        const $exchangeFeesHeader = $card.find('.exchange-fees-header');
        const $otherFeesHeader = $card.find('.other-fees-header');
    
        const $withdrawalLowEnd = $card.find('.withdrawal-low-end');
        const $withdrawalHighEnd = $card.find('.withdrawal-high-end');
        const $exchangeFees = $card.find('.exchange-fees');
        const $otherFees = $card.find('.other-fees');
    
        function closeAllSubmenus() {
            $withdrawalLowEnd.hide();
            $withdrawalHighEnd.hide();
            $exchangeFees.hide();
            $otherFees.hide();
        }
    
        $withdrawalLowEndHeader.on('click', () => {
            closeAllSubmenus();
            $withdrawalLowEnd.toggle();
        });
    
        $withdrawalHighEndHeader.on('click', () => {
            closeAllSubmenus();
            $withdrawalHighEnd.toggle();
        });
    
        $exchangeFeesHeader.on('click', () => {
            closeAllSubmenus();
            $exchangeFees.toggle();
        });
    
        $otherFeesHeader.on('click', () => {
            closeAllSubmenus();
            $otherFees.toggle();
        });
    
        $card.on('click', 'button', function() {
            $card.toggleClass('card-flipped');
        });
    
        return $card;
    }
}