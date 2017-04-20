import * as Backbone from 'backbone';
import {prefixedEventListener} from './../event/prefixedEventListener';
import {Cell} from './../model/Cell';
import {Game} from './../model/Game';
import {PositionInterface} from './../model/PositionInterface';
import {Value} from './../model/Value';

/**
 * @interface ContainerOptionsInterface
 */
interface ContainerOptionsInterface extends Backbone.ViewOptions<Value> {
    /**
     * @type {Game}
     */
    game:Game;

    /**
     * @type {Value}
     */
    model:Value;
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
        this.listenTo(this.model, 'change:value', this.updateValue.bind(this));
        this.listenTo(this.model, 'remove', this.remove.bind(this));
    }

    /**
     * Start animating when the game is not locked.
     */
    handleLock():void {
        if (this._game.locked) {
            return;
        }

        if (false === this.model.initialized) {
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
        this.$el.css(this.model.cell.position);

        this.updateValue();
    }

    /**
     * Update the text.
     */
    updateValue():void {
        this.$el.text(this.model.value);
    }

    /**
     * Show the appear animation.
     */
    appear():void {
        const speedClass:string = 'a-speed--1';
        const animationClass:string = 'appear';

        this.model.animating = true;
        this.model.initialized = true;

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

            this._game.tick();
        }, true);

        this.$el.addClass(`${animationClass}  ${speedClass}`);
        this.$el.css(this.model.move.position);
    }

    /**
     * Merge the value with an other value.
     * 1. Move the container to the (target) position of the cell of the merge value.
     * 2. Update (double) the value
     * 3. Update (double) the merge value
     * 4. Disappear the container.
     */
    merge():void {
        const distance:number = Cell.distance(this.model.cell, this.model.merge.target);
        const speedClass:string = `t-speed--${distance}`;
        const animationClass:string = 'a-move';

        this.model.animating = true;

        prefixedEventListener(this.$el, 'transitionend', ():void => {
            this.$el.removeClass(`${animationClass}  ${speedClass}`);

            this.model.double();
            this.model.merge.double();

            this._game.addScore(this.model.value);
            this._game.vals.remove(this.model);
            this._game.tick();
        }, true);

        this.$el.addClass(`${animationClass}  ${speedClass}  u-z--above`);
        this.$el.css(this.model.merge.target.position);
    }
}
