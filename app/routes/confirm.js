import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {

        var self = this;

        var adapter = this.store.adapterFor('application');
        var url = adapter.get('host') + '/users/confirm/' + params.token;

        return Ember.$.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            contentType: "application/json"
        }).then(function () {       
            var loginController = self.controllerFor('login');
            var messages = loginController.get('successMessages');
            messages.pushObject('Registration complete!');
            self.transitionTo('login');     
        }).fail(function() {
            self.transitionTo('register');   
        });
    }
});