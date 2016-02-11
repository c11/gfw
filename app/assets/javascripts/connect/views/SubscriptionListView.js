define([
  'backbone', 'handlebars', 'underscore', 'moment', 'mps', 'map/utils',
  'connect/collections/Subscriptions',
  'connect/views/SubscriptionListItemView',
  'text!connect/templates/subscriptionList.handlebars'
], function(Backbone, Handlebars, _, moment, mps, utils, Subscriptions, SubscriptionListItemView, tpl) {

  'use strict';

  var SubscriptionListView = Backbone.View.extend({
    template: Handlebars.compile(tpl),

    initialize: function() {
      this.subscriptions = new Subscriptions();
      this.listenTo(this.subscriptions, 'sync remove', this.render);
      this.subscriptions.fetch();

      this.render();
    },

    render: function() {
      var calledAfterSync = arguments.length > 0;
      this.$el.html(this.template({
        showSpinner: !calledAfterSync && this.subscriptions.length === 0,
        subscriptions: this.subscriptions.toJSON()
      }));

      var sortedSubscriptions = new Subscriptions(
        this.subscriptions.sortBy(function(subscription) {
          return -moment(subscription.get('created')).unix();
        })
      );

      var $tableBody = this.$('#my-gfw-subscriptions-table-body');
      sortedSubscriptions.each(function(subscription) {
        var view = new SubscriptionListItemView({
          subscription: subscription});
        $tableBody.append(view.el);
      });
    },

    show: function() {
      var urlParams = _.parseUrl();
      if (urlParams.subscription_confirmed === 'true') {
        mps.publish('Notification/open', ['my-gfw-subscription-confirmed']);
      }
    }
  });

  return SubscriptionListView;

});
