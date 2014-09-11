import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    actions: {

        newProject: function() {

            var project = this.store.createRecord('project');
            var controller = this.controllerFor('project-modal');
            controller.set('model', project);
            this.render('project-modal', {
                into: 'admin',
                outlet: 'project-modal'
            });
        },

        editProject: function() {

            var project = this.controllerFor('project').get('model');
            var controller = this.controllerFor('project-modal');
            controller.set('model', project);

            this.render('project-modal', {
                into: 'admin',
                outlet: 'project-modal'
            });
        },

        removeProjectModal: function() {

            this.disconnectOutlet({
                outlet: 'project-modal',
                parentView: 'admin'
            });
        }
    }
});