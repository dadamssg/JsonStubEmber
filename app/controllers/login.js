import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(
    LoginControllerMixin, {
    authenticator: 'simple-auth-authenticator:oauth2-password-grant',

    submitting: false,

    errorMessages: [],

    successMessages: [],

    actions: {
        authenticate: function() {
            this.set('submitting', true);
            this.set('errorMessages', []);
            this.set('successMessages', []);
            return this._super();
        }
    }
});