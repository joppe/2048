import Backbone from 'backbone';
import {CellLiteralInterface} from './CellLiteralInterface';

/**
 * @class Cell
 */
class Cell extends Backbone.Model {
    /**
     * @param {object} attributes
     */
    constructor(attributes:CellLiteralInterface) {
        super(attributes);
    }
}

export {Cell};
