import * as Backbone from 'backbone';
import {Cell} from './Cell';
import {ValueAttributesInterface} from './ValueAttributesInterface';

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
     * @param {Value} value
     */
    set merge(value:Value) {
        this.set('merge', value);
    }

    /**
     * @param {Cell} cell
     */
    set cell(cell:Cell) {
        this.set('cell', cell);
    }

    /**
     * Set the attribute "value" randomly.
     *
     * @param {object} attributes
     */
    constructor(attributes:ValueAttributesInterface) {
        super(attributes);

        if (undefined === attributes.value) {
            this.set('value', Value.generateValue());
        }
    }

    /**
     * @param {Value} value
     * @returns {boolean}
     */
    isMergeable(value:Value):boolean {
        return undefined !== value && value.value === this.value;
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
