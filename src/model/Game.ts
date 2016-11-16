import Backbone from 'backbone';
import {Grid} from './Grid';
import {GameLiteralInterface} from './GameLiteralInterface';
import {Values} from './../collection/Values';
import {GameAttributesInterface} from './GameAttributesInterface';
import {ValueLiteralInterface} from './ValueLiteralInterface';
import {Value} from './Value';
import {ValueAttributesInterface} from './ValueAttributesInterface';

const DEFAULT_SIZE:number = 4;

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
    get vals():Values {
        return this.get('vals');
    }

    /**
     * @returns {object}
     */
    defaults():Backbone.ObjectHash {
        return {
            score: 0,
            vals: new Values()
        };
    }

    /**
     * @param {object} [attributes]
     */
    constructor(attributes?:GameAttributesInterface) {
        super(attributes);
    }

    /**
     * @param {object} gameLiteral
     * @returns {object}
     */
    parse(gameLiteral:GameLiteralInterface):any {
        let gameAttributes:any = {},
            size:number = DEFAULT_SIZE;

        if (undefined !== gameLiteral.size) {
            size = gameLiteral.size;
        }

        gameAttributes.grid = new Grid({
            size
        });

        if (undefined !== gameLiteral.vals) {
            gameAttributes.vals = new Values();

            gameLiteral.vals.forEach((valueLiteral:ValueLiteralInterface) => {
                let valueAttributes:ValueAttributesInterface = {
                    cell: gameAttributes.grid.getCell(valueLiteral.index)
                };

                if (undefined !== valueLiteral.value) {
                    valueAttributes.value = valueLiteral.value;
                }

                gameAttributes.vals.add(new Value(valueAttributes));
            });
        }

        window.console.log(gameAttributes);

        return gameAttributes;
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
