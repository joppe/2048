import * as Backbone from 'backbone';
import {Value} from './../model/Value';

/**
 * @class Values
 */
class Values extends Backbone.Collection<Value> {
    /**
     * @type {Value}
     */
    get model():{new():Value} {
        return Value;
    }
}

export {Values};
