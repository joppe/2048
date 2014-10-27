/*global define*/

define([
    'backbone',
    'underscore'
], function (
    Backbone,
    _
) {
    'use strict';

    var Value;

    Value = Backbone.View.extend({
        className: 'value',

        initialize: function () {
            this.model.on('change:value', _.bind(this.update, this));
            this.model.on('change:left change:top', _.bind(this.position, this));
            this.model.on('destroy', this.destroy, this);
        },

        render: function () {
            this.update();

            return this;
        },

        position: function () {
            this.$el.css({
                left: this.model.get('left'),
                top: this.model.get('top')
            });
        },

        update: function () {
            this.$el.text(this.model.get('value'));
        },

        destroy: function () {
            this.stopListening();
            this.$el.remove();
            this.model = null;
        }
    });

    return Value;
});