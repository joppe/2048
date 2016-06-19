import {Value} from "./Value";
/**
 * @interface ValueDictionaryInterface
 */
interface ValueDictionaryInterface {
    /**
     * The value
     *
     * @type {Value}
     */
    [id:string]:Value;
}