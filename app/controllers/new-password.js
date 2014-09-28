import Ember from 'ember';
import ApiMessages from '../mixins/api-messages';
import config from '../config/environment';
import DS from 'ember-data';

export default Ember.ObjectController.extend(ApiMessages, {

    needs: ["login"],

    successMessages: [],

    errorMessages: DS.Errors.create(),

    submitting: false,

    password: '',

    rePassword: '',

    actions: {
        reset: function() {

            this.clearMessages();

            var password = this.get('password').trim();
            var rePassword = this.get('rePassword').trim();

            if (password !== rePassword) {
                this.addError('The passwords must match.');
                return;
            }
           
            this.set('submitting', true);

            var self = this;

            var token = this.get('model');

            return Ember.$.ajax({
                type: 'GET',
                url: config.APP.API.host + '/users/reset-password/' + token + '/' + password,
                dataType: 'json',
                contentType: "application/json"
            }).then(function () {         
                self.get('controllers.login').addSuccessMessage('Successfuly reset password! Login below.');
                self.set('password', '');
                self.set('rePassword', '');
                self.transitionTo('login');
            }).fail(function (response) {
                self.extractErrors(response);
            }).always(function () {
                self.set('submitting', false);
            });
        }
    }
});