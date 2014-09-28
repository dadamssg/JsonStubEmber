import Ember from 'ember';

export default Ember.Route.extend({

    sortRequestMatchersBy: 'createdAt',
    sortRequestMatchersAscending: true,

	activate: function() {
		this.controllerFor('project').set('showRequestMatchers', false);
	}, 

	deactivate: function() {
		this.controllerFor('project').set('showRequestMatchers', true);
		this.get('controller').set('editing', false);
        var requestMatcher = this.get('controller').get('model');

        if (requestMatcher.get('isDirty')) {
            requestMatcher.rollback();
        }
	},

    model: function (params) {

        var self = this;

        return this.store.find('request-matcher', params.request_matcher_id).then(function (requestMatcher) {
            return requestMatcher;
        }).catch(function () {
            var project = self.controllerFor('project').get('model');
            self.transitionTo('project', project);
        });
    },

	actions: {

	    newResponse: function() {

            var self = this;
            var response = this.store.createRecord('response');
            response.set('statusCode', 200);

            var requestMatcher = this.get('controller').get('model');

            requestMatcher.get('responses').then(function(responses) {
            	responses.pushObject(response);

                self.editResponse(response);
            });
        },
      
        editResponse: function (response) {

            return this.render('response-modal', {
                into: 'application',
                outlet: 'modal',
                model: response
            });
        }
    }
});