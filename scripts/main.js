import { PageController } from "../pages/PageController.js";

$(document).ready(() => {
    const $body = $('body');

    const pageController = new PageController($body);

    pageController.init();
});