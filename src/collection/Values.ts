import * as Backbone from 'backbone';
import {Value} from './../model/Value';
import {ValueAttributesInterface} from './../model/ValueAttributesInterface';
import {CellIndexInterface} from './../model/CellIndexInterface';

/**
 * @class Values
 */
class Values extends Backbone.Collection<Value> {
    /**
     * @type {Value}
     */
    get model():{new(attributes:ValueAttributesInterface):Value} {
        return Value;
    }

    /**
     * @param {object} index
     * @returns {Value}
     */
    findByCellIndex(index:CellIndexInterface):Value {
        return this.find((value:Value) => {
            return value.cell.column === index.column && value.cell.row === index.row;
        });
    }
}

export {Values};
