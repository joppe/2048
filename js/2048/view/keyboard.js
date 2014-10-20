/*global define*/

define([
    'backbone',
    'underscore'
], function (
    Backbone,
    _
) {
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
            var direction = {
                    left: 0,
                    top: 0
                };

            if (_.indexOf(KEYS, event.which) !== -1) {
                switch (event.which) {
                    case KEY_RIGHT:
                        direction.left = 1;
                        break;
                    case KEY_LEFT:
                        direction.left = -1;
                        break;
                    case KEY_TOP:
                        direction.top = -1;
                        break;
                    case KEY_BOTTOM:
                        direction.top = 1;
                        break;
                }

                this.model.move(direction);
            }
        }
    });

    return Keyboard;
});