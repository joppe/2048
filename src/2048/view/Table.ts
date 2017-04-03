import * as Backbone from 'backbone';
import * as jQuery from 'jquery';
import * as _ from 'underscore';
import {Cell} from './../model/Cell';
import {Game} from './../model/Game';
import {Grid} from './../model/Grid';
import {TableCell} from './TableCell';

/**
 * @class Table
 */
export class Table extends Backbone.View<Game> {
    /**
     * @returns {string}
     */
    get tagName():string {
        return 'table';
    }

    /**
     * @returns {string}
     */
    get className():string {
        return 'c-grid';
    }

    /**
     * @type {TableCell[]}
     */
    private tds:TableCell[] = [];

    /**
     * @returns {Table}
     */
    render():Table {
        const grid:Grid = this.model.grid;
        const size:number = this.model.size;

        _.each(_.range(0, size), (row:number) => {
            const $tr:JQuery = jQuery('<tr />');

            _.each(_.range(0, size), (column:number) => {
                const cell:Cell = grid.getCell({
                        row,
                        column
                    });
                const td:TableCell = new TableCell({
                        model: cell
                    });

                this.tds.push(td);

                $tr.append(td.render().el);
            });

            this.$el.append($tr);
        });

        return this;
    }

    /**
     * Store the positions of the elements in their own model.
     */
    storeElementPositions():void {
        this.tds.forEach((td:TableCell) => {
            td.storeElementPosition();
        });
    }
}
