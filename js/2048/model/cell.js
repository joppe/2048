/*global define*/

define([
    'backbone'
], function (
    Backbone
) {
    'use strict';

    var Cell;

    Cell = Backbone.Model.extend({
        defaults: {
            value: null
        },

        move: function (target) {
            if (this.get('value').same(target)) {
                // merge value
                target.get('value').double();
                this.get('value').destroy();
            } else {
                // move value
                target.set('value', this.get('value'));
            }

            this.set('value', null);
        }
    });

    return Cell;
});