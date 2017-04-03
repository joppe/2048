import {CellIndexInterface} from './CellIndexInterface';

/**
 * @interface ValueLiteralInterface
 */
export interface ValueLiteralInterface {
    /**
     * @type {object}
     */
    index:CellIndexInterface;

    /**
     * @type {number}
     */
    value?:number;
}
