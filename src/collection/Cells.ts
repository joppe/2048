import Backbone from 'backbone';
import {Cell} from './../model/Cell';
import {CellLiteralInterface} from './../model/CellLiteralInterface';

/**
 * @class Cells
 */
class Cells extends Backbone.Collection<Cell> {
    /**
     * @type {Cell}
     */
    get model():{new(attributes:CellLiteralInterface):Cell} {
        return Cell;
    }
}

export {Cells};
