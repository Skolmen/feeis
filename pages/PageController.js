import { MenuBar } from "../components/MenuBar.js";
import { MainPage } from "./MainPage.js";
import { CardPage } from "./CardPage.js";
import { NewCardPage } from "./NewCardPage.js";

/**
 * Controlls the pages.
 */
export class PageController {
    constructor($body) {
        /**
         * The body of the page.
         * 
         * @property {jQuery}
         */
        this.$body = $body;

        /**
         * The header of the page.
         * 
         * @property {jQuery}
         */
        this.$header = null;

        this.$main = null;
    }

    init() {
        this.$header = this.createHeader();
        this.$main = this.createMain();

        this.mainPage = new MainPage();
        this.cardPage = new CardPage();
        this.newCardPage = new NewCardPage();
        this.menuBar = new MenuBar();

        this.mainPage.init().hide();
        this.cardPage.init().show();
        this.newCardPage.init().hide();
        this.menuBar.init();

        this.$main.append(this.mainPage.$element);
        this.$main.append(this.cardPage.$element);
        this.$main.append(this.newCardPage.$element);


        this.$body.append(this.$header);
        this.$body.append(this.$main);
        this.$body.append(this.menuBar.$element);        

    }

    createHeader() {
        const $header = $(`
            <header>
                <h1>🌐 Travel Calculator</h1>    
            </header>`
        );

        return $header;
    }

    createMain() {
        const $main = $('<main></main>');

        return $main;
    }
}