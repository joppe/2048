import * as Backbone from 'backbone';
import {Value} from './../model/Value';
import {ValueLiteralInterface} from './../model/ValueLiteralInterface';

/**
 * @class Values
 */
class Values extends Backbone.Collection<Value> {
    /**
     * @type {Value}
     */
    get model():{new(attributes:ValueLiteralInterface):Value} {
        return Value;
    }
}

export {Values};
