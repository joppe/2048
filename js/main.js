/*global require*/

require.config({
    baseUrl: 'js',
    urlArgs: 'bust=' +  (new Date()).getTime(),
    paths: {
        jquery: '/bower_components/jquery/dist/jquery',
        backbone: '/bower_components/backbone/backbone',
        underscore: '/bower_components/underscore/underscore'
    },
    shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

require(['2048/app', 'jquery'], function (App, $) {
    'use strict';

    new App({
        $el: $('#game'),
        size: 4
    });
});