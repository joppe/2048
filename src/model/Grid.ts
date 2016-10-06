import _ from 'underscore';
import Backbone from 'backbone';
import {Cells} from '../collection/Cells';

/**
 * @class Grid
 */
class Grid extends Backbone.Model {
    /**
     * @returns {object}
     */
    defaults():Backbone.ObjectHash {
        return {
            cells: new Cells()
        };
    }

    /**
     * Initialize the grid by creating the necessary cells.
     */
    initialize():void {
        let size:number = this.get('size'),
            cells:Cells = this.get('cells');

        if (undefined === size) {
            throw new Error('Could not create grid, size not defined.');
        }

        _.each(_.range(size), (row:number) => {
            _.each(_.range(size), (column:number) => {
                cells.add({
                    row,
                    column
                });
            });
        });
    }
}

export {Grid};
