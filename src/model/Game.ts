import Backbone from 'backbone';
import {Grid} from './Grid';
import {GameLiteralInterface} from './GameLiteralInterface';
import {Values} from './../collection/Values';

/**
 * @class Game
 *
 * Use "vals" instead of "values", "values" is taken by Backbone.Model
 */
class Game extends Backbone.Model {
    /**
     * @returns {number}
     */
    get score():number {
        return this.get('score');
    }

    /**
     * @returns {number}
     */
    get size():number {
        return this.get('size');
    }

    /**
     * @returns {number}
     */
    get vals():Values {
        return this.get('vals');
    }

    /**
     * @returns {object}
     */
    defaults():Backbone.ObjectHash {
        return {
            score: 0,
            size: 4,
            vals: new Values()
        };
    }

    /**
     * @param {object} [attributes]
     */
    constructor(attributes?:GameLiteralInterface) {
        super(attributes);

        this.set('grid', new Grid({
            size: this.size
        }));
    }
}

export {Game};
