import jQuery from 'jquery';
import {Game} from './model/Game';
import {Table} from './view/Table';

jQuery(($:JQueryStatic) => {
    let game = new Game({
            size: 4
        }),
        table = new Table({
            model: game
        });

    $('.js-game').append(table.render().el);

    table.storeElementPositions();

    window['game'] = game;
});