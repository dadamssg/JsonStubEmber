import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(
    AuthenticatedRouteMixin, {

    activate: function() {
        this.controllerFor('project').set('showRequestMatchers', true);
    }, 

    model: function(params) {

        var self = this;
        return this.store.find('project', params.id).then(function (project) {
            return project;
        }).catch(function () {
            self.transitionTo('projects');
        });
    },

    actions: {

        newRequestMatcher: function() {

            var project = this.controllerFor('project').get('model');
            var requestMatcher = this.store.createRecord('request-matcher');
            var controller = this.controllerFor('request-matcher-modal');

            var self = this;

            project.get('requestMatchers').then(function (requestMatchers) {
                
                requestMatchers.pushObject(requestMatcher);
                requestMatcher.set('project', project);

                controller.set('model', requestMatcher);

                self.render('request-matcher-modal', {
                    into: 'project',
                    outlet: 'request-matcher-modal'
                });
            });
        },

        removeRequestMatcherModal: function() {
        
            this.disconnectOutlet({
                outlet: 'request-matcher-modal',
                parentView: 'project'
            });
        },

        editRequestMatcher: function(requestMatcher) {

            var controller = this.controllerFor('request-matcher-modal');
            controller.set('model', requestMatcher);
            return this.render('request-matcher-modal', {
                into: 'project',
                outlet: 'request-matcher-modal'
            });
        }
    }
});