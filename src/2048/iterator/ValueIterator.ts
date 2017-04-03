import {Values} from './../collection/Values';
import {Value} from './../model/Value';

/**
 * @class ValueIterator
 */
export class ValueIterator implements Iterable<Value> {
    /**
     * @type {object}
     */
    private _grid:Value[][] = [];

    /**
     * @type {number}
     */
    private _inner:number = 0;

    /**
     * @type {number}
     */
    private _outer:number = 0;

    /**
     * @param {Values} values
     * @param {string} groupBy
     * @param {boolean} reverse
     */
    constructor(values:Values, groupBy:string, reverse:boolean) {
        const orderProperty:string = groupBy === 'row' ? 'column' : 'row';
        const cache:{[id:string]:Value[]} = {};

        values.each((value:Value) => {
            const index:string = String(value.cell.get(groupBy));

            if (undefined === cache[index]) {
                cache[index] = [] as Value[];
            }

            cache[index].push(value);
        });

        for (const index of Object.keys(cache)) {
            this._grid.push(cache[index].sort((a:Value, b:Value) => {
                if (reverse) {
                    return b.cell.get(orderProperty) - a.cell.get(orderProperty);
                } else {
                    return a.cell.get(orderProperty) - b.cell.get(orderProperty);
                }
            }));
        }
    }

    /**
     * @returns {IteratorResult}
     */
    public next():IteratorResult<Value> {
        const result:IteratorResult<Value> = this.current();

        if (true === result.done) {
            // Auto rewind
            this._outer = 0;
            this._inner = 0;
        } else if (this._grid[this._outer].length > this._inner + 1) {
            this._inner += 1;
        } else {
            this._outer += 1;
            this._inner = 0;
        }

        return result;
    }

    /**
     * @returns {IteratorResult}
     */
    public current():IteratorResult<Value> {
        if (
            this._grid.length > this._outer &&
            this._grid[this._outer].length > this._inner
        ) {
            return {
                done: false,
                value: this._grid[this._outer][this._inner]
            } as IteratorResult<Value>;
        } else {
            return {
                done: true
            } as IteratorResult<Value>;
        }
    }

    /**
     * @returns {ValueIterator}
     */
    [Symbol.iterator]():IterableIterator<Value> {
        return this;
    }
}
