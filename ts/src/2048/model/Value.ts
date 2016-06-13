/// <reference path="../../../../typings/globals/backbone-global/index.d.ts" />

import * as Backbone from 'backbone';

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
     * Check if the value of another Value instance is the same as this one
     * 
     * @param {Value} value
     * @returns {boolean}
     */
    isSame(value:Value):boolean {
        return this.get('value') === value.get('value');
    }

    /**
     * Double the value
     * 
     * @returns Value
     */
    double():Value {
        this.set('value', this.get('value') * 2);

        return this;
    }

/*
    move(target) {
        if (target.get('value') && this.get('value').same(target.get('value'))) {
            // merge value
            target.get('value').double();
            this.get('value').destroy();
        } else {
            // move value
            target.set('value', this.get('value'));
        }

        this.set('value', null);
    }
    /**/
}
