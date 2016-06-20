/// <reference path="../../../../typings/globals/backbone-global/index.d.ts" />

import * as Backbone from 'backbone';
import {Value} from './../model/Value';
import {Position} from './../model/Position';
import {PositionInterface} from './../interface/PositionInterface';

const CLASS_IS_READY:string = 'is-ready';

/**
 * @class NumberContainer
 */
export class NumberContainer extends Backbone.View<Value> {
    /**
     * @type {string}
     */
    get className():string {
        return 'c-value';
    }

    /**
     * Initialize the view
     */
    initialize() {
        this.model.on('change:value', this.update.bind(this));
        this.model.on('change:position', this.position.bind(this));
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
            pos:PositionInterface = position.getPosition();

        this.$el.css({
            left: pos.x,
            top: pos.y
        });
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
}
