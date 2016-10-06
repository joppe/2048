import * as Backbone from 'backbone';
import * as _ from 'underscore';
import {Cell} from './../model/Cell';
import {GridOptionsInterface} from './../interface/GridOptionsInterface';
import {GridPositionInterface} from './../interface/GridPositionInterface';

/**
 * @class Grid
 */
export class Grid extends Backbone.Collection<Cell> {
    /**
     * @type {Cell}
     */
    get model():{new():Cell} {
        return Cell;
    }

    /**
     * @param {Array} models
     * @param {object} options
     */
    constructor(models:any, options:GridOptionsInterface) {
        super(models, options);

        this.createPositions(options.size);
    }

    /**
     * @param {number} size
     */
    private createPositions(size:number):void {
        _.each(_.range(0, size), (row) => {
            _.each(_.range(0, size), (column) => {
                this.add({
                    row,
                    column
                });
            });
        });
    }

    /**
     * @param {Cell[]} excludeCells
     * @returns {Cell}
     */
    getRandomPosition(excludeCells:Cell[] = []):Cell {
        let cell:Cell,
            availableCells = this.getPositions(excludeCells);

        if (0 < availableCells.length) {
            let index = _.random(availableCells.length - 1);

            cell = availableCells[index];
        }

        return cell;
    }

    /**
     * @param {Cell[]} excludeCells
     * @returns {Cell[]}
     */
    getPositions(excludeCells:Cell[] = []):Cell[] {
        let cells:Cell[];

        cells = this.filter((cell:Cell) => {
            return false === _.contains(excludeCells, cell);
        });

        return cells;
    }

    /**
     * @param {object} position
     * @returns {Cell}
     */
    getPosition(position:GridPositionInterface):Cell {
        return this.findWhere(position);
    }
}
