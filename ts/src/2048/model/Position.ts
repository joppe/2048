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
        let position:PositionInterface = this.get('position');

        if (undefined === position) {
            throw new Error('Position attribute is not set.');
        }

        return position;
    }

    /**
     * @param {Position} a
     * @param {Position} b
     * @returns {number}
     */
    static distance(a:Position, b:Position):number {
        return Math.abs((a.get('row') - b.get('row')) + (a.get('column') - b.get('column')));
    }
}
