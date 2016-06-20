import {Value} from "./Value";
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