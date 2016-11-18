/**
 * @class RangeIterator
 */
class RangeIterator implements Iterable<number> {
    /**
     * @type {number}
     */
    private _min:number;

    /**
     * @type {number}
     */
    private _max:number;

    /**
     * @type {number}
     */
    private _step:number;

    /**
     * @type {number}
     */
    private _pointer:number;

    /**
     * @param {number} min
     * @param {number} max
     * @param {number} step
     */
    constructor(min:number, max:number, step:number) {
        if (
            (min < max && step <= 0) ||
            (min > max && step >= 0)
        ) {
            throw new Error(`RangeIterator.constructor: error, min: ${min} max: ${max} step: ${step}`);
        }

        this._min = min;
        this._max = max;
        this._step = step;
        this._pointer = 0;
    }

    /**
     * @returns {IteratorResult}
     */
    public next():IteratorResult<number> {
        let result:IteratorResult<number> = this.current();

        if (true === result.done) {
            this._pointer = 0;
        } else {
            this._pointer += 1;
        }

        return result;
    }

    /**
     * @returns {IteratorResult}
     */
    public current():IteratorResult<number> {
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
    }

    /**
     * @returns {IteratorResult}
     *
    public return():IteratorResult<number> {
        this._pointer = 0;

        return {
            done: true
        };
    }
    /**/

    /**
     * @returns {Range}
     */
    [Symbol.iterator]():IterableIterator<number> {
        return this;
    }
}

export {RangeIterator};
