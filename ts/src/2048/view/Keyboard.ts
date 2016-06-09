/// <reference path="../../../../typings/globals/backbone-global/index.d.ts" />
/// <reference path="../model/Game.ts" />
/// <reference path="../model/DirectionInterface.ts" />
/// <reference path="BackboneEventsInterface.ts" />

import Backbone from 'backbone';
import {Game} from "../model/Game";

const KEY_RIGHT:number = 39,
    KEY_TOP:number = 38,
    KEY_LEFT:number = 37,
    KEY_BOTTOM:number = 40,
    KEYS:number[] = [KEY_RIGHT, KEY_LEFT, KEY_BOTTOM, KEY_TOP];

/**
 * @class Keyboard
 */
export class Keyboard extends Backbone.View<Game> {
    /**
     * The game model
     *
     * @type {Backbone.Model}
     */
    model:Game;

    /**
     * @returns {BackboneEventsInterface}
     */
    events():BackboneEventsInterface {
        return {
            'keyup': 'handleKeyPress'
        };
    }

    /**
     * Handle key press
     *
     * @param {JQueryKeyEventObject} event
     */
    handleKeyPress(event:JQueryKeyEventObject):void {
        let pressedKey = event.which,
            direction:DirectionInterface = {
                left: 0,
                top: 0
            };

        if (KEYS.indexOf(pressedKey) !== -1) {
            switch (pressedKey) {
                case KEY_RIGHT:
                    direction.left = 1;
                    break;
                case KEY_LEFT:
                    direction.left = -1;
                    break;
                case KEY_TOP:
                    direction.top = -1;
                    break;
                case KEY_BOTTOM:
                    direction.top = 1;
                    break;
            }

            this.model.move(direction);
        }
    }
}
