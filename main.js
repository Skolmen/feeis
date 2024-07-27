import { MainPage } from "./MainPage.js";

$(document).ready(() => {
    const $body = $('body');

    const mainPage = new MainPage($body);

    mainPage.init();
    mainPage.render();
});