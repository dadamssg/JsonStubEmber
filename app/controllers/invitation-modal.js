import Ember from 'ember';
import ApiMessages from '../mixins/api-messages';
import ajax from 'ic-ajax';
import DS from 'ember-data';

export default Ember.ObjectController.extend(Ember.Evented, ApiMessages, {

    submitting: false,
    
    successMessages: [],

    errorMessages: DS.Errors.create(),

    email: null,

    members: [],

    removeEmail: null,

    removing: false,

    actions: {

        send: function() {
            this.set('submitting', true);
            this.clearMessages();

            var self = this;
            var adapter = this.store.adapterFor('application');
            var project = this.get('model');
            var url = adapter.get('host') + '/' + adapter.get('namespace') + '/invitations';

            var data = JSON.stringify({
                invitation: {
                    project: parseInt(project.get('id')),
                    receiver: self.get('email')
                }
            });

            console.log(data);

            return ajax(url, {
                type: 'POST',
                contentType: 'application/json',
                data: data
            }).then(function () {
                self.addSuccessMessage("You've successfuly invited a collaborator!");
                self.set('email', '');
            }).catch(function (response) {
                self.extractErrors(response);
            }).finally(function () {
                self.set('submitting', false);
            });
        },

        cancel: function() {
            this.trigger('closeModal');         
        },

        cancelRemove: function () {
            this.set('removeEmail', null);
            this.clearMessages();
        },

        attemptRemove: function (email) {
            this.set('removeEmail', email);
            this.clearMessages();
        },

        removeCollaborator: function (email) {

            if (this.get('removing')) {
                return;
            }

            this.set('removing', true);

            var self = this;
            var adapter = this.store.adapterFor('application');
            var project = this.get('model');
            var url = adapter.get('host') + '/' + adapter.get('namespace') + '/memberships/' + project.get('id') + '/' + email;

            ajax(url, {
                type: 'DELETE',
                contentType: 'application/json'
            }).then(function () {
                self.addSuccessMessage("Successfully removed collaborator.");
                self.get('members').removeObject(email);
            }).catch(function (response) {
                self.extractErrors(response);
            }).finally(function () {
                self.set('removing', false);
            });
        }
    }
});










































