/**
 * @class DirectionIterator
 */
class DirectionIterator implements Iterable<number> {
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
     * @type {string}
     */
    private _property:string;

    /**
     * @returns {string}
     */
    get property():string {
        return this._property;
    }

    /**
     * @param {number} min
     * @param {number} max
     * @param {number} step
     * @param {string} property
     */
    constructor(min:number, max:number, step:number, property:string) {
        if (
            (min < max && step <= 0) ||
            (min > max && step >= 0)
        ) {
            throw new Error(`Argument error, min: ${min} max: ${max} step: ${step}`);
        }

        this._min = min;
        this._max = max;
        this._step = step;
        this._property = property;
        this._pointer = 0;
    }

    /**
     * @returns {IteratorResult}
     */
    public next():IteratorResult<number> {
        let value:number = this._min + (this._step * this._pointer);

        if (
            (this._max > this._min && value <= this._max) ||
            (this._min > this._max && value >= this._max)
        ) {
            this._pointer += 1;

            return <IteratorResult<number>>{
                done: false,
                value
            };
        } else {
            this._pointer = 0;

            return <IteratorResult<number>>{
                done: true
            };
        }
    }

    /**
     * @returns {Range}
     */
    [Symbol.iterator]():IterableIterator<number> {
        return this;
    }
}

export {DirectionIterator};
