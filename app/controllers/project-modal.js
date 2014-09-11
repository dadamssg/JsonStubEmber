import Ember from 'ember';

export default Ember.ObjectController.extend(Ember.Evented, {

    saving: false,

    actions: {

        save: function() {

            var project = this.get('model');
            var self = this;
            
            self.set('saving', true);

            project.save().then(function(){                
                self.trigger('hideProjectModal');
                self.transitionToRoute('project', project);
            }).fail(function () {
            }).finally(function () {
                self.set('saving', false);
            });
        },

        delete: function() {

            var project = this.get('model');
            var self = this;

            project.destroyRecord().then(function() {
                return project.get('requestMatchers');
            }).then(function (requestMatchers) {
                requestMatchers.removeObject(project);
                self.trigger('hideProjectModal');
                self.transitionToRoute('projects');
            }).fail(function () {
            });
        },

        cancel: function() {

            var project = this.get('model');
            var self = this;

            if (project.get('isNew') === true) {   

                project.deleteRecord();
                self.trigger('hideProjectModal');
                return;
            } 

            project.rollback();
            this.trigger('hideProjectModal');         
        }
    }
});










































