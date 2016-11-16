import * as Backbone from 'backbone';
import {Value} from './../model/Value';
import {ValueAttributesInterface} from './../model/ValueAttributesInterface';

/**
 * @class Values
 */
class Values extends Backbone.Collection<Value> {
    /**
     * @type {Value}
     */
    get model():{new(attributes:ValueAttributesInterface):Value} {
        return Value;
    }
}

export {Values};
