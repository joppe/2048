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
     */
    ($container:JQuery, size:number, values:ValueLiteralInterface[]):void;
}

/**
 * Initialize the game.
 *
 * @param {JQuery} $container
 * @param {number} size
 * @param {ValueLiteralInterface[]} values
 */
export const init:InitInterface = ($container:JQuery, size:number, values:ValueLiteralInterface[]):void => {
    const game:Game = new Game({
        size
    });
    const app:App = new App({
        model: game
    });

    $container.append(app.render().el);

    app.start(values);

    window['game'] = game;
};
