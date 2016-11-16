import Backbone from 'backbone';
import {CellLiteralInterface} from './CellLiteralInterface';

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
     * @param {object} attributes
     */
    constructor(attributes:CellLiteralInterface) {
        super(attributes);
    }
}

export {Cell};
