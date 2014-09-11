import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        return params.token;
    },

    setupController: function (controller, token) {
        this._super(controller, token);
        this.controllerFor('reset-password').set('token', token);
    },

    deactivate: function() {
        this.get('controller').clearMessages();
    }
});