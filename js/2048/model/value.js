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
        }
    });

    return Value;
});