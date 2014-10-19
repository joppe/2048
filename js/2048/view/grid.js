/*global define*/

define(['backbone', 'jquery', '2048/view/cell'], function (Backbone, $, CellView) {
    'use strict';

    var Grid;

    Grid = Backbone.View.extend({
        tagName: 'table',

        render: function () {
            var row,
                $el;

            this.model.each(function (model) {
                var view = new CellView({
                        model: model
                    });

                if (model.get('row') !== row) {
                    row = model.get('row');
                    $el = $('<tr>').appendTo(this.$el);
                }

                $el.append(view.render().$el);
                view.setPosition();
            }, this);

            return this;
        }
    });

    return Grid;
});