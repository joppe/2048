import {Position} from './../model/Position';
import {Game} from '../model/Game';
import {DirectionInterface} from '../interface/DirectionInterface';
import {PositionInterface} from '../interface/PositionInterface';

/**
 * @interface CellOptionsInterface
 */
interface CellOptionsInterface extends Backbone.ViewOptions<Position> {
    /**
     * @type {Game}
     */
    game:Game;
}

/**
 * @class Cell
 */
export class Cell extends Backbone.View<Position> {
    /**
     * @type {Game}
     */
    private game:Game;

    /**
     * @returns {string}
     */
    get tagName():string {
        return 'td';
    }

    /**
     * @returns {string}
     */
    get className():string {
        return 'c-grid__cell';
    }

    /**
     * @param {object} options
     */
    constructor(options:CellOptionsInterface) {
        super(options);

        this.game = options.game;

        this.listenTo(this.game, 'change:is-rendered', this.storePosition.bind(this));
    }

    /**
     * Store the position of the element in the model
     */
    private storePosition():void {
        if (true === this.game.get('is-rendered')) {
            this.model.set('position', this.getPosition());
        }
    }

    /**
     * @returns {object}
     */
    private getPosition():PositionInterface {
        let offset = this.$el.offset();

        return {
            x: offset.left,
            y: offset.top
        };
    }
}
