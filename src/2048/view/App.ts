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

        // trigger the appear animation, if the model is not locked
        window.console.log('on addvalue');
        window.console.log(this.model);
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

        // lock the game
        window.console.log('LOCK');
        this.model.addValues(values);
        window.console.log('UNLOCK');
        // trigger the appear animation

        return this;
    }
}
