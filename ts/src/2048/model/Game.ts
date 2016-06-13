/// <reference path="../../../../typings/globals/backbone-global/index.d.ts" />
/// <reference path="../../../../typings/globals/underscore/index.d.ts" />
/// <reference path="GameOptionsInterface.ts" />
/// <reference path="DirectionInterface.ts" />

import * as Backbone from 'backbone';
import {Grid} from './../collection/Grid';
import {Values} from './../collection/Values';
import {Position} from './Position';
import {Value} from './Value';

/**
 * @class Game
 */
export class Game extends Backbone.Model {
    /**
     * @param {object} options
     */
    constructor(options:GameOptionsInterface) {
        super(options);

        let values = new Values();

        this.set({
            grid: new Grid(undefined, {
                size: options.size
            }),
            values
        });

        this.listenTo(values, 'change:value', this.score.bind(this));
    }

    /**
     * Handle move request
     * 
     * When move right:
     * - loop over rows
     * - loop over columns
     * 
     * @param {DirectionInterface} direction
     * @returns {Game}
     */
    move(direction:DirectionInterface):Game {
        let values:Values = this.get('values');
        window.console.log(direction.left, direction.top);
        values.each((value:Value):void => {
            window.console.log(value.attributes);
        });

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
         *

        /*
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
/**/
        return this;
    }

    /**
     * @returns {Game}
     */
    cycle():Game {
        window.console.log('Game.cycle');
        let values:Values = this.get('values'),
            grid:Grid = this.get('grid'),
            usedPositions:Position[] = values.getPositions(),
            position = grid.getRandomPosition(usedPositions),
            value:Value = values.add({});

        value.set('position', position);

        return this;
    }

    /**
     * @returns {Game}
     */
    score():Game {
        window.console.log('score', arguments);
        return this;
    }
}
