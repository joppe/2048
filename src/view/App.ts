import Backbone from 'backbone';
import {Game} from './../model/Game';
import {Table} from './Table';

/**
 * @class App
 */
class App extends Backbone.View<Game> {
    /**
     * @type {Table}
     */
    private table:Table;

    /**
     * @returns {string}
     */
    get className():string {
        return 'c-game';
    }

    /**
     * @returns {App}
     */
    render():App {
        this.table = new Table({
            model: this.model
        });

        this.$el.append(this.table.render().el);

        return this;
    }

    /**
     * @returns {App}
     */
    start():App {
        this.table.storeElementPositions();

        return this;
    }
}

export {App};
