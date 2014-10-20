/*global define*/

define([
    'backbone',
    '2048/model/value'
], function (
    Backbone,
    Model
) {
    'use strict';

    var Value;

    Value = Backbone.Collection.extend({
        model: Model
    });

    return Value;
});