/// <reference path="../../../../typings/globals/backbone-global/index.d.ts" />
/// <reference path="../../../../typings/globals/underscore/index.d.ts" />

import * as Backbone from 'backbone';
import {Grid} from './../collection/Grid';
import {Values} from './../collection/Values';
import {Position} from './Position';
import {Value} from './Value';
import {DirectionInterface} from './../interface/DirectionInterface';
import {GameOptionsInterface} from './../interface/GameOptionsInterface';
import {GridValuesInterface} from './../interface/GridValuesInterface';

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
        let isHorizontalMovement:boolean = (0 !== direction.left),
            isIncrementalMovement:boolean = (1 === direction.left || 1 === direction.top),
            increment:number = isIncrementalMovement ? 1 : -1,
            groupedValues:GridValuesInterface = this.get('values').getAsGrid(isHorizontalMovement ? 'row' : 'column', isHorizontalMovement ? 'column' : 'row', isIncrementalMovement),
            grid:Grid = this.get('grid'),
            startColumn:number = isIncrementalMovement ? this.get('size') - 1 : 0,
            startRow:number = isIncrementalMovement ? this.get('size') - 1 : 0,
            hasUpdated:boolean = false;

        window.console.log(`isHorizontalMovement: ${isHorizontalMovement}`, `isIncrementalMovement: ${isIncrementalMovement}`, `direction.left: ${direction.left}`, `direction.top: ${direction.top}`);

        for (let index of Object.keys(groupedValues)) {
            let values:Value[] = groupedValues[index],
                mergeCandidate:Value;

            values.forEach((value:Value) => {
                if (undefined === mergeCandidate) {
                    value.stage({
                        position: grid.getPosition({
                            column: isHorizontalMovement ? startColumn : Number(index),
                            row: isHorizontalMovement ? Number(index) : startRow
                        })
                    });

                    mergeCandidate = value;
                } else if (mergeCandidate.mergable(value)) {
                    mergeCandidate.stage({
                        merge: value
                    });
                } else {
                    value.stage({
                        position: grid.getPosition({
                            column: isHorizontalMovement ? mergeCandidate.getStaged('position').get('column') - increment : mergeCandidate.getStaged('position').get('column'),
                            row: isHorizontalMovement ? mergeCandidate.getStaged('position').get('row') : mergeCandidate.getStaged('position').get('row') - increment
                        })
                    });

                    mergeCandidate = value;
                }

                if (value.willChange()) {
                    hasUpdated = true;
                }
            });
        }

        this.get('values').each((value:Value) => {
            value.commit();
        });

        if (true === hasUpdated) {
            this.cycle();
        } else {
            this.trigger('finish');
        }

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
