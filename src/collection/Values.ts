import * as Backbone from 'backbone';
import {Value} from './../model/Value';
import {ValueAttributesInterface} from './../model/ValueAttributesInterface';
import {CellIndexInterface} from './../model/CellIndexInterface';
import {RangeIterator} from './../iterator/RangeIterator';
import {Cell} from './../model/Cell';

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
     * @returns {Cell[]}
     */
    getCells():Cell[] {
        return this.map((value:Value) => {
            return value.cell;
        });
    }

    /**
     * @param {object} index
     * @returns {Value}
     */
    getByCellIndex(index:CellIndexInterface):Value {
        return this.find((value:Value) => {
            return value.cell.column === index.column && value.cell.row === index.row;
        });
    }

    /**
     * @param {object} index
     * @param {string} axis
     * @param {number} increment
     * @param {number} size
     * @returns {Value}
     */
    findNextOnAxis(index:CellIndexInterface, axis:string, increment:number, size:number) {
        let range:RangeIterator = new RangeIterator(
                increment > 0 ? index[axis] : size,
                increment > 0 ? size : index[axis],
                increment
            ),
            newIndex = {
                ['row' === axis ? 'column' : 'row']: index['row' === axis ? 'column' : 'row']
            };

        for (let i in range) {
            let value:Value;

            newIndex[axis] = i;

            value = this.getByCellIndex(newIndex as CellIndexInterface);

            if (undefined !== value) {
                return value;
            }
        }
    }
}

export {Values};
