import * as Backbone from 'backbone';
import {PositionInterface} from './../interface/PositionInterface';

/**
 * @class Position
 */
export class Position extends Backbone.Model {
    /**
     * Get the position of the element that represents this model.
     *
     * @returns {object}
     */
    get position():PositionInterface {
        return this.get('position');
    }
}
