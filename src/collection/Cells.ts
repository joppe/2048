import Backbone from 'backbone';
import {Cell} from '../model/Cell';

/**
 * @class Cells
 */
class Cells extends Backbone.Collection<Cell> {
    /**
     * @type {Cell}
     */
    get model():{new():Cell} {
        return Cell;
    }
}

export {Cells};
