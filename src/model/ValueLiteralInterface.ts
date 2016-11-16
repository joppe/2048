import {Cell} from './Cell';

/**
 * @interface ValueLiteralInterface
 */
interface ValueLiteralInterface {
    /**
     * @type {Cell}
     */
    cell:Cell;

    /**
     * @type {number}
     */
    value?:number;
}

export {ValueLiteralInterface};
