import * as Backbone from 'backbone';
import {Position} from './Position';

/**
 * @class Value
 */
export class Value extends Backbone.Model {
    /**
     * @param {Position} position
     */
    set position(position:Position) {
        this.set('position', position);
    }

    /**
     * @param {Value} value
     */
    set merge(value:Value) {
        this.set('merge', value);
    }

    /**
     * Set the attribute value to 4 or 2 randomly
     */
    initialize() {
        this.set('value', Math.random() > 0.8 ? 4 : 2);
    }

    /**
     * @param {Value} value
     * @returns {boolean}
     */
    isMergeable(value:Value):boolean {
        if (undefined !== this.get('merge')) {
            return false;
        } else if (this.get('value') === value.get('value')) {
            return true;
        }

        return false;
    }
}
