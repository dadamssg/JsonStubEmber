import Ember from 'ember';

export default Ember.Route.extend({

    setupController: function (controller) {
          controller.set('errorMessages', []);
          controller.set('submitting', false);
    },

    deactivate: function() {
        var controller = this.get('controller');
        controller.set('successMessages', []);
        controller.set('errorMessages', []);
    },

    actions: {

        authenticateSession: function () {
            this.controller.set('submitting', false);
            return this._super();
        },

        sessionAuthenticationFailed: function (error) {
            var errorMsg = 'Invalid username/password.';

            if (error.errors) {
                errorMsg = error.errors[0];
            }

            this.get('controller').get('errorMessages').pushObject(errorMsg);
            this.controller.set('submitting', false);
        }
    }
});