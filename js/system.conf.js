/*global System*/

System.config({
    baseURL: './',

    defaultJSExtensions: true,

    map: {
        jquery: 'js/vendor/jquery/dist/jquery',
        underscore: 'js/vendor/underscore/underscore',
        backbone: 'js/vendor/backbone/backbone'
    },

    meta: {
        backbone: {
            deps: ['jquery', 'underscore']
        }
    }
});