import Ember from 'ember';
import ApiResponseMixin from '../../mixins/api-response';
import CurrentUserMixin from '../../mixins/current-user';

export default Ember.ObjectController.extend(ApiResponseMixin, CurrentUserMixin, {

    needs: ["project"],
    
    saving: false,

    editing: false,

    showExamples: false,

    cameFrom: null,

    apiToken: 'YOUR-API-TOKEN',

    projectToken: Ember.computed.alias("model.project.apiToken"),

    httpMethods: function () {
        var requestMatcher = this.get('model');

        var methods = [];

        if (requestMatcher.get('matchesGetRequest')) {
            methods.push('GET');
        }

        if (requestMatcher.get('matchesPostRequest')) {
            methods.push('POST');
        }

        if (requestMatcher.get('matchesPutRequest')) {
            methods.push('PUT');
        }

        if (requestMatcher.get('matchesDeleteRequest')) {
            methods.push('DELETE');
        }

        return methods.join('|');
    }.property('model.matchesGetRequest', 'model.matchesPostRequest', 'model.matchesPutRequest', 'model.matchesDeleteRequest'),

    actions: {

        edit: function() {
            this.set('editing', true);
        },

        view: function() {
            this.set('editing', false);
        },

        activateResponse: function (response) {

            this.clearErrors();

            if (this.get('saving') === true) {
                return;
            }

            var self = this;
            this.set('saving', true);

            var requestMatcher = this.get('model');

            var project = this.get('controllers.project').get('model');

            requestMatcher.set('activeResponse', response);
            requestMatcher.set('project', project);
            requestMatcher.save().catch(function (response) {
                self.extractErrors(response);
                requestMatcher.rollback();
            }).finally(function() {
                self.set('saving', false);
            });
        },

        cancel: function() {

            var self = this;
            this.set('editing', false);  

            var requestMatcher = this.get('model');
            requestMatcher.rollback();

            var cameFrom = this.get('cameFrom');
            self.set('cameFrom', null);

            if (cameFrom === 'project') {

                requestMatcher.get('project').then(function (project) {
                    self.transitionToRoute('project', project);
                });
            }
        },

        showExamples: function () {

            var apiToken = this.get('apiToken');
            
            if ('YOUR-API-TOKEN' === apiToken) {
                var self = this;
                this.getUser().then(function (user) {
                    self.set('apiToken', Ember.get(user, 'apiToken'));
                });
            } 
            
            this.set('showExamples', true);
        },

        hideExamples: function() {
            this.set('showExamples', false);
        }
    }
});