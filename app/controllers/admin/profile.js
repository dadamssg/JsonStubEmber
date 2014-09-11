import Ember from 'ember';
import ApiResponseMixin from '../../mixins/api-response';
import CurrentUserMixin from '../../mixins/current-user';

export default Ember.Controller.extend(ApiResponseMixin, CurrentUserMixin, {

    working: false,

    email: Ember.computed.alias("session.user.email"),

    apiToken: Ember.computed.alias("session.user.apiToken"),

    actions: {

        updateToken: function () {

            this.set('working', true);

            var self = this;
            var adapter = this.store.adapterFor('application');
            var url = adapter.get('host') + '/' + adapter.get('namespace') + '/user/api-token';

            return Ember.$.ajax({
                type: 'PUT',
                url: url,
                dataType: 'json',
                contentType: "application/json"
            }).then(function (response) {     
                var session = self.get('session');
                var user = session.get('user');
                var token = response.user.api_token;    
                user.apiToken = token;
                self.set('apiToken', token);
                session.set('user', user);
            }).fail(function (response) {
                self.extractErrors(response);
            }).always(function () {
                self.set('working', false);
            });
        }
    }
});