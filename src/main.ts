import * as jQuery from 'jquery';

import {Game} from './model/Game';

import {App} from './view/App';

jQuery(($:JQueryStatic) => {
    const game:Game = new Game({
            size: 4
        });
    const app:App = new App({
            model: game
        });

    $('.js-app').append(app.render().el);

    /*/
    app.start([
        {
            index: {
                row: 0,
                column: 0
            },
            value: 2
        },
        {
            index: {
                row: 0,
                column: 1
            },
            value: 4
        },
        {
            index: {
                row: 0,
                column: 2
            },
            value: 8
        },
        {
            index: {
                row: 0,
                column: 3
            },
            value: 2
        },
        {
            index: {
                row: 1,
                column: 0
            },
            value: 16
        },
        {
            index: {
                row: 1,
                column: 1
            },
            value: 32
        },
        {
            index: {
                row: 1,
                column: 2
            },
            value: 64
        },
        {
            index: {
                row: 1,
                column: 3
            },
            value: 128
        },
        {
            index: {
                row: 2,
                column: 0
            },
            value: 256
        },
        {
            index: {
                row: 2,
                column: 1
            },
            value: 512
        },
        {
            index: {
                row: 2,
                column: 2
            },
            value: 1024
        },
        {
            index: {
                row: 2,
                column: 3
            },
            value: 2048
        },
        {
            index: {
                row: 3,
                column: 0
            },
            value: 4
        },
        {
            index: {
                row: 3,
                column: 1
            },
            value: 8
        },
        {
            index: {
                row: 3,
                column: 2
            },
            value: 16
        },
        {
            index: {
                row: 3,
                column: 3
            },
            value: 32
        }
    ]);
    /**/

    app.start([
        {
            index: {
                column: 0,
                row: 0
            },
            value: 2
        },
        {
            index: {
                column: 0,
                row: 1
            },
            value: 2
        }
    ]);

    window['game'] = game;
});
