import _ from 'underscore';
import Backbone from 'backbone';
import {Cells} from '../collection/Cells';
import {Cell} from './Cell';
import {CellIndexInterface} from './CellIndexInterface';
import {GridLiteralInterface} from './GridLiteralInterface';

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
    constructor(attributes:GridLiteralInterface) {
        super(attributes);

        let size:number = this.get('size'),
            cells:Cells = this.get('cells');

        _.each(_.range(size), (row:number) => {
            _.each(_.range(size), (column:number) => {
                cells.add(new Cell({
                    row,
                    column
                }));
            });
        });
    }

    /**
     * @param {object} index
     * @returns {Cell}
     */
    getCell(index:CellIndexInterface):Cell {
        let cells:Cells = this.get('cells');

        return cells.findWhere({
            row: index.row,
            column: index.column
        });
    }
}

export {Grid};
