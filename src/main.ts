import jQuery from 'jquery';
import {Game} from './model/Game';
import {App} from './view/App';

jQuery(($:JQueryStatic) => {
    let game = new Game({
            size: 4
        }),
        app = new App({
            model: game
        });

    $('.js-app').append(app.render().el);

    app.start([
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
    ]);

    window['game'] = game;
});
