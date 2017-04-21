import {Game} from './model/Game';
import {ValueLiteralInterface} from './model/ValueLiteralInterface';
import {App} from './view/App';

/**
 * @interface InitInterface
 */
export interface InitInterface {
    /**
     * @param {JQuery} $container
     * @param {number} size
     * @param {ValueLiteralInterface[]} values
     * @param {boolean} debug
     */
    ($container:JQuery, size:number, values:ValueLiteralInterface[], debug:boolean):void;
}

/**
 * Initialize the game.
 *
 * @param {JQuery} $container
 * @param {number} size
 * @param {ValueLiteralInterface[]} [values=[]]
 * @param {boolean} [debug=false]
 */
export const init:InitInterface = ($container:JQuery, size:number, values:ValueLiteralInterface[] = [], debug:false):void => {
    const game:Game = new Game({
        size,
        debug
    });
    const app:App = new App({
        model: game
    });

    $container.append(app.render().el);

    app.start(values);

    window['game'] = game;
};
