import LocalStorageManager from "../components/LocalStorageManager.js";
import CardManager from "../objects/CardManager.js";
import { PageController } from "../pages/PageController.js";

$(document).ready(() => {
    const $body = $('body');

    LocalStorageManager.init();
    CardManager.init();

    const pageController = new PageController($body);

    pageController.init();
});