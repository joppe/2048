import * as Backbone from 'backbone';
import {prefixedEventListener} from './../event/prefixedEventListener';
import {Cell} from './../model/Cell';
import {Game} from './../model/Game';
import {Value} from './../model/Value';

/**
 * @interface ContainerOptionsInterface
 */
interface ContainerOptionsInterface extends Backbone.ViewOptions<Value> {
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
     * @param {ContainerOptionsInterface} options
     */
    constructor(options:ContainerOptionsInterface) {
        super(options);

        this._game = options.game;
        this.listenTo(this._game, 'change:locked', this.handleLock.bind(this));
    }

    /**
     * Start animating when the game is not locked.
     */
    handleLock():void {
        if (this._game.locked) {
            return;
        }

        if (false === this.model.initialized) {
            this.model.initialized = true;
            this.appear();
        } else if (undefined !== this.model.move) {
            this.move();
        } else if (undefined !== this.model.merge) {
            this.merge();
        }
    }

    /**
     * @returns {Container}
     */
    render():Container {
        this.update();

        return this;
    }

    /**
     * Update the text and position.
     */
    update():void {
        this.$el.text(this.model.value);
        this.$el.css(this.model.cell.position);
    }

    /**
     * Show the appear animation.
     */
    appear():void {
        const speedClass:string = 'a-speed--1';
        const animationClass:string = 'appear';

        this.model.animating = true;

        prefixedEventListener(this.$el, 'animationend', ():void => {
            this.$el.addClass('ready');
            this.$el.removeClass(`${animationClass}  ${speedClass}`);

            this.model.animating = false;
        }, true);

        this.$el.addClass(`${animationClass}  ${speedClass}`);
    }

    /**
     * Move the container to the new cell.
     */
    move():void {
        const distance:number = Cell.distance(this.model.cell, this.model.move);
        const speedClass:string = `t-speed--${distance}`;
        const animationClass:string = 'a-move';

        this.model.animating = true;

        prefixedEventListener(this.$el, 'transitionend', ():void => {
            this.$el.removeClass(`${animationClass}  ${speedClass}`);

            this.model.cell = this.model.move;
            this.model.move = undefined;
            this.model.animating = false;
        }, true);

        this.$el.addClass(`${animationClass}  ${speedClass}`);
        this.$el.css(this.model.move.position);
    }

    merge():void {
        this.model.animating = true;
        window.console.log('merge');
    }
}
