/*global System*/

System.config({
    baseURL: './',

    defaultJSExtensions: true,

    map: {
        jquery: 'vendor/jquery/dist/jquery',
        underscore: 'vendor/underscore/underscore',
        backbone: 'vendor/backbone/backbone'
    },

    meta: {
        backbone: {
            deps: ['jquery', 'underscore']
        }
    }
});