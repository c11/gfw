/**
 * The AnalysisView selector view.
 *
 * @return AnalysisView instance (extends Backbone.View).
 */
define([
  'underscore',
  'handlebars',
  'map/presenters/tabs/AnalysisPresenter',
  'text!map/templates/tabs/analysis.handlebars'
], function(_, Handlebars, Presenter, tpl) {

  'use strict';

  var AnalysisModel = Backbone.Model.extend({
    hidden: true
  });


  var AnalysisView = Backbone.View.extend({

    el: '#analysis-tab',

    template: Handlebars.compile(tpl),

    events: {
      'click #analysis-nav li' : 'toggleTabs'
    },

    initialize: function() {
      // this.presenter = new Presenter(this);
      this.model = new AnalysisModel();
      this.render();
      this.setListeners();
    },

    cacheVars: function(){
      this.$tabs = $('#analysis-nav li');
      this.$tabsContent = $('.analysis-tab-content');
    },

    setListeners: function(){

    },

    render: function(){
      this.$el.html(this.template());
      this.cacheVars();
    },

    // navigat between tabs
    toggleTabs: function(e){
      var tab = $(e.currentTarget).data('analysis');

      // Current tab
      this.$tabs.removeClass('active');
      $(e.currentTarget).addClass('active');

      // Current content tab
      this.$tabsContent.removeClass('active');
      $('#'+tab).addClass('active');


    }


  });
  return AnalysisView;

});
