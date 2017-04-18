import * as jQuery from 'jquery';
import {init as initGame} from './2048/2048';

jQuery(($:JQueryStatic) => {
    const $container:JQuery = $('.js-app');

    if (0 === $container.length) {
        throw new Error('Cannot find container to create game.');
    }

    initGame($container, 4, [
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

    /*/
    initGame($container, 4, [
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
});
