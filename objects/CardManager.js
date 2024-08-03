import { cardData } from "../data/cardData.js";
import { generateUUID } from "../tools/uuid.js";

class CardManager {
    constructor() {
        this.cards = [];
    }

    init() {
        return this;
    }

    getPreDefinedCards() {
        let cards = [];

        for (const key in cardData) {
            if (cardData.hasOwnProperty(key)) {
                const card = cardData[key];
                cards.push({
                    key: key,
                    name: card['card-name'],
                });
            }
        }

        return cards;

    }

    addPreDefinedCard(key) {
        const card = this.getPreDefinedCardData(key);
        this.addCard(card);
    }

}

export default new CardManager();