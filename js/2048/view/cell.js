/*global define*/

define([
        'backbone',
        '2048/view/value'
    ], function (
        Backbone,
        Value
    ) {
    'use strict';

    var Cell;

    Cell = Backbone.View.extend({
        tagName: 'td',

        initialize: function () {
            this.listenTo(this.model, 'change:value', this.update);
        },

        update: function () {
            /*
            var value;

            if (null !== this.model.get('value')) {
                value = new Value();
                value.set({
                    x: this.model.get('x'),
                    y: this.model.get('y')
                });
            }
            */
        },

        setPosition: function () {
            var position = this.$el.offset();

            this.model.set({
                x: position.left,
                y: position.top
            });
        }
    });

    return Cell;
});