import Backbone from 'backbone';
import {Grid} from './Grid';
import {Values} from './../collection/Values';
import {GameAttributesInterface} from './GameAttributesInterface';
import {ValueLiteralInterface} from './ValueLiteralInterface';
import {ValueAttributesInterface} from './ValueAttributesInterface';
import {Value} from './Value';
import {DirectionInterface} from './DirectionInterface';
import {CellIndexInterface} from './CellIndexInterface';
import {CellIndexIterator} from '../iterator/CellIndexIterator';
import {ValueIterator} from '../iterator/ValueIterator';
import {Cell} from './Cell';

/**
 * @class Game
 *
 * Use "vals" instead of "values", "values" is taken by Backbone.Model
 */
class Game extends Backbone.Model {
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
     * @returns {number}
     */
    get animationCount():number {
        return this.get('animationCount');
    }

    /**
     * @param {number} count
     */
    set animationCount(count:number) {
        this.set('animationCount', count);

        this.cycle();
    }

    /**
     * @returns {object}
     */
    defaults():Backbone.ObjectHash {
        return {
            score: 0,
            size: 4,
            vals: new Values(),
            finished: false
        };
    }

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
     * @param {object[]} values
     * @returns {Game}
     */
    addValues(values:ValueLiteralInterface[]):Game {
        values.forEach((valueLiteral:ValueLiteralInterface) => {
            let cell = this.grid.getCell(valueLiteral.index),
                valueAttributes:ValueAttributesInterface;

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

        return this;
    }

    /**
     * @returns {Game}
     */
    decrementAnimationCount():Game {
        if (this.animationCount <= 0) {
            throw new Error(`Cannot decrement animationCount, count is ${this.animationCount}`);
        }

        this.animationCount -= 1;

        return this;
    }

    /**
     * @param {object} [direction]
     * @returns {Game}
     */
    cycle(direction?:DirectionInterface):Game {
        // guard: don't do anything when the game is animating
        if (this.animationCount > 0) {
            return;
        }

        if (undefined !== direction) {
            this.move(direction);
        } else {
            this.appear();
        }

        return this;
    }

    /**
     * @returns {Game}
     */
    appear():Game {
        /**
         * get random empty cell
         * create new value
         */
        let randomCell = this.grid.getRandomCell(this.vals.getCells());

        if (undefined === randomCell) {
            this.set('finished', true);
            return;
        }

        this.vals.add(new Value({
            cell: randomCell
        }));

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
     * @param {object} direction
     * @returns {Game}
     */
    move(direction:DirectionInterface):Game {
        let isVerticalMovement:boolean = (0 !== direction.top),
            isIncrementalMovement:boolean = (1 === direction.left || 1 === direction.top),
            groupBy:string = isVerticalMovement ? 'column' : 'row',
            increment:number = isIncrementalMovement ? 1 : -1,
            start:number = isIncrementalMovement ? 0 : this.size - 1,
            values:ValueIterator = new ValueIterator(this.vals, groupBy, !isIncrementalMovement),
            mergeCandidate:Value,
            updateCount:number = 0;

        for (let value of values) {
            let cell:Cell;

            if (undefined === mergeCandidate || mergeCandidate.cell.get(groupBy) !== value.cell.get(groupBy)) {
                cell = this.grid.getCell({
                    row: isVerticalMovement ? start : value.cell.row,
                    column: isVerticalMovement ? value.cell.column : start
                } as CellIndexInterface);
                window.console.log(`new axis: ${value}`);

                mergeCandidate = value;
            } else if (mergeCandidate.isMergeable(value)) {
                mergeCandidate.merge = value;

                updateCount += 1;

                window.console.log(`merge: ${value}`);
            } else {
                cell = this.grid.getCell({
                    row: isVerticalMovement ? mergeCandidate.cell.row + increment : mergeCandidate.cell.row,
                    column: isVerticalMovement ? mergeCandidate.cell.column : mergeCandidate.cell.column + increment
                } as CellIndexInterface);

                mergeCandidate = value;

                window.console.log(`next: ${value}`);
            }

            if (undefined !== cell && value.cell !== cell) {
                value.cell = cell;

                updateCount += 1;
            }
        }

        this.animationCount = updateCount;
        this.trigger('animate:start');

        return this;
    }

    /**
     * @returns {boolean}
     */
    canMove():boolean {
        let isVerticalMovement:boolean = true,
            isIncrementalMovement:boolean = true,
            cellIndexes:CellIndexIterator = new CellIndexIterator(this.size, isVerticalMovement, isIncrementalMovement);

        for (let cellIndex of cellIndexes) {
            let value:Value = this.vals.getByCellIndex(cellIndex),
                right:Value,
                bottom:Value;

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
}

export {Game};
