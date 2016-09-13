/// <reference path="../../../typings/globals/jquery/index.d.ts" />

import $ from 'jquery';
import {Keyboard} from './view/Keyboard';
import {Table} from './view/Table';
import {Game} from './model/Game';
import {Value} from './model/Value';
import {NumberContainer} from './view/NumberContainer';

/**
 * @class App
 */
export class App {
    /**
     * The root container
     *
     * @type {JQuery}
     */
    private $container:JQuery;

    /**
     * The grid size
     *
     * @type {number}
     */
    private size:number;
    
    /**
     * The Game model
     * 
     * @type Game
     */
    private game:Game;

    /**
     * @param {JQuery} $container
     * @param {number} [size]
     */
    constructor($container:JQuery, size:number = 4) {
        this.$container = $container;
        this.size = size;
        
        this.game = new Game({
            size
        });
        
        this.createViews();

        this.game.get('values').on('add', this.createValue.bind(this));
        // this.game.on('change:changedValues', this.);
        this.game.cycle();
    }
    
    /**
     * Create a view for the new value
     * 
     * @param {Value} value
     */
    private createValue(value:Value):void {
        var view = new NumberContainer({
                model: value
            });

        this.$container.append(view.render().$el);
    }
    
    /**
     * Create the views
     */
    private createViews():void {
        let table = new Table({
                model: this.game
            });

        this.$container.append(table.render().$el);
        
        new Keyboard({
            el: $('body'),
            model: this.game
        });
    }
}
