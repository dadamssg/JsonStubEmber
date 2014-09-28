import Ember from 'ember';
import ResourceModal from '../mixins/resource-modal';

export default Ember.ObjectController.extend(Ember.Evented, ResourceModal, {

    needs: ["project"],

    saving: false, 

    deleting: false,

    actions: {

        save: function() {

            var requestMatcher = this.get('model');
            var self = this;
            
            self.set('saving', true);

            var isNew = requestMatcher.get('isNew');

            var project = this.get('controllers.project').get('model');
            requestMatcher.set('project', project);
            
            requestMatcher.save().then(function(){                
                self.trigger('closeModal');
                if (true === isNew) {
                    self.transitionToRoute('project.request-matcher', requestMatcher);
                }
            }).catch(function () {
            }).finally(function () {
                self.set('saving', false);
            });
        },

        delete: function() {
            this.set('deleting', true);
            var requestMatcher = this.get('model');
            var self = this;

            requestMatcher.get('project').then(function (project) {
                return project.get('requestMatchers');
            }).then(function (requestMatchers) {
                return requestMatcher.destroyRecord().then(function () {
                    requestMatchers.removeObject(requestMatcher);
                    self.trigger('closeModal');
                });
            }).finally(function () {
                self.set('attemptingDelete', false);
                self.set('deleting', false);
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
                    self.trigger('closeModal');
                });

                return;
            }

            requestMatcher.rollback();

            this.trigger('closeModal');
        }
    }
});
