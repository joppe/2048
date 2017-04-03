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
            locked: false,
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
     * @param {DirectionInterface} [direction]
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
        const randomCell:Cell = this.grid.getRandomCell(this.vals.getCells());

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
     * @param {DirectionInterface} direction
     * @returns {Game}
     */
    move(direction:DirectionInterface):Game {
        const isVerticalMovement:boolean = (0 !== direction.top);
        const isIncrementalMovement:boolean = (1 === direction.left || 1 === direction.top);
        const groupBy:string = isVerticalMovement ? 'column' : 'row';
        const increment:number = isIncrementalMovement ? 1 : -1;
        const start:number = isIncrementalMovement ? 0 : this.size - 1;
        const values:ValueIterator = new ValueIterator(this.vals, groupBy, !isIncrementalMovement);
        let mergeCandidate:Value;
        let updateCount:number = 0;

        for (const value of values) {
            let cell:Cell;

            if (undefined === mergeCandidate || mergeCandidate.cell.get(groupBy) !== value.cell.get(groupBy)) {
                cell = this.grid.getCell({
                    column: isVerticalMovement ? value.cell.column : start,
                    row: isVerticalMovement ? start : value.cell.row
                } as CellIndexInterface);
                window.console.log(`new axis: ${value}`);

                mergeCandidate = value;
            } else if (mergeCandidate.isMergeable(value)) {
                mergeCandidate.merge = value;

                updateCount += 1;

                window.console.log(`merge: ${value}`);
            } else {
                cell = this.grid.getCell({
                    column: isVerticalMovement ? mergeCandidate.cell.column : mergeCandidate.cell.column + increment,
                    row: isVerticalMovement ? mergeCandidate.cell.row + increment : mergeCandidate.cell.row
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
}

export {Game};
