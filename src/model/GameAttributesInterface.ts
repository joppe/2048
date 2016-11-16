import {Values} from './../collection/Values';
import {Grid} from './Grid';

/**
 * @interface GameAttributesInterface
 */
interface GameAttributesInterface {
    /**
     * The grid that contains the cells.
     *
     * @type {Grid}
     */
    grid:Grid;

    /**
     * The number of row and columns to use.
     *
     * @type {number}
     */
    size:number;

    /**
     * The values to start with
     *
     * @type {Values}
     */
    vals?:Values;
}

export {GameAttributesInterface};
