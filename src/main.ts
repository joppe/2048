import jQuery from 'jquery';
import {Game} from './model/Game';
import {Table} from './view/Table';

jQuery(($:JQueryStatic) => {
    let game = Game.create({
            size: 4,
            vals: [
                {
                    index: {
                        row: 1,
                        column: 1
                    },
                    value: 16
                },
                {
                    index: {
                        row: 3,
                        column: 1
                    },
                    value: 4
                },
                {
                    index: {
                        row: 3,
                        column: 2
                    },
                    value: 4
                }
            ]
        }),
        table = new Table({
            model: game
        });

    $('.js-game').append(table.render().el);

    table.storeElementPositions();

    window['game'] = game;
});
