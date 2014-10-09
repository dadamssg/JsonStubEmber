import Ember from 'ember';
import ajax from 'ic-ajax';
import config from '../config/environment';

var User = Ember.Object.extend({
    email: null,
    apiToken: null,
    subscriptionPlan: null,
    subscriptionPrice: null,
    plan: function () {
        var plan = this.get('subscriptionPlan');
        return plan && plan.capitalize();
    }.property('subscriptionPlan'),
    isPremium: function () {
        var sub = this.get('subscriptionPlan');
        return sub && sub.toLowerCase() === 'premium';
    }.property('subscriptionPlan'),
    hasCard: function () {
        return this.get('isPremium') && this.get('subscriptionPrice') > 0;
    }.property('isPremium', 'subscriptionPrice')
});

var UserSession = Ember.Object.extend({

    user: null,

    getUser: function () {

        var user = this.get('user');

        if (user) {
            return new Ember.RSVP.Promise(function (resolve) {
              resolve(user);
            });
        }

        var self = this;
        //var adapter = this.store.adapterFor('application');
        var url = config.APP.API.host + '/api/user';

        return ajax(url, {
            dataType: 'json',
            contentType: 'application/json'
        }).then(function (response) {

            var userData = response.user;

            if (userData._embedded && userData._embedded.subscription) {
                var subscription = userData._embedded.subscription;
                userData.subscriptionPlan = subscription.plan;
                userData.subscriptionPrice = subscription.price;
                delete userData._embedded;
            }

            var fields = Object.keys(userData);

            var user = User.create();

            fields.forEach(function (field) {
                user.set(field.camelize(), userData[field]);
            });

            self.set('user', user);

            return user;
        }); 
    }
});

export default {
    name: 'user-session-initializer',
    initialize: function(container, application) {

        //var userSession = UserSession.create();

        application.register('jsonstub:user', UserSession);
        application.inject('controller', 'userSession', 'jsonstub:user');
        application.inject('route', 'userSession', 'jsonstub:user');
    }
};