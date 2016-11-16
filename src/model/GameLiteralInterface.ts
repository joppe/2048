import {ValueLiteralInterface} from './ValueLiteralInterface';

/**
 * @interface GameLiteralInterface
 */
interface GameLiteralInterface {
    /**
     * The number of row and columns to use.
     *
     * @type {number}
     */
    size?:number;

    /**
     * The values to start with
     *
     * @type {object[]}
     */
    vals?:ValueLiteralInterface[];
}

export {GameLiteralInterface};
