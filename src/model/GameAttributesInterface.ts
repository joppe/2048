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
     * The values to start with
     *
     * @type {Values}
     */
    vals?:Values;
}

export {GameAttributesInterface};
