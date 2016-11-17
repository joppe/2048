import * as Backbone from 'backbone';
import {Game} from './../model/Game';
import {DirectionInterface} from './../model/DirectionInterface';

const KEY_RIGHT:number = 39,
    KEY_TOP:number = 38,
    KEY_LEFT:number = 37,
    KEY_BOTTOM:number = 40,
    KEYS:number[] = [KEY_RIGHT, KEY_LEFT, KEY_BOTTOM, KEY_TOP];

/**
 * @class Keyboard
 */
class Keyboard extends Backbone.View<Game> {
    /**
     * @returns {object}
     */
    events():Backbone.EventsHash {
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

export {Keyboard};