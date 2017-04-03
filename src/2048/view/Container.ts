import * as Backbone from 'backbone';
import {prefixedEventListener} from './../event/prefixedEventListener';
import {Game} from './../model/Game';
import {Value} from './../model/Value';

/**
 * @interface ContainerOptionsInterace
 */
interface ContainerOptionsInterace extends Backbone.ViewOptions<Value> {
    game:Game;
}

/**
 * @class Container
 */
export class Container extends Backbone.View<Value> {
    /**
     * @type {Game}
     * @private
     */
    private _game:Game;

    /**
     * @returns {string}
     */
    get className():string {
        return 'c-value';
    }

    /**
     * @param {ContainerOptionsInterace} options
     */
    constructor(options:ContainerOptionsInterace) {
        super(options);

        this._game = options.game;
    }

    /**
     * @returns {Container}
     */
    render():Container {
        this.update();
        window.console.log('Container', this.model);
        this.appear();

        return this;
    }

    /**
     * Update the text and position
     */
    update():void {
        this.$el.text(this.model.value);
        this.$el.css(this.model.cell.position);
    }

    /**
     * Show the appear animation
     */
    appear():void {
        const speed:string = 'a-speed--1';
        const css:string = 'appear';

        prefixedEventListener(this.$el, 'animationend', ():void => {
            this.$el.addClass('ready');
            this.$el.removeClass(`${css}  ${speed}`);

            // resolve();
        }, true);

        this.$el.addClass(`${css}  ${speed}`);
    }

    move():void {
        // move animation
    }

    merge():void {
        // merge animation
    }
}
