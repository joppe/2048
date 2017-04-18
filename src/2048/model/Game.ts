import * as Backbone from 'backbone';
import {Values} from './../collection/Values';
import {CellIndexIterator} from './../iterator/CellIndexIterator';
import {ValueIterator} from './../iterator/ValueIterator';
import {Cell} from './Cell';
import {CellIndexInterface} from './CellIndexInterface';
import {DirectionInterface} from './DirectionInterface';
import {GameAttributesInterface} from './GameAttributesInterface';
import {Grid} from './Grid';
import {Value} from './Value';
import {ValueAttributesInterface} from './ValueAttributesInterface';
import {ValueLiteralInterface} from './ValueLiteralInterface';

/**
 * @class Game
 *
 * Use "vals" instead of "values", "values" is taken by Backbone.Model
 */
class Game extends Backbone.Model {
    /**
     * @param {object} [attributes]
     */
    constructor(attributes?:GameAttributesInterface) {
        super(attributes);

        this.set('grid', new Grid({
            size: this.size
        }));
    }

    /**
     * @returns {boolean}
     */
    get locked():boolean {
        return true === this.get('locked');
    }

    /**
     * @param {boolean} locked
     */
    set locked(locked:boolean) {
        this.set('locked', locked);
    }

    /**
     * @returns {number}
     */
    get score():number {
        return this.get('score');
    }

    /**
     * @returns {number}
     */
    get size():number {
        return this.get('size');
    }

    /**
     * @returns {Grid}
     */
    get grid():Grid {
        return this.get('grid');
    }

    /**
     * @returns {number}
     */
    get vals():Values {
        return this.get('vals');
    }

    /**
     * @returns {DirectionInterface}
     */
    get move():DirectionInterface {
        return this.get('move');
    }

    /**
     * Silently set the move direction and then trigger a change.
     *
     * @param {DirectionInterface} direction
     */
    set move(direction:DirectionInterface) {
        this.set('move', direction, {
            silent: true
        });
        this.trigger('change:move');
    }

    /**
     * @returns {object}
     */
    defaults():Backbone.ObjectHash {
        return {
            finished: false,
            score: 0,
            size: 4,
            vals: new Values()
        };
    }

    /**
     * @param {ValueLiteralInterface[]} values
     * @returns {Game}
     */
    addValues(values:ValueLiteralInterface[]):Game {
        this.locked = true;

        values.forEach((valueLiteral:ValueLiteralInterface) => {
            const cell:Cell = this.grid.getCell(valueLiteral.index);
            let valueAttributes:ValueAttributesInterface;

            if (undefined === cell) {
                throw new Error(`Invalid cell index row: ${valueLiteral.index.row} column: ${valueLiteral.index.column}`);
            }

            valueAttributes = {
                cell
            };

            if (undefined !== valueLiteral.value) {
                valueAttributes.value = valueLiteral.value;
            }

            this.vals.add(new Value(valueAttributes));
        });

        this.locked = false;

        return this;
    }

    /**
     * Try to move a value to another cell
     * Start with the cell that is the closest in the direction e.g. when moving to the left start with the most
     * left value
     *
     * Vertical movement
     * First loop over column index, then over row index
     *
     * Horizontal movement
     * First loop over row index, then over column index
     *
     * @param {DirectionInterface} direction
     * @returns {Game}
     */
    moveValues(direction:DirectionInterface):Game {
        const isVerticalMovement:boolean = (0 !== direction.top);
        const isIncrementalMovement:boolean = (1 === direction.left || 1 === direction.top);

        // If there is a vertical movement, a value can only move within the column it is in, therefore all values are
        // grouped by column. The groupBy is used as an outer loop, loop over the columns and in the loop loop over the
        // rows.
        const groupBy:string = isVerticalMovement ? 'column' : 'row';
        const increment:number = isIncrementalMovement ? 1 : -1;

        // This is the first index in the inner loop.
        const start:number = isIncrementalMovement ? 0 : this.size - 1;
        const values:ValueIterator = new ValueIterator(this.vals, groupBy, !isIncrementalMovement);

        // The merge candidate is a value where the value that is to be moved could be merged with if the contained
        // values are equal (and other dependencies are met).
        let mergeCandidate:Value;

        this.locked = true;

        // Loop over all available values that participate in the game
        for (const value of values) {
            // This is the cell the value can move to.
            let cell:Cell;

            // If there is no mergeCandidate or the mergeCandidate is in a different group
            if (undefined === mergeCandidate || mergeCandidate.cell.get(groupBy) !== value.cell.get(groupBy)) {
                cell = this.grid.getCell({
                    column: isVerticalMovement ? value.cell.column : start,
                    row: isVerticalMovement ? start : value.cell.row
                } as CellIndexInterface);

                mergeCandidate = value;

                // window.console.log(`new axis: ${value}`);
            } else if (mergeCandidate.isMergeable(value)) {
                mergeCandidate.merge = value;

                // window.console.log(`merge: ${value}`);
            } else {
                cell = this.grid.getCell({
                    column: isVerticalMovement ? mergeCandidate.cell.column : mergeCandidate.cell.column + increment,
                    row: isVerticalMovement ? mergeCandidate.cell.row + increment : mergeCandidate.cell.row
                } as CellIndexInterface);

                mergeCandidate = value;

                // window.console.log(`next: ${value}`);
            }

            if (undefined !== cell && value.cell !== cell) {
                value.move = cell;
            }
        }

        this.locked = false;

        return this;
    }

    /**
     * @returns {boolean}
     */
    canMove():boolean {
        const isVerticalMovement:boolean = true;
        const isIncrementalMovement:boolean = true;
        const cellIndexes:CellIndexIterator = new CellIndexIterator(this.size, isVerticalMovement, isIncrementalMovement);

        for (const cellIndex of cellIndexes) {
            const value:Value = this.vals.getByCellIndex(cellIndex);
            let right:Value;
            let bottom:Value;

            if (undefined === value) {
                return true;
            }

            if (cellIndex.column < this.size - 1) {
                right = this.vals.getByCellIndex({
                    column: cellIndex.column + 1,
                    row: cellIndex.row
                });

                if (undefined === right || value.isMergeable(right)) {
                    return true;
                }
            }

            if (cellIndex.row < this.size - 1) {
                bottom = this.vals.getByCellIndex({
                    column: cellIndex.column,
                    row: cellIndex.row + 1
                });

                if (undefined === bottom || value.isMergeable(bottom)) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * @returns {boolean}
     */
    isAnimating():boolean {
        return undefined !== this.vals.findWhere({
            animating: true
        });
    }
}

export {Game};
