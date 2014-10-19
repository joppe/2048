/*global define*/

define(['backbone'], function (Backbone) {
    'use strict';

    var Cell;

    Cell = Backbone.Model.extend({
        defaults: {
            value: null
        }
    });

    return Cell;
});