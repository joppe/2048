import $ from 'jquery';
import {App} from './2048/App';

$(() => {
    new App(<JQuery>$('.js-game'), 4);
});
