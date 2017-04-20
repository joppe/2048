import * as Backbone from 'backbone';
import {Game} from './../model/Game';

/**
 * @interface ScoreOptionsInterface
 */
interface ScoreOptionsInterface {
    model:Game;
}

/**
 * @class Score
 */
export class Score extends Backbone.View<Game> {
    /**
     * @returns {string}
     */
    get className():string {
        return 'c-score';
    }

    /**
     * @param {ScoreOptionsInterface} options
     */
    constructor(options:ScoreOptionsInterface) {
        super(options);

        this.listenTo(this.model, 'change:score', this.update.bind(this));
    }

    /**
     * @returns {Score}
     */
    render():Score {
        this.update();

        return this;
    }

    /**
     * Update the score.
     */
    update():void {
        this.$el.text(this.model.score);
    }
}
