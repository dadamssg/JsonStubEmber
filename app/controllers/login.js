import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';
import ApiMessages from '../mixins/api-messages';
import DS from 'ember-data';

export default Ember.Controller.extend(LoginControllerMixin, ApiMessages, {
    authenticator: 'simple-auth-authenticator:oauth2-password-grant',

    submitting: false,

    errorMessages: DS.Errors.create(),

    successMessages: [],

    actions: {
        authenticate: function() {
            this.set('submitting', true);
            this.clearMessages();
            return this._super();
        }
    }
});