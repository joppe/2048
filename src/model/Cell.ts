import * as Backbone from 'backbone';
import {CellLiteralInterface} from './CellLiteralInterface';
import {PositionInterface} from './PositionInterface';

/**
 * @class Cell
 */
class Cell extends Backbone.Model {
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
     * @returns {{left:number, top:number}}
     */
    get position():PositionInterface {
        return this.get('position');
    }

    /**
     * @param {object} attributes
     */
    constructor(attributes:CellLiteralInterface) {
        super(attributes);
    }
}

export {Cell};
