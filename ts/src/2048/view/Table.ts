import $ from 'jquery';
import * as Backbone from 'backbone';
import {Game} from './../model/Game';
import {Cell} from './Cell';
import {Position} from './../model/Position';

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
     * @type {Game}
     */
    model:Game;

    /**
     * Render the table and the cells
     * 
     * @returns {Table}
     */
    render():Table {
        let row,
            $el:JQuery;

        this.model.get('grid').each((position:Position) => {
            let cell = new Cell({
                    model: position
                });

            if (position.get('row') !== row) {
                row = position.get('row');
                $el = $('<tr>').appendTo(this.$el);
            }

            $el.append(cell.render().$el);
        });

        return this;
    }
}
