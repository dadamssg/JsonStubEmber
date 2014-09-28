import Ember from 'ember';
import ResourceModal from '../mixins/resource-modal';

export default Ember.ObjectController.extend(Ember.Evented, ResourceModal, {

    saving: false,

    deleting: false,

    actions: {

        save: function() {

            var project = this.get('model');
            var self = this;
            
            self.set('saving', true);

            project.save().then(function(){                
                self.trigger('closeModal');
                self.transitionToRoute('project', project);
            }).fail(function () {
            }).finally(function () {
                self.set('saving', false);
            });
        },

        delete: function() {

            this.set('deleting', true);
            var project = this.get('model');
            var self = this;

            project.destroyRecord().then(function() {
                return project.get('requestMatchers');
            }).then(function (requestMatchers) {
                requestMatchers.removeObject(project);
                self.trigger('closeModal');
                self.transitionToRoute('projects');
            }).fail(function () {
            }).finally(function () {
                self.set('attemptingDelete', false);
                self.set('deleting', false);
            });
        },

        cancel: function() {
            this.set('attemptingDelete', false);

            var project = this.get('model');
            var self = this;

            if (project.get('isNew') === true) {   

                project.deleteRecord();
                self.trigger('closeModal');
                return;
            } 

            project.rollback();
            this.trigger('closeModal');         
        }
    }
});










































