import {Value} from './../model/Value';

/**
 * @interface ValueDictionaryInterface
 */
export interface ValueDictionaryInterface {
    /**
     * The value
     *
     * @type {Value}
     */
    [id:string]:Value;
}