import * as Backbone from 'backbone';

import {DirectionInterface} from './../model/DirectionInterface';
import {Game} from './../model/Game';

const KEY_RIGHT:number = 39;
const KEY_TOP:number = 38;
const KEY_LEFT:number = 37;
const KEY_BOTTOM:number = 40;
const KEYS:number[] = [KEY_RIGHT, KEY_LEFT, KEY_BOTTOM, KEY_TOP];

/**
 * @class Keyboard
 */
class Keyboard extends Backbone.View<Game> {
    /**
     * @returns {object}
     */
    events():Backbone.EventsHash {
        return {
            keyup: 'handleKeyPress'
        };
    }

    /**
     * Handle key press
     *
     * @param {JQueryKeyEventObject} event
     */
    handleKeyPress(event:JQueryKeyEventObject):void {
        const pressedKey:number = event.which;
        const direction:DirectionInterface = {
                left: 0,
                top: 0
            };

        if (KEYS.indexOf(pressedKey) !== -1) {
            switch (pressedKey) {
                case KEY_RIGHT:
                    direction.left = -1;
                    break;
                case KEY_LEFT:
                    direction.left = 1;
                    break;
                case KEY_TOP:
                    direction.top = 1;
                    break;
                case KEY_BOTTOM:
                    direction.top = -1;
                    break;
            }

            this.model.cycle(direction);
        }
    }
}

export {Keyboard};
