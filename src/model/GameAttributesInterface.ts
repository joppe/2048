import {Values} from './../collection/Values';

/**
 * @interface GameAttributesInterface
 */
interface GameAttributesInterface {
    /**
     * The number of row and columns to use.
     *
     * @type {number}
     */
    size?:number;

    /**
     * The values to start with
     *
     * @type {Values}
     */
    vals?:Values;
}

export {GameAttributesInterface};
