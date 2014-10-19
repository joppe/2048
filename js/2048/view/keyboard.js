/*global define*/

define(['backbone', 'underscore'], function (Backbone, _) {
    'use strict';

    var Keyboard,
        KEY_RIGHT = 39,
        KEY_TOP = 38,
        KEY_LEFT = 37,
        KEY_BOTTOM = 40,
        KEYS = [KEY_RIGHT, KEY_LEFT, KEY_BOTTOM, KEY_TOP];

    Keyboard = Backbone.View.extend({
        events: {
            'keyup': 'keypress'
        },

        keypress: function (event) {
            if (_.indexOf(KEYS, event.which)) {

            }
        }
    });

    return Keyboard;
});