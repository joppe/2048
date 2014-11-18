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

        getRow: function (row) {
            return this.filter(function (model) {
                return model.get('row') === row;
            });
        },

        getColumn: function (col) {
            return this.filter(function (model) {
                return model.get('col') === col;
            });
        },

        getCell: function (props) {
            return this.findWhere({
                row: props.row,
                col: props.col
            });
        },

        getNextCell: function (cell, axis, index) {
            var props = {
                    row: cell.get('row'),
                    col: cell.get('col')
                };

            props[axis] = index;

            return this.getCell(props);
        }
    });

    return Grid;
});