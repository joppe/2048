import {CellIndexInterface} from '../model/CellIndexInterface';
import {RangeIterator} from './RangeIterator';

/**
 * @class CellIndexIterator
 */
export class CellIndexIterator implements Iterable<CellIndexInterface> {
    /**
     * @type {RangeIterator}
     */
    private _innerIterator:RangeIterator;

    /**
     * @type {RangeIterator}
     */
    private _outerIterator:RangeIterator;

    /**
     * @type {string}
     */
    private _innerProperty:string;

    /**
     * @type {string}
     */
    private _outerProperty:string;

    /**
     * @param {number} size
     * @param {boolean} isVerticalMovement
     * @param {boolean} isIncrementalMovement
     */
    constructor(size:number, isVerticalMovement:boolean, isIncrementalMovement:boolean) {
        this._outerProperty = isVerticalMovement ? 'column' : 'row';
        this._outerIterator = new RangeIterator(
            0,
            size - 1,
            1
        );

        this._innerProperty = isVerticalMovement ? 'row' : 'column';
        this._innerIterator = new RangeIterator(
            isIncrementalMovement ? 0 : size - 1,
            isIncrementalMovement ? size - 1 : 0,
            isIncrementalMovement ? 1 : -1
        );
    }

    /**
     * @returns {IteratorResult}
     */
    public next():IteratorResult<CellIndexInterface> {
        let outer:IteratorResult<number> = this._outerIterator.current();
        let inner:IteratorResult<number> = this._innerIterator.next();
        const value:CellIndexInterface = {
                column: 0,
                row: 0
            };

        // If the inner is done, go to the next outer
        if (true === inner.done) {
            this._outerIterator.next();
            outer = this._outerIterator.current();
            inner = this._innerIterator.next();
        }

        value[this._outerProperty] = outer.value;
        value[this._innerProperty] = inner.value;

        if (true === outer.done) {
            return {
                done: true
            } as IteratorResult<CellIndexInterface>;
        } else {
            return {
                value,
                done: false
            } as IteratorResult<CellIndexInterface>;
        }
    }

    /**
     * @returns {Range}
     */
    [Symbol.iterator]():IterableIterator<CellIndexInterface> {
        return this;
    }
}
