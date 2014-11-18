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
    ValueCollection
) {
    'use strict';

    var Game;

    Game = Backbone.Model.extend({
        initialize: function () {
            var values = new ValueCollection();

            this.set('grid', new GridCollection(undefined, {
                size: this.get('size')
            }));

            this.set('values', values);
            this.listenTo(values, 'change:value', this.score);
        },

        cycle: function () {
            var cells = this.get('grid').getEmptyCells(),
                index = _.random(0, cells.length - 1),
                cell = cells[index],
                model = this.get('values').add({});

            cell.set('value', model);
        },

        score: function () {
            console.log('score', arguments);
        },

        /**
         * Move to the right
         * direction = {left: 1, top: 0}
         * outerLoop = [0, 1, 2, 3]
         * outerProp = 'row'
         * innerLoop = [3, 2, 1]
         * innerProp = 'col'
         * endIndex = 4
         * increment = 1
         *
         * @param direction
         */
        move: function (direction) {
            var moved = false,
                outerLoop = _.range(0, this.get('size')),
                outerProp = direction.top !== 0 ? 'col' : 'row',
                innerLoop = _.range(0, this.get('size')),
                innerProp = direction.top !== 0 ? 'row' : 'col',
                increment = direction.top === 1 || direction.left === 1 ? -1 : 1;

            if (1 === direction.left || 1 === direction.top) {
                innerLoop.reverse();
            }

            // remove last cell
            innerLoop.pop();

            _.each(outerLoop, function (outer) {
                _.each(innerLoop, function (inner) {
                    var props = {},
                        cell,
                        next,
                        stop = false,
                        index = inner + increment;

                    props[innerProp] = inner;
                    props[outerProp] = outer;

                    cell = this.get('grid').getCell(props);

                    while (false === stop && (next = this.get('grid').getNextCell(cell, innerProp, index))) {
                        if (null !== next.get('value')) {
                            if (null === cell.get('value') || cell.get('value').same(next.get('value'))) {
                                next.move(cell);
                                stop = true;
                                moved = true;
                            }
                        }

                        index += increment;
                    }
                }, this);
            }, this);

            if (true === moved) {
                this.cycle();
            }
        }
    });

    return Game;
});