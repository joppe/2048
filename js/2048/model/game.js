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
        },

        /**
         * Move to the right
         * direction = {left: 1, top: 0}
         * outerLoop = [0, 1, 2, 3]
         * outerProp = 'row'
         * innerLoop = [2, 1, 0]
         * innerProp = 'col'
         * endIndex = 4
         * increment = 1
         *
         * @param direction
         */
        move: function (direction) {
            var outerLoop = _.range(0, this.get('size')),
                outerProp = direction.top !== 0 ? 'col' : 'row',
                innerLoop = _.range(0, this.get('size')),
                innerProp = direction.top !== 0 ? 'row' : 'col',
                increment = direction.top === -1 || direction.left === -1 ? -1 : 1;

            if (1 === direction.left || 1 === direction.top) {
                innerLoop.reverse();
            }

            innerLoop.shift();

            _.each(outerLoop, function (outer) {
                _.each(innerLoop, function (inner) {
                    var props = {},
                        cell,
                        target = null,
                        index,
                        next;

                    props[innerProp] = inner;
                    props[outerProp] = outer;

                    cell = this.get('grid').getCell(props);

                    if (cell.get('value')) {
                        next = cell;
                        index = inner;

                        while (undefined !== next && (null === next.get('value') || cell.get('value').same(next.get('value')))) {
                            target = next;
                            index += increment;

                            props[innerProp] = index;
                            props[outerProp] = outer;

                            next = this.get('grid').getCell(props);
                        }

                        if (null !== target && cell !== target) {
                            cell.move(target);
                        }
                    }
                }, this);
            }, this);
        }
    });

    return Game;
});