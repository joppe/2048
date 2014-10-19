/*global define*/

define([
        'underscore',
        '2048/collection/grid',
        '2048/view/grid',
        '2048/model/value',
        '2048/view/value'
    ], function (
        _,
        GridCollection,
        GridView,
        ValueModel,
        ValueView
    ) {
    'use strict';

    var Game;

    Game = function (options) {
        var gridView;

        this.$el = options.$el;
        this.grid = new GridCollection(undefined, {
            size: options.size
        });

        gridView = new GridView({
            model: this.grid
        });

        this.$el.append(gridView.render().$el);

        this.cycle();
    };
    _.extend(Game.prototype, {
        cycle: function () {
            var cells = this.grid.getEmptyCells(),
                index = _.random(0, cells.length - 1),
                cell = cells[index],
                model = new ValueModel(),
                view =  new ValueView({
                    model: model
                });

            this.$el.append(view.render().$el);

            cell.set('value', model);
        }
    });

    return Game;
});