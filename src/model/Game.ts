import Backbone from 'backbone';
import {Grid} from './Grid';
import {GameLiteralInterface} from './GameLiteralInterface';
import {Values} from './../collection/Values';
import {GameAttributesInterface} from './GameAttributesInterface';

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
    constructor(attributes?:GameAttributesInterface) {
        super(attributes);

        this.set('grid', new Grid({
            size: this.size
        }));
    }

    /**
     * @param {object} raw
     * @returns {object}
     */
    parse(raw:GameLiteralInterface):any {
        let attributes:any = {};

        if (undefined !== raw.size) {
            attributes.size = raw.size;
        }

        if (undefined !== raw.vals) {
            attributes.vals = new Values();
            attributes.vals.set(attributes.vals.parse(raw.vals));
        }

        return attributes;
    }

    /**
     * @param {object} raw
     * @returns {Game}
     */
    static create(raw:GameLiteralInterface):Game {
        let game = new Game();

        game.set(game.parse(raw));

        return game;
    }
}

export {Game};
