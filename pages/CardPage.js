import { CLASSES, DOM_SELECTORS, IDS } from '../constants/selectors.js';
import { Page } from '../components/Page.js';
import CardManager from '../objects/CardManager.js';

const PAGE = `
    <div class="${CLASSES.PAGE}" id="${IDS.CARD_PAGE}">
        
        <h1>Cards</h1>

        <div class="${CLASSES.CARD_LIST}">

        </div>

        <div class="${CLASSES.NEW_CARD_BUTTON}" id="${IDS.NEW_CARD_BUTTON}">
            ➕
        </div>

    </div>
`;

const DIALOG_TEMPLATE = `
    <div class="${CLASSES.DIALOG_OVERLAY}">
        <div class="${CLASSES.DIALOG_BOX}">
            <div class="${CLASSES.DIALOG_HEADER}">
                <h2>
                
                </h2>
                <div class="${CLASSES.DIALOG_CLOSE}">X</div>
            </div>
            <div class="${CLASSES.DIALOG_CONTENT}">

            </div>
        </div>
    </div>
`;

const DIALOG_EDIT_CARD = `
    <div class="${CLASSES.DIALOG_CONTENT_EDIT_CARD}">
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
`;

const DIALOG_NEW_CARD = `
    <div class="${CLASSES.DIALOG_CONTENT_NEW_CARD}">
        <p>Choose a new pre-defined card or create a new one.</p>
        <label>Pre-defined cards</label>
        <select>

        </select>
        <div>
            <button>Add pre-defined</button>
            <button>Create own card</button>
        </div>
    </div>
`;

const DIALOG_DELETE_CARD = `
    <div class="${CLASSES.DIALOG_CONTENT_DELETE_CARD}">
        <p>Are you sure you want to delete this card?</p>
        <div>
            <button>Yes</button>
            <button>No</button>
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

        this.$editDialog = null;

        this.$deleteDialog = null;

        this.$newCardDialog = null;
    } 

    init() {
        // Add a card to the page.
        const $card = this.renderCard();

        this.$editDialog = this._buildEditDialog();

        this.$deleteDialog = this._buildDeleteDialog();

        this.$newCardDialog = this._buildNewCardDialog();

        const $newCardButton = this.$element.find(DOM_SELECTORS.NEW_CARD_BUTTON);
        
        $newCardButton.on('click', () => {
            this.showNewCardDialog();
        });

        this.$element.append(this.$editDialog);

        this.$element.append(this.$deleteDialog);

        this.$element.append(this.$newCardDialog);

        this.$element.find(DOM_SELECTORS.CARD_LIST).append($card);

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
            this.showEditDialog(card);
        });

        $deleteButton.on('click', () => {
            this.showDeleteDialog(card);
        });

        $withdrawnInput.on('change', () => {
            // Update the value.
        });

        $exchangedInput.on('change', () => {
            // Update the value.
        });
    
        return $card;
    }

    _buildDialog() {
        const $dialog = $(DIALOG_TEMPLATE);
        
        $dialog.find(DOM_SELECTORS.DIALOG_CLOSE).on('click', () => {
            $dialog.hide();
        });

        return $dialog;
    }

    _buildEditDialog() {
        const $dialog = this._buildDialog();

        const heading = 'Edit Card';

        $dialog.find(DOM_SELECTORS.DIALOG_HEADER).find('h2').text(heading);

        $dialog.find(DOM_SELECTORS.DIALOG_CONTENT).append(DIALOG_EDIT_CARD);

        return $dialog;
    }

    _buildDeleteDialog() {
        const $dialog = this._buildDialog();

        const heading = 'Delete Card';

        $dialog.find(DOM_SELECTORS.DIALOG_HEADER).find('h2').text(heading);

        $dialog.find(DOM_SELECTORS.DIALOG_CONTENT).append(DIALOG_DELETE_CARD);

        return $dialog;
    }

    _buildNewCardDialog() {
        const $dialog = this._buildDialog();

        const heading = 'New Card';

        $dialog.find(DOM_SELECTORS.DIALOG_HEADER).find('h2').text(heading);

        $dialog.find(DOM_SELECTORS.DIALOG_CONTENT).append(DIALOG_NEW_CARD);

        const $addPredefinedButton = $dialog.find('button').eq(0);
        const $createOwnCardButton = $dialog.find('button').eq(1);

        $addPredefinedButton.on('click', () => {
            // Add the predefined card.
            console.log('Add predefined card');
        });

        $createOwnCardButton.on('click', () => {
            // Add the own card.
            console.log('Create own card');
        });

        const $select = $dialog.find('select');

        // Add the predefined cards to the select.
        CardManager.getPreDefinedCards().forEach(card => {
            $select.append(`<option value="${card.key}">${card.name}</option>`);
        });

        return $dialog;
    }

    showEditDialog(card) {
        // Show the edit dialog.
        this.$editDialog.show();

        // Populate the dialog with the card data.
    } 

    showDeleteDialog(card) {
        // Show the delete dialog.
        this.$deleteDialog.show();

        // Populate the dialog with data to delete the card.
    }

    showNewCardDialog() {
        // Show the new card dialog.
        this.$newCardDialog.show();
    }

}