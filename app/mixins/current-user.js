import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Mixin.create({

    _user: null,

    getUser: function() {

        //var session = this.get('session');
        //var user = session.get('user');
        var user = this.get('_user');

        if (user) {
            return new Ember.RSVP.Promise(function (resolve) {
              resolve(user);
            });
        }

        var self = this;
        var adapter = this.store.adapterFor('application');
        var url = adapter.get('host') + '/' + adapter.get('namespace') + '/user';

        return ajax(url, {
            dataType: 'json',
            contentType: 'application/json'
        }).then(function (response) {
            var user = self.store.createRecord('user');
            var userData = response.user;
            var fields = Object.keys(userData);

            fields.forEach(function (field) {
                var value = userData[field];
                if (field === "_embedded") {
                    user.set('subscriptionPlan', value.subscription.plan);
                    user.set('subscriptionPrice', value.subscription.price);
                    user.set('subscriptionValid', value.subscription.valid);
                    user.set('subscriptionRateLimit', value.subscription.rate_limit);
                    return;
                }
                user.set(field.camelize(), value);
            });

            self.set('_user', user);

            return user;
        }); 
    }
});