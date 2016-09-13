import * as Backbone from 'backbone';
import {AttributesInterface} from './../interface/AttributesInterface';

/**
 * @class Value
 */
export class Value extends Backbone.Model {
    /**
     * Attributes that must not be set directly
     *
     * @type {object}
     */
    private stagedAttributes:AttributesInterface = {};

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
        if (undefined !== this.stagedAttributes['value']) {
            return false;
        }

        if (this.get('value') === value.get('value')) {
            return true;
        }

        return false;
    }

    /**
     * @param {object} attributes
     * @returns {Value}
     */
    stage(attributes:AttributesInterface):Value {
        for (let name of Object.keys(attributes)) {
            this.stagedAttributes[name] = attributes[name];
        }

        return this;
    }

    /**
     * Apply the staged attributes.
     *
     * @param {string} [attribute]
     * @returns {Value}
     */
    commit(attribute?:string):Value {
        if (undefined === attribute) {
            // Apply the staged attributes
            this.set(this.stagedAttributes);

            // Reset the staged attributes
            this.stagedAttributes = {};
        } else if (undefined !== this.stagedAttributes[attribute]) {
            this.set(attribute, this.stagedAttributes[attribute]);

            delete this.stagedAttributes[attribute];
        }

        return this;
    }

    /**
     * @param {string} attribute
     * @returns {any}
     */
    getStaged(attribute:string):any {
        return this.stagedAttributes[attribute];
    }
}
