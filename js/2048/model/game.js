/*global define*/

define([
    'backbone',
    'underscore',
    '2048/collection/grid',
    '2048/collection/value'
], function (
    Backbone,
    _,
    GridCollection,
    Value
) {
    'use strict';

    var Game;

    Game = Backbone.Model.extend({
        initialize: function () {
            this.set('grid', new GridCollection(undefined, {
                size: this.get('size')
            }));

            this.set('values', new Value());
            this.on('move', this.move, this);
        },

        cycle: function () {
            var cells = this.get('grid').getEmptyCells(),
                index = _.random(0, cells.length - 1),
                cell = cells[index],
                model = this.get('values').add({});

            cell.set('value', model);
        }
    });

    return Game;
});