import Backbone from 'backbone';
import {Grid} from './Grid';
import {GameAttributesInterface} from './GameAttributesInterface';

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
     */
    constructor(attributes?:GameAttributesInterface) {
        super(attributes);

        this.set('grid', new Grid({
            size: this.get('size')
        }));
    }
}

export {Game};
