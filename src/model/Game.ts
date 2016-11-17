import Backbone from 'backbone';
import {Grid} from './Grid';
import {Values} from './../collection/Values';
import {GameAttributesInterface} from './GameAttributesInterface';
import {ValueLiteralInterface} from './ValueLiteralInterface';
import {ValueAttributesInterface} from './ValueAttributesInterface';
import {Value} from './Value';
import {DirectionInterface} from './DirectionInterface';
import {CellIndexInterface} from './CellIndexInterface';
import {DirectionIterator} from '../iterator/DirectionIterator';

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
            outer:DirectionIterator = new DirectionIterator(
                0,
                this.size - 1,
                1,
                isVerticalMovement ? 'column' : 'row'
            ),
            inner:DirectionIterator = new DirectionIterator(
                isIncrementalMovement ? 0 : this.size - 1,
                isIncrementalMovement ? this.size - 1 : 0,
                isIncrementalMovement ? 1 : -1,
                isVerticalMovement ? 'row' : 'column'
            );

        for (let o of outer) {
            for (let i of inner) {
                window.console.log(`outer ${o} inner ${i}`);
            }
        }

        return this;
    }
}

export {Game};
