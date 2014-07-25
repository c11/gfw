/**
 * The Imazon timeline.
 *
 * @return ImazonTimeline class (extends TimelineMonthClass)
 */
define([
  'moment',
  'views/timeline/class/TimelineMonthClass',
  'presenters/TimelineClassPresenter'
], function(moment, TimelineMonthClass, Presenter) {

  'use strict';

  var ImazonTimeline = TimelineMonthClass.extend({

    initialize: function(layer) {
      this.options = {
        dateRange: [moment(layer.mindate), moment(layer.maxdate)],
        playSpeed: 1200
      };

      this.presenter = new Presenter(this);
      ImazonTimeline.__super__.initialize.apply(this, [layer]);
    }

  });

  return ImazonTimeline;

});
