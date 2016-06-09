System.register(['jquery', './2048/App'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var jquery_1, App_1;
    return {
        setters:[
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (App_1_1) {
                App_1 = App_1_1;
            }],
        execute: function() {
            jquery_1.default(() => {
                new App_1.App(jquery_1.default('.js-game'), 4);
            });
        }
    }
});
//# sourceMappingURL=main.js.map