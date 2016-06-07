/// <reference path="../../typings/globals/jquery/index.d.ts" />

import $ from 'jquery';
import {App} from './2048/App';

$(() => {
    new App(<JQuery>$('#game'), 4);
});
