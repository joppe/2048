/*global define*/

define([
    'backbone'
], function (
    Backbone
) {
    'use strict';

    var Cell;

    Cell = Backbone.View.extend({
        tagName: 'td',

        initialize: function () {
            this.listenTo(this.model, 'change:value', this.update);
        },

        update: function () {
            if (null !== this.model.get('value')) {
                this.model.get('value').set(this.getPosition());
            }
        },

        getPosition: function () {
            var position = {
                    left: this.model.get('left'),
                    top: this.model.get('top')
                };

            if (undefined === position.left || undefined === position.top) {
                position = this.$el.position();
                this.model.set(position);
            }

            return position;
        }
    });

    return Cell;
});