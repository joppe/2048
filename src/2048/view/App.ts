import * as Backbone from 'backbone';
import * as jQuery from 'jquery';
import {Game} from './../model/Game';
import {Value} from './../model/Value';
import {ValueLiteralInterface} from './../model/ValueLiteralInterface';
import {Container} from './Container';
import {Keyboard} from './Keyboard';
import {Table} from './Table';

/**
 * @class App
 */
export class App extends Backbone.View<Game> {
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
     * Listen to changes.
     */
    initialize():void {
        this.listenTo(this.model.vals, 'add', this.addValue.bind(this));
        this.listenTo(this.model, 'change:move', this.handleMove.bind(this));
    }

    /**
     * Try to move the values.
     */
    handleMove():void {
        if (this.model.locked) {
            return;
        }

        if (this.model.isAnimating()) {
            return;
        }

        this.model.moveValues(this.model.move);
        window.console.log('move', this.model.move);
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
     * @param {Value} value
     */
    addValue(value:Value):void {
        const container:Container = new Container({
            game: this.model,
            model: value
        });

        this.$el.append(container.render().el);
    }

    /**
     * @params {object[]} [values=[]]
     * @returns {App}
     */
    start(values:ValueLiteralInterface[] = []):App {
        const keyboard:Keyboard = new Keyboard({
            el: jQuery('body'),
            model: this.model
        });

        this.table.storeElementPositions();

        this.model.addValues(values);

        return this;
    }
}
