/// <reference path="../../../../typings/globals/backbone-global/index.d.ts" />
/// <reference path="../../../../typings/globals/jquery/index.d.ts" />

import {Position} from './../model/Position';

/**
 * @class Cell
 */
export class Cell extends Backbone.View<Position> {
    /**
     * @returns {string}
     */
    get tagName():string {
        return 'td';
    }

    /**
     * @returns {string}
     */
    get className():string {
        return 'c-grid__cell';
    }

    /**
     * Save the element position
     */
    initialize() {
        this.model.set('$el', this.$el);
    }
}
