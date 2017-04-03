import * as Backbone from 'backbone';
import {RangeIterator} from './../iterator/RangeIterator';
import {Cell} from './../model/Cell';
import {CellIndexInterface} from './../model/CellIndexInterface';
import {Value} from './../model/Value';
import {ValueAttributesInterface} from './../model/ValueAttributesInterface';

/**
 * @class Values
 */
export class Values extends Backbone.Collection<Value> {
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
     * @param {CellIndexInterface} index
     * @returns {Value}
     */
    getByCellIndex(index:CellIndexInterface):Value {
        return this.find((value:Value) => {
            return value.cell.column === index.column && value.cell.row === index.row;
        });
    }

    /**
     * @param {CellIndexInterface} index
     * @param {string} axis
     * @param {number} increment
     * @param {number} size
     * @returns {Value}
     */
    findNextOnAxis(index:CellIndexInterface, axis:string, increment:number, size:number):Value {
        const range:RangeIterator = new RangeIterator(
                increment > 0 ? index[axis] : size,
                increment > 0 ? size : index[axis],
                increment
            );
        const newIndex:CellIndexInterface = {...index};

        for (const i of range) {
            let value:Value;

            newIndex[axis] = Number(i);

            value = this.getByCellIndex(newIndex as CellIndexInterface);

            if (undefined !== value) {
                return value;
            }
        }
    }
}
