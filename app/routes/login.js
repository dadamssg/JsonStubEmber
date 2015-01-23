import Ember from 'ember';

export default Ember.Route.extend({

    activate: function () {
        this.stopSubmitting();
        if (window.location.protocol !== "https:") {
            window.location.href = "https://jsonstub.com/login";
        }

        this.redirectIfLoggedIn(this.get('controller'));
    },

    setupController: function (controller) {

        this.redirectIfLoggedIn(controller);

        var store = controller.get('storage');
        var announcements = store.getValue('announcements', true);
        store.setValue('announcements', announcements);
        controller.set('announcements', announcements);
    },

    redirectIfLoggedIn: function (controller) {
        if (!controller) {
            return;
        }
        if (controller.get('session.isAuthenticated')) {
            this.transitionTo('projects');
        }
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