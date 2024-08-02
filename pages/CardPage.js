import { CLASSES, DOM_SELECTORS, IDS } from '../constants/selectors.js';
import { Page } from '../components/Page.js';

const PAGE = `
    <div class="${CLASSES.PAGE}" id="${IDS.CARD_PAGE}">
        
        <h1>Cards</h1>

        <div class="${CLASSES.CARD_LIST}">

        </div>

    </div>
`;

const POP_UP = `
    <div class="${CLASSES.POPUP}">
        <div class="${CLASSES.POPUP_CONTENT}">
            <div class="${CLASSES.POPUP_CLOSE}">X</div>
            <h1>Edit Card</h1>
            <span>
                <label>Card Name</label>
                <input type="text" value="Revolut">
            </span>
            <span>
                <label>Withdrawn</label>
                <span>
                    <input type="number" value="0">
                    <span>HOM</span>
                </span>
            </span>
            <span>
                <label>Exchanged</label>
                <span>
                    <input type="number" value="0">
                    <span>HOM</span>
                </span>
            </span>
            <span>
                <label>Wihdrawal Fee Low End</label>
                <span>
                    <input type="number" value="0">
                    <span>%</span>
                </span>
            </span>
            <span>
                <label>Wihdrawal Fee Low Minimum</label>
                <span>
                    <input type="number" value="0">
                    <span>HOM</span>
                </span>
            </span>
            <span>
                <label>Max Withdrawal Low</label>
                <span>
                    <input type="number" value="0">
                    <span>HOM</span>
                </span>
            </span>
            <span>
                <label>Withdrawal High End</label>
                <span>
                    <input type="number" value="0">
                    <span>%</span>
                </span>
            </span>
            <span>
                <label>Withdrawal Fee High Minimum</label>
                <span>
                    <input type="number" value="0">
                    <span>HOM</span>
                </span>
            </span>
            <span>
                <label>Exchange Fee Low End</label>
                <span>
                    <input type="number" value="0">
                    <span>%</span>
                </span>
            </span>
            <span>
                <label>Max Exchange Low End</label>
                <span>
                    <input type="number" value="0">
                    <span>HOM</span>
                </span>
            </span>
            <span>
                <label>Exchange Fee High End</label>
                <span>
                    <input type="number" value="0">
                    <span>%</span>
                </span>
            </span>
            <span>
                <label>Weekend Exchange Fee</label>
                <span>
                    <input type="number" value="0">
                    <span>%</span>
                </span>
            </span>
        </div>
    </div>
`;

const DELETE_DIALOG = `
    <div class="${CLASSES.POPUP}">
        <div class="${CLASSES.POPUP_CONTENT} ${CLASSES.DELETE_CARD_POPUP}">
            <div class="${CLASSES.POPUP_CLOSE}">X</div>
            <h2>Delete Card</h2>
            <p>Are you sure you want to delete this card?</p>
            <div>
                <button>Yes</button>
                <button>No</button>
            </div>
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

        const $popUp = this.renderPopUp();

        const $deleteDialog = this.renderDeleteDialog();

        this.$element.find(DOM_SELECTORS.CARD_LIST).append($card);

        this.$element.append($popUp);

        this.$element.append($deleteDialog);

        return this;
    }

    renderCard(card) {
        const $card = $(`
            <div class="${CLASSES.CARD}">
                <div class="${CLASSES.CARD_TOP}">
                    <h2>Revolut</h2>
                </div>
                <div class="${CLASSES.CARD_MIDDLE}">
                    <div>
                        <label>Withdrawn</label>
                        <span>
                            <input type="number" value="0">
                            <span>HOM</span>
                        </span>
                    </div>
                    <div>
                        <label>Exchanged</label>
                        <span>
                            <input type="number" value="0">
                            <span>HOM</span>
                        </span>
                    </div>
                </div>
                <div class="${CLASSES.CARD_BOTTOM}">
                    <div>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
            </div>
        `);

        const $editButton = $card.find('button').eq(0);
        const $deleteButton = $card.find('button').eq(1);

        const $withdrawnInput = $card.find('input').eq(0);
        const $exchangedInput = $card.find('input').eq(1);

        $editButton.on('click', () => {
            // Edit the card.
        });

        $deleteButton.on('click', () => {
            // Delete the card.
        });

        $withdrawnInput.on('change', () => {
            // Update the value.
        });

        $exchangedInput.on('change', () => {
            // Update the value.
        });
    
        return $card;
    }

    renderPopUp() {
        const $popUp = $(POP_UP);

        return $popUp;
    }

    renderDeleteDialog() {
        const $deleteDialog = $(DELETE_DIALOG);

        return $deleteDialog;
    }
}