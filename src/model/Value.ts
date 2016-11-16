import Backbone from 'backbone';
import {ValueAttributesInterface} from './ValueAttributesInterface';

const INITIAL_VALUE_DEVIATION:number = 0.8,
    MAX_INITIAL_VALUE:number = 4,
    MIN_INITIAL_VALUE:number = 2;

/**
 * @class Value
 */
class Value extends Backbone.Model {
    /**
     * Set the attribute "value" randomly.
     */
    constructor(attributes:ValueAttributesInterface) {
        super(attributes);

        this.set('value', Math.random() > INITIAL_VALUE_DEVIATION ? MAX_INITIAL_VALUE : MIN_INITIAL_VALUE);
    }
}

export {Value};
