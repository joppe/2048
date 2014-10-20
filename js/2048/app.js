/*global define*/

define([
        'underscore',
        'jquery',
        '2048/model/game',
        '2048/view/grid',
        '2048/view/value',
        '2048/view/keyboard'
], function (
        _,
        $,
        Game,
        Grid,
        Value,
        Keyboard
) {
    'use strict';

    var App;

    App = function (options) {
        this.$el = options.$el;

        window.game = this.game = new Game({
            size: options.size
        });
        this.game.get('values').on('add', this.createValue, this);

        this.createViews();

        this.game.cycle();
    };
    _.extend(App.prototype, {
        createValue: function (model) {
            var view = new Value({
                    model: model
                });

            this.$el.append(view.render().$el);
        },

        createViews: function () {
            var grid = new Grid({
                    model: this.game
                });

            this.$el.append(grid.render().$el);

            new Keyboard({
                el: $('body'),
                model: this.game
            });
        }
    });

    return App;
});