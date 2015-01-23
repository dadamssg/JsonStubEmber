import Ember from 'ember';
import ajax from 'ic-ajax';
import ApiMessages from '../../mixins/api-messages';
import DS from 'ember-data';

export default Ember.ArrayController.extend(ApiMessages, {

    successMessages: [],

    errorMessages: DS.Errors.create(),

    submitting: false,

    actions: {

        acceptInvitation: function (invitation) {
            this.set('submitting', true);
            this.clearMessages();

            var self = this;
            var adapter = this.store.adapterFor('application');

            var url = adapter.get('host') + '/' + adapter.get('namespace') + '/invitations/' + invitation.get('token') + '/accept';

            ajax(url, {
                type: 'GET',
                contentType: 'application/json'
            }).then(function () {
                self.addSuccessMessage("You've successfuly joined a project!");
                self.get('model').removeObject(invitation);
            }).catch(function (response) {
                self.extractErrors(response);
            }).finally(function () {
                self.set('submitting', false);
            });
        },
    
        denyInvitation: function (invitation) {
            this.set('submitting', true);
            this.clearMessages();

            var self = this;
            var adapter = this.store.adapterFor('application');

            var url = adapter.get('host') + '/' + adapter.get('namespace') + '/invitations/' + invitation.get('token');

            ajax(url, {
                type: 'DELETE',
                contentType: 'application/json'
            }).then(function() {
                self.get('model').removeObject(invitation);
            }).catch(function (response) {
                self.extractErrors(response);
            }).finally(function () {
                self.set('submitting', false);
            });
        }
    }
});