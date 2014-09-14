import Ember from 'ember';
import ResourceModal from '../mixins/resource-modal';

export default Ember.ObjectController.extend(Ember.Evented, ResourceModal, {

    needs: ["project"],

    saving: false, 

    actions: {

        save: function() {

            var requestMatcher = this.get('model');
            var self = this;
            
            self.set('saving', true);

            var isNew = requestMatcher.get('isNew');

            var project = this.get('controllers.project').get('model');
            requestMatcher.set('project', project);
            
            requestMatcher.save().then(function(){                
                self.trigger('hideRequestMatcherModal');
                if (true === isNew) {
                    self.transitionToRoute('project.request-matcher', requestMatcher);
                }
            }).catch(function () {
            }).finally(function () {
                self.set('saving', false);
            });
        },

        delete: function() {
            var requestMatcher = this.get('model');
            var self = this;

            requestMatcher.get('project').then(function (project) {
                return project.get('requestMatchers');
            }).then(function (requestMatchers) {
                requestMatcher.destroyRecord().then(function () {
                    requestMatchers.removeObject(requestMatcher);
                    self.trigger('hideRequestMatcherModal');
                });
            }).finally(function () {
                self.set('attemptingDelete', false);
            });
        },

        cancel: function() {

            this.set('attemptingDelete', false);

            var requestMatcher = this.get('model');
            var self = this;

            if (requestMatcher.get('isNew') === true) {
                requestMatcher.get('project').then(function (project) {
                    return project.get('requestMatchers');
                }).then(function (requestMatchers) {
                    requestMatchers.removeObject(requestMatcher);
                    requestMatcher.deleteRecord();
                    self.trigger('hideRequestMatcherModal');
                });

                return;
            }

            requestMatcher.rollback();

            self.trigger('hideRequestMatcherModal');
        }
    }
});
