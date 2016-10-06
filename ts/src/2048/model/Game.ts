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
            changedValues: 0,
            grid: new Grid(undefined, {
                size: options.size
            }),
            animations: 0,
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
            startRow:number = isIncrementalMovement ? this.get('size') - 1 : 0;

        // window.console.log(`isHorizontalMovement: ${isHorizontalMovement}`, `isIncrementalMovement: ${isIncrementalMovement}`, `direction.left: ${direction.left}`, `direction.top: ${direction.top}`);

        for (let gridLine of Object.keys(groupedValues)) {
            let values:Value[] = groupedValues[gridLine],
                mergeCandidate:Value;

            values.forEach((value:Value, index:number) => {
                let position:Position;

                // The first value must go to the start position of the row/column.
                if (0 === index) {
                    value.position = grid.getPosition({
                        column: isHorizontalMovement ? startColumn : Number(gridLine),
                        row: isHorizontalMovement ? Number(gridLine) : startRow
                    });

                    mergeCandidate = value;
                }

                // If there is a merge candidate and the value can be merged with it, do it.
                else if (mergeCandidate.isMergeable(value)) {
                    mergeCandidate.merge = value;

                // The position will be next to the mergeCandidate.
                } else {
                    value.position = grid.getPosition({
                        column: isHorizontalMovement ? mergeCandidate.get('position').get('column') - increment : mergeCandidate.get('position').get('column'),
                        row: isHorizontalMovement ? mergeCandidate.get('position').get('row') : mergeCandidate.get('position').get('row') - increment
                    });

                    mergeCandidate = value;
                }
            });
        }

        return this;
    }

    /**
     * @returns {boolean}
     */
    isAnimating():boolean {
        return 0 < this.get('animations');
    }

    /**
     * Increment the animations property
     */
    handleAnimationStart():void {
        this.set('animations', this.get('animations') + 1);
    }

    /**
     * Increment the animations property
     */
    handleAnimationEnd():void {
        this.set('animations', this.get('animations') - 1);
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
