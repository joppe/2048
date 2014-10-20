/*global define*/

define([
    'backbone',
    'underscore',
    '2048/model/cell'
], function (
    Backbone,
    _,
    Cell
) {
    'use strict';

    var Grid;

    Grid = Backbone.Collection.extend({
        model: Cell,

        initialize: function (models, options) {
            _.each(_.range(0, options.size), function (row) {
                _.each(_.range(0, options.size), function (col) {
                    this.add({
                        row: row,
                        col: col
                    });
                }, this);
            }, this);
        },

        getEmptyCells: function () {
            return this.filter(function (model) {
                return model.get('value') === null;
            });
        },

        move: function (direction) {
            console.log(direction);
        }
    });

    return Grid;
});