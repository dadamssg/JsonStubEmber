import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import ajax from 'ic-ajax';
import config from '../config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    projectsResponsesLoaded: [],

    loadingMembers: false,

    activate: function() {
        this.controllerFor('project').set('showRequestMatchers', true);
    }, 
   
    setupController: function (controller, project) {
        this._super(controller, project);
        console.log('setupController!!!!');

        if (!this.get('projectsResponsesLoaded').contains(project.get('id'))) {
            this.getActiveResponses(project);
        }
    },

    model: function(params) {

        var self = this;

        return this.store.find('project', params.id).then(function (project) {
            return project;
        }).catch(function () {
            self.transitionTo('projects');
        });
    },

    getActiveResponses: function (project) {

        var self = this;

        return ajax(config.APP.API.host + '/api/projects/' + project.get('id') + '/responses/active', {
            type: 'GET',
            contentType: 'application/json'
        }).then(function(activeResponses) {
            self.store.pushPayload('response', activeResponses);
            self.get('projectsResponsesLoaded').pushObject(project.get('id'));
            return project;
        }).catch(function() {
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

                self.render('response-modal', {
                    into: 'application',
                    outlet: 'modal',
                    model: response
                });
            });
        },

        activeResponse: function (response) {
            this.render('response-modal', {
                into: 'application',
                outlet: 'modal',
                model: response
            });
        },

        inviteToProject: function (project) {
            if (this.get('loadingMembers')) {
                return;
            }

            this.set('loadingMembers', true);

            var self = this;
            var adapter = this.store.adapterFor('application');
            var url = adapter.get('host') + '/' + adapter.get('namespace') + '/projects/' + project.get('id') + '/members';
            var controller = this.controllerFor('invitation-modal');
            var members = controller.get('members');
            controller.clearMessages();
            members.clear();

            return ajax(url, {
                type: 'GET',
                contentType: 'application/json',
            }).then(function (response) {
                var users = response.users;

                if (users) {
                    users.forEach(function (user) {
                        members.pushObject(user);
                    });
                }
            }).finally(function () {

                self.render('invitation-modal', {
                    into: 'application',
                    outlet: 'modal',
                    model: project
                });

                self.set('loadingMembers', false);
            });
        }
    }
});