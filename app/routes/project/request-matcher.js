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

                var controller = self.controllerFor('responseModal');
                controller.set('model', response);

                self.render('responseModal', {
                    into: 'project.request-matcher',
                    outlet: 'responseModal'
                });
            });
        },

        save: function() {

            var controller = this.get('controller');
            controller.set('saving', true);

            var requestMatcher = controller.get('model');

            var self = this;

            requestMatcher.save().then(function() {
                self.transitionTo('project.request-matcher', requestMatcher);
                controller.set('editing', false);
            }).catch(function (reason) {
                alert(JSON.stringify(reason));
            }).finally(function () {
                controller.set('saving', false);
            });
        },
        
        editResponse: function (response) {
            var controller = this.controllerFor('responseModal');
            controller.set('model', response);
            return this.render('responseModal', {
                into: 'project.request-matcher',
                outlet: 'responseModal'
            });
        },

        removeResponseModal: function() {
        
            this.disconnectOutlet({
                outlet: 'responseModal',
                parentView: 'project.request-matcher'
            });
        }
    }
});