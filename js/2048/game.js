/*global define*/

define(['backbone'], function (Backbone) {
    'use strict';

    var Game;

    Game = Backbone.View.extend({
        initialize: function () {
            console.log('initialize game');
        }
    });

    return Game;
});