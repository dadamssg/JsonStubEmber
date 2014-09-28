import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    showProject: function (project) {
        this.render('project-modal', {
            into: 'application',
            outlet: 'modal',
            model: project
        });
    },

    actions: {

        newProject: function() {

            var project = this.store.createRecord('project');
            this.showProject(project);
        },

        editProject: function(project) {
            this.showProject(project);
        }
    }
});