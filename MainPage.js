

export class MainPage {
    constructor ($body) {
        this.$body = $body;
    } 

    init() {
        this.$body.append('<h1>Main Page</h1>');
    }

    render() {
        this.$body.append('<p>Rendered Main Page</p>');
    }
}