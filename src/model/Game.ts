import Backbone from 'backbone';
import {Grid} from './Grid';

/**
 * @class Game
 */
class Game extends Backbone.Model {
    /**
     * @returns {object}
     */
    defaults():Backbone.ObjectHash {
        return {
            score: 0,
            size: 4
        };
    }

    /**
     * @param {object} [attributes]
     * @param {object} [options]
     */
    initialize(attributes?:any, options?:any):void {
        this.set('grid', new Grid({
            size: this.get('size')
        }));
    }
}

export {Game};
