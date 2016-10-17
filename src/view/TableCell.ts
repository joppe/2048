import Backbone from 'backbone';
import {Cell} from '../model/Cell';

/**
 * @class TableCell
 */
class TableCell extends Backbone.View<Cell> {
    /**
     * @returns {string}
     */
    get tagName():string {
        return 'td';
    }

    /**
     * @returns {string}
     */
    get className():string {
        return 'c-grid__cell';
    }

    /**
     * Store the elements position in the model
     */
    storeElementPosition():void {
        this.model.set({
            position: this.$el.position()
        });
    }
}

export {TableCell};
