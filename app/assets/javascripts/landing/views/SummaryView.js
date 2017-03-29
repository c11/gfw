/**
 * The Spinner view.
 */
define([
  'jquery',
  'backbone',
  'underscore',
  'landing/views/SliderView'
], function($, Backbone, _, SliderView) {

  'use strict';

  var SummaryView = Backbone.View.extend({

    el: '.c-home-summary',

    initialize: function() {
      this._initSlider();
    },

    _initSlider: function(){
      new SliderView({
        el: this.$el.find('.js_slider'),
        sliderOptions: {
          slideSpeed: 500
        }
      });
    },

  });
  return SummaryView;

});