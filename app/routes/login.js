import Ember from 'ember';

export default Ember.Route.extend({

    activate: function () {
        this.stopSubmitting();
    },

    deactivate: function() {
        this.get('controller').clearMessages();
    },

    stopSubmitting: function () {
        var controller = this.get('controller');
        if (controller) {
            controller.set('submitting', false);
        }
    },

    actions: {

        authenticateSession: function () {
            this.stopSubmitting();
            return this._super();
        },

        sessionAuthenticationFailed: function (error) {
            this.stopSubmitting();
            var errorMsg = 'Invalid username/password.';

            if (error.errors) {
                errorMsg = error.errors[0];
            }

            this.get('controller').addErrorMessage('api', errorMsg);
        }
    }
});