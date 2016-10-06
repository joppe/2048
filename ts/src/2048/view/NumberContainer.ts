import * as Backbone from 'backbone';
import {Value} from './../model/Value';
import {Position} from './../model/Position';
import {PositionInterface} from './../interface/PositionInterface';
import {Game} from '../model/Game';

const CLASS_IS_READY:string = 'is-ready',
    ANIMATION_EASING = 'linear',
    ANIMATION_DURATION_FACTOR = 50;

/**
 * @interface NumberContainerOptionsInterface
 */
interface NumberContainerOptionsInterface extends Backbone.ViewOptions<Value> {
    /**
     * @type {Game}
     */
    game:Game;
}

/**
 * @class NumberContainer
 */
export class NumberContainer extends Backbone.View<Value> {
    /**
     * @type {Game}
     */
    private game:Game;

    /**
     * @type {string}
     */
    get className():string {
        return 'c-value';
    }

    /**
     * Initialize the view
     *
     * @param {object} options
     */
    constructor(options:NumberContainerOptionsInterface) {
        super(options);

        this.game = options.game;

        this.listenTo(this.model, 'change:value', this.update.bind(this));
        this.listenTo(this.model, 'change:position', this.position.bind(this));
        this.listenTo(this.model, 'change:merge', this.merge.bind(this));
        this.listenTo(this.model, 'destroy', this.remove.bind(this));
    }

    /**
     * @returns {NumberContainer}
     */
    render():NumberContainer {
        window.setTimeout(this.update.bind(this), 100);

        return this;
    }

    /**
     * Position the element
     */
    position():void {
        let position:Position = this.model.get('position'),
            previous:Position = this.model.previous('position'),
            pos:PositionInterface = position.position,
            deltaIndex;

        this.game.handleAnimationStart();

        if (undefined !== previous) {
            deltaIndex = Position.distance(position, previous);

            this.$el.animate({
                left: pos.x,
                top: pos.y
            }, {
                easing: ANIMATION_EASING,
                duration: ANIMATION_DURATION_FACTOR * deltaIndex,
                complete: () => {
                    this.game.handleAnimationEnd();
                }
            });
        } else {
            this.$el.css({
                left: pos.x,
                top: pos.y
            });

            this.game.handleAnimationEnd();
        }
    }

    /**
     * @returns {NumberContainer}
     */
    update():NumberContainer {
        let value:string = this.model.get('value');

        this.$el.text(value);

        if (!this.$el.hasClass(CLASS_IS_READY)) {
            this.$el.addClass(CLASS_IS_READY);
        }

        return this;
    }

    merge():void {
        window.console.log('merge');
        // position the value that must be merged
        // listen to (once) when that animation is finished
        // update the value of the model
    }
}
