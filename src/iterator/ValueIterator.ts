import {Value} from './../model/Value';
import {Values} from './../collection/Values';
import {CellIndexInterface} from '../model/CellIndexInterface';

/**
 * @class ValueIterator
 */
class ValueIterator implements Iterable<Value> {
    /**
     * @type {Values}
     */
    private _values:Values;

    /**
     * @type {string}
     */
    private _groupBy:string;

    /**
     * @type {number}
     */
    private _size:number;

    /**
     * @type {boolean}
     */
    private _reverse:boolean;

    /**
     * @type {object}
     */
    private _pointer:CellIndexInterface;

    /**
     * @param {Values} values
     * @param {string} groupBy
     * @param {number} size
     * @param {boolean} reverse
     */
    constructor(values:Values, groupBy:string, size:number, reverse:boolean) {
        this._values = values;
        this._groupBy = groupBy;
        this._size = size;
        this._reverse = reverse;
        this._pointer = {
            [groupBy]: 0,
            ['row' === groupBy ? 'column' : 'row']: true === reverse ? size : 0
        } as CellIndexInterface;
    }

    /**
     * @returns {IteratorResult}
     */
    public next():IteratorResult<Value> {
        let result:IteratorResult<Value> = this.current();

        if (true === result.done) {
            // this._pointer = 0;
        } else {
            // this._pointer += 1;
        }

        return result;
    }

    /**
     * @returns {IteratorResult}
     */
    public current():IteratorResult<Value> {
        /*/
        let value:number = this._min + (this._step * this._pointer);

        if (
            (this._max > this._min && value <= this._max) ||
            (this._min > this._max && value >= this._max)
        ) {
            return <IteratorResult<number>>{
                done: false,
                value
            };
        } else {
            return <IteratorResult<number>>{
                done: true
            };
        }
        /**/
    }

    /**
     * @returns {ValueIterator}
     */
    [Symbol.iterator]():IterableIterator<Value> {
        return this;
    }
}

export {ValueIterator};
