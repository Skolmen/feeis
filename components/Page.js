export class Page {
    constructor() {
        this.$element = null;
    }

    show() {
        this.$element.show();
        return this;
    }

    hide() {
        this.$element.hide();
        return this;
    }

}