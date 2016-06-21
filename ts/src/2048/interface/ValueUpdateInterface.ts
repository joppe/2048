import {Position} from './../model/Position';
import {Value} from './../model/Value';

/**
 * @interface ValueUpdateInterface
 */
export interface ValueUpdateInterface {
    /**
     * The new position
     */
    position:Position;

    /**
     * If the value is set update the own value
     */
    value?:Value;

    /**
     * Dissolve the value, it is merged with an other value
     */
    dissolve?:boolean;
}
