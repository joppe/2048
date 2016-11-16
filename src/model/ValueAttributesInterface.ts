import {Cell} from './Cell';

/**
 * @interface ValueAttributesInterface
 */
interface ValueAttributesInterface {
    /**
     * @type {Cell}
     */
    cell:Cell;

    /**
     * @type {number}
     */
    value?:number;
}

export {ValueAttributesInterface};
