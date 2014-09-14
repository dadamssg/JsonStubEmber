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
                    var url = this.router.get('url');
                    console.log(url);
                    ga('send', 'pageview', url);
                });
            }
        }
    }
});