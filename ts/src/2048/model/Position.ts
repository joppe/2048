/// <reference path="../../../../typings/globals/backbone-global/index.d.ts" />

import * as Backbone from 'backbone';
import {PositionInterface} from './../interface/PositionInterface';

/**
 * @class Position
 */
export class Position extends Backbone.Model {
    /**
     * @type {object}
     */
    private position:PositionInterface;

    /**
     * @returns {object}
     */
    getPosition():PositionInterface {
        if (undefined === this.position) {
            let leftTop = this.get('$el').position();

            this.position = <PositionInterface>{
                x: leftTop.left,
                y: leftTop.top
            };
        }

        return this.position;
    }
}
