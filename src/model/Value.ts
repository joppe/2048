import Backbone from 'backbone';
import {ValueLiteralInterface} from './ValueLiteralInterface';
import {Cell} from './Cell';

const INITIAL_VALUE_DEVIATION:number = 0.8,
    MAX_INITIAL_VALUE:number = 4,
    MIN_INITIAL_VALUE:number = 2;

/**
 * @class Value
 */
class Value extends Backbone.Model {
    /**
     * @returns {number}
     */
    get value():number {
        return this.get('value');
    }

    /**
     * @returns {Cell}
     */
    get cell():Cell {
        return this.get('cell');
    }

    /**
     * Set the attribute "value" randomly.
     *
     * @param {object} attributes
     */
    constructor(attributes:ValueLiteralInterface) {
        super(attributes);

        if (undefined === attributes.value) {
            this.set('value', Value.generateValue());
        }
    }

    /**
     * Create a random value.
     *
     * @returns {number}
     */
    static generateValue():number {
        return Math.random() > INITIAL_VALUE_DEVIATION ? MAX_INITIAL_VALUE : MIN_INITIAL_VALUE;
    }
}

export {Value};
