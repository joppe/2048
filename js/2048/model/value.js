/*global define*/

define([
    'backbone'
], function (
    Backbone
) {
    'use strict';

    var Value;

    Value = Backbone.Model.extend({
        initialize: function () {
            this.set('value', Math.random() > 0.8 ? 4 : 2);
        },

        same: function (value) {
            return this.get('value') === value.get('value');
        },

        double: function () {
            this.set('value', this.get('value') * 2);
        },

        destroy: function () {
            this.trigger('destroy', this);
        }
    });

    return Value;
});