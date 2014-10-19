/*global define*/

define(['backbone', 'underscore'], function (Backbone, _) {
    'use strict';

    var Value;

    Value = Backbone.View.extend({
        className: 'value',

        initialize: function () {
            this.model.on('change:value', _.bind(this.update, this));
            this.model.on('change:x change:y', _.bind(this.position, this));
        },

        render: function () {
            this.update();

            return this;
        },

        position: function () {
            this.$el.css({
                left: this.model.get('x'),
                top: this.model.get('y')
            });
        },

        update: function () {
            this.$el.text(this.model.get('value'));
        }
    });

    return Value;
});