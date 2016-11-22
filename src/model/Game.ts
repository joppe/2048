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
import {RangeIterator} from '../iterator/RangeIterator';
import {AxisIterator} from '../iterator/AxisIterator';

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
     * @returns {object}
     */
    defaults():Backbone.ObjectHash {
        return {
            score: 0,
            size: 4,
            vals: new Values()
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
            outer:AxisIterator = new AxisIterator(isVerticalMovement ? 'column' : 'row', this.size - 1, false),
            inner:AxisIterator = new AxisIterator(isVerticalMovement ? 'row' : 'column', this.size -1, !isIncrementalMovement);

        for (let o of outer) {
            let mergeCandidate:Value;

            for (let i of inner) {
                let index:CellIndexInterface = {
                        [outer.axis]: o,
                        [inner.axis]: i
                    } as CellIndexInterface,
                    value:Value = this.vals.getByCellIndex(index);

                if (undefined === value) {
                    continue;
                }

                if (undefined !== mergeCandidate && mergeCandidate.isMergeable(value)) {
                    mergeCandidate.merge = value;
                } else {
                    mergeCandidate = value;

                }
                window.console.log(`outer ${o} inner ${i}`);
            }
        }

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
