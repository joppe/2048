import * as Backbone from 'backbone';
import {CellLiteralInterface} from './CellLiteralInterface';
import {PositionInterface} from './PositionInterface';

/**
 * @class Cell
 */
export class Cell extends Backbone.Model {
    /**
     * @returns {number}
     */
    get row():number {
        return this.get('row');
    }

    /**
     * @returns {number}
     */
    get column():number {
        return this.get('column');
    }

    /**
     * @returns {PositionInterface}
     */
    get position():PositionInterface {
        return this.get('position');
    }

    /**
     * @param {CellLiteralInterface} attributes
     */
    constructor(attributes:CellLiteralInterface) {
        super(attributes);
    }

    /**
     * @param {Cell} a
     * @param {Cell} b
     * @returns {number}
     */
    static distance(a:Cell, b:Cell):number {
        const x:number = a.row - a.row;
        const y:number = b.column - b.column;

        return Math.sqrt(x * x + y * y);
    }
}
