import Ember from 'ember';
import CurrentUserMixin from '../../mixins/current-user';
import ajax from 'ic-ajax';
import ApiMessages from '../../mixins/api-messages';
import DS from 'ember-data';

export default Ember.Controller.extend(ApiMessages, CurrentUserMixin, {

    successMessages: [],

    errorMessages: DS.Errors.create(),

    working: false,

    actions: {

        updateToken: function () {

            this.set('working', true);
            this.clearMessages();

            var self = this;
            var adapter = this.store.adapterFor('application');
            var url = adapter.get('host') + '/' + adapter.get('namespace') + '/user/api-token';

            return ajax(url, {
                type: 'PUT',
                contentType: 'application/json',
            }).then(function (response) {
                var token = response.user.api_token;   
                // self.set('apiToken', token); 

                // var session = self.get('session');
                // var user = session.get('user');
                // user.apiToken = token;
                // session.set('user', user);

                // self.getUser().then(function (user) {
                //     user.set('apiToken', token);
                // });
                self.get('model').set('apiToken', token);
            }).catch(function (response) {
                self.extractErrors(response);
            }).finally(function () {
                self.set('working', false);
            });
        }
    }
});