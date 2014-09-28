import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
import config from '../config/environment';

export default Ember.Route.extend(ApplicationRouteMixin, {

    actions: {
        sessionInvalidationSucceeded: function() {
            this.transitionTo('login');
        },
        
        didTransition: function() {

            if (config.environment === 'production') {
                Ember.run.once(this, function() {
                    ga('send', 'pageview', this.router.get('url'));
                });
            }
        },

        openModal: function (template) {
            this.render(template, {
                into: 'application',
                outlet: 'modal'
            });
        },

        closeModal: function () {
            this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application'
            });
        }
    }
});