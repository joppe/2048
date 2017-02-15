import * as jQuery from 'jquery';

/**
 * @param {JQuery} $value
 */
const appear:Function = ($value:JQuery):void => {
    $value.addClass('appear');
};

jQuery(($:JQueryStatic) => {
    const $value:JQuery = $('.js-value');

    $('.js-control__appear').on('click', ():void => {
        appear($value);
    });
});
