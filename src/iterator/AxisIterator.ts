import {RangeIterator} from './RangeIterator';

/**
 * @class AxisIterator
 */
class AxisIterator extends RangeIterator {
    /**
     * @type {String}
     */
    private _axis:string;

    /**
     * @returns {string}
     */
    get axis():string {
        return this._axis;
    }

    /**
     * @param {string} axis
     * @param {number} size
     * @param {number} reverse
     */
    constructor(axis:string, size:number, reverse:boolean) {
        super(reverse ? size : 0, reverse ? 0 : size, reverse ? -1 : 1);

        this._axis = axis;
    }
}

export {AxisIterator};
