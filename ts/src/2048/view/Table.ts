/// <reference path="../../../../typings/globals/backbone-global/index.d.ts" />
/// <reference path="../../../../typings/globals/jquery/index.d.ts" />

import jQuery from 'jquery';
import * as Backbone from 'backbone';
import {Game} from './../model/Game';
import {Cell} from './Cell';

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

        this.model.get('grid').each((position) => {
            let cell = new Cell({
                    model: position
                });

            if (position.get('row') !== row) {
                row = position.get('row');
                $el = jQuery('<tr>').appendTo(this.$el);
            }

            $el.append(cell.render().$el);
        });

        return this;
    }
}
