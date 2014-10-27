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
            if (target.get('value') && this.get('value').same(target.get('value'))) {
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