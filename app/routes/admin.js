import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    needs: ["application"],

    model: function () {
        var self = this;
        return this.get('userSession').getUser().then(function (user) {
            self.controllerFor('application').set('user', user);
            return user;
        });
    },

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

        editProject: function (project) {
            this.showProject(project);
        },

        goPremium: function () {
            this.transitionTo('admin.profile');
        }
    }
});