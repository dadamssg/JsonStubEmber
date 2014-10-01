import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';
import ApiMessages from '../mixins/api-messages';
import DS from 'ember-data';

export default Ember.Controller.extend(LoginControllerMixin, ApiMessages, {
    authenticator: 'simple-auth-authenticator:oauth2-password-grant',

    submitting: false,

    errorMessages: DS.Errors.create(),

    successMessages: [],

    announcements: true,

    actions: {
        authenticate: function() {
            this.set('submitting', true);
            this.clearMessages();
            
            // for some reason simple-auth gets hung up after previous failed api requests
            // this ensures it get's reset so the user can resubmit the form
            Ember.run.later(this, function() {
              this.set('submitting', false);
            }, 2000);

            return this._super();
        },

        hideAnnouncements: function () {
            var store = this.get('storage');
            store.setValue('announcements', false);
            this.set('announcements', false);
        }
    }
});