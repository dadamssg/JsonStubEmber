import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
    model: function(params) {

        var self = this;

        var adapter = this.store.adapterFor('application');
        var url = adapter.get('host') + '/users/confirm/' + params.token;

        ajax(url, {
            type: 'GET',
            contentType: "application/json"
        }).then(function () {       
            var loginController = self.controllerFor('login');
            var messages = loginController.get('successMessages');
            messages.pushObject('Registration complete! Login below.');
            self.transitionTo('login');     
        }).catch(function() {
            self.transitionTo('signup');   
        });
    }
});