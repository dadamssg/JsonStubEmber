import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import ajax from 'ic-ajax';
import config from '../config/environment';

export default Ember.Route.extend(
    AuthenticatedRouteMixin, {

    activate: function() {
        this.controllerFor('project').set('showRequestMatchers', true);
    }, 

    model: function(params) {

        var self = this;
        return this.store.find('project', params.id).then(function (project) {

            return ajax(config.APP.API.host + '/api/projects/' + project.get('id') + '/responses/active', {
                type: 'GET',
                contentType: 'application/json'
            }).then(function(activeResponses) {
                self.responseSerializer.extractArray(self.store, 'response', activeResponses);
                self.store.pushPayload('response', activeResponses);
                return project;
            }).catch(function() {
                self.transitionTo('projects');
            });

        }).catch(function () {
            self.transitionTo('projects');
        });
    },

    showRequestMatcher: function (requestMatcher) {
        this.render('request-matcher-modal', {
            into: 'application',
            outlet: 'modal',
            model: requestMatcher
        });
    },

    actions: {

        newRequestMatcher: function() {

            var project = this.controllerFor('project').get('model');
            var requestMatcher = this.store.createRecord('request-matcher');

            var self = this;

            project.get('requestMatchers').then(function (requestMatchers) {
                
                requestMatchers.pushObject(requestMatcher);
                requestMatcher.set('project', project);

                self.showRequestMatcher(requestMatcher);
            });
        },
        
        editRequestMatcher: function(requestMatcher) {

            this.showRequestMatcher(requestMatcher);
        },

        openActiveResponse: function (requestMatcher) {
            var self = this;
            requestMatcher.get('activeResponse').then(function (response) {
                response.set('requestMatcher', requestMatcher);
                self.render('response-modal', {
                    into: 'application',
                    outlet: 'modal',
                    model: response
                });
            });
        }
    }
});