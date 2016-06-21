/// <reference path="../../../../typings/globals/backbone-global/index.d.ts" />

import * as Backbone from 'backbone';
import {Position} from './Position';
import {ValueUpdateInterface} from './../interface/ValueUpdateInterface';

/**
 * @class Value
 */
export class Value extends Backbone.Model {
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
    mergable(value:Value):boolean {
        if (true === this.get('isUpdated')) {
            return false;
        }

        if (this.get('value') === value.get('value')) {
            return true;
        }

        return false;
    }

    /**
     * @param {object} options
     * @returns {Value}
     */
    update(options:ValueUpdateInterface):Value {
        this.set('position', options.position);

        return this;
    }
}
