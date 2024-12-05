const tabs = require("./tabs.cjs");
const staff = require("./staff.cjs");
const slideshowSlides = require("./slideshowSlides.cjs");

module.exports = () => {
    return {
        tabs,
        staff,
        slideshowSlides,
    };
};
