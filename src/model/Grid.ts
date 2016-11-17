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
     * @returns {number}
     */
    get size():number {
        return this.get('size');
    }

    /**
     * @returns {Cells}
     */
    get cells():Cells {
        return this.get('cells');
    }

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

        _.each(_.range(this.size), (row:number) => {
            _.each(_.range(this.size), (column:number) => {
                this.cells.add(new Cell({
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
        return this.cells.findWhere({
            row: index.row,
            column: index.column
        });
    }

    /**
     * @param {Cell[]} exclude
     * @returns {Cell}
     */
    getRandomCell(exclude?:Cell[]):Cell {
        let cells:Cell[] = this.getCells(exclude);

        if (0 === cells.length) {
            throw new Error('There are no cells available');
        }

        return cells[_.random(cells.length - 1)]
    }

    /**
     * @param {Cell[]} [exclude]
     * @returns {Cell[]}
     */
    getCells(exclude:Cell[] = []):Cell[] {
        return this.cells.filter((cell:Cell) => {
            return false === _.contains(exclude, cell);
        });
    }

    /**
     * @param {object} index
     * @returns {boolean}
     */
    isValidIndex(index:CellIndexInterface):boolean {
        return (
            index.row >= 0 && index.row < this.size &&
            index.column >= 0 && index.column < this.size
        );
    }
}

export {Grid};
