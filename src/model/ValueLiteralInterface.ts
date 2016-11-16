import {CellIndexInterface} from './CellIndexInterface';

/**
 * @interface ValueLiteralInterface
 */
interface ValueLiteralInterface {
    /**
     * @type {object}
     */
    index:CellIndexInterface;

    /**
     * @type {number}
     */
    value?:number;
}

export {ValueLiteralInterface};
