import * as Backbone from 'backbone';

import {Value} from '../model/Value';

/**
 * @class Container
 */
class Container extends Backbone.View<Value> {
    /**
     * @returns {string}
     */
    get className():string {
        return 'c-value';
    }

    /**
     * @returns {Container}
     */
    render():Container {
        this.update();

        return this;
    }

    /**
     * Update the text and position
     */
    update():void {
        this.$el.text(this.model.value);
        this.$el.css(this.model.cell.position);
    }
}

export {Container};
