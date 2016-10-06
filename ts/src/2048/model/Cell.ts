import * as Backbone from 'backbone';
import {PositionInterface} from './../interface/PositionInterface';

/**
 * @class Cell
 */
export class Cell extends Backbone.Model {
    /**
     * Get the position of the element that represents this model.
     *
     * @returns {object}
     */
    get position():PositionInterface {
        let position:PositionInterface = this.get('position');

        if (undefined === position) {
            throw new Error('Position attribute is not set.');
        }

        return position;
    }

    /**
     * @param {Cell} a
     * @param {Cell} b
     * @returns {number}
     */
    static distance(a:Cell, b:Cell):number {
        return Math.sqrt(
            Math.pow(a.get('row') - b.get('row'), 2) +
            Math.pow(a.get('column') - b.get('column'), 2)
        );
    }
}
