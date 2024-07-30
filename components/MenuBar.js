import { DOM_SELECTORS, IDS } from "../constants/selectors.js";

const LIST_ITEMS = [
    { id: `${IDS.MAIN_PAGE}`, text: 'Home', icon : '🏠' },
    { id: `${IDS.CARD_PAGE}`, text: 'Cards', icon: '💳' },
    { id: `${IDS.NEW_CARD_PAGE}`, text: 'New Card', icon: '➕' }
];

/**
 * Menu Bar component.
 * 
 * This component will render at the bottom of the page.
 * 
 * It will have links to change the content of the page to the main page, new card page, and card page.
 */
export class MenuBar {
    constructor() {
        /**
         * The element that will be rendered.
         */
        this.$element = null;
    }

    init() {
        this.$element = this.createNavBar();
    }

    createNavBar() {
        const $navBar = $(`
            <nav>
                <ul>

                </ul>
            </nav>
        `);
        const listItems = this.createListItems();
        $navBar.find('ul').append(listItems);
        return $navBar;
    }

    createListItems() {
        // Create the list items.
        // Use the id to change the page.
        // The id is for the page that will be displayed. Display none for the other pages
        // So use the id and change the display property of the page.
        let listItems = [];
        for (const item of LIST_ITEMS) {
            const $listItem = $(`
                <li>
                    ${item.icon}</br>${item.text}
                </li>
            `);
            $listItem.on('click', () => {
                // Hide all pages
                $(DOM_SELECTORS.PAGE).hide();
                // Show the clicked page
                const $page = $(`#${item.id}`);
                $page.show();
            });
            listItems.push($listItem);
        }
        return listItems;
    }
}