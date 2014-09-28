import Ember from 'ember';
import ApiMessages from '../mixins/api-messages';
import config from '../config/environment';
import DS from 'ember-data';
import ajax from 'ic-ajax';

export default Ember.ObjectController.extend(ApiMessages, {

    errorMessages: DS.Errors.create(),

    successMessages: [],

    submitting: false,

    token: null,

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

            var token = this.get('token');

            return ajax(config.APP.API.host + '/users/reset-password/' + token + '/' + password, {
                type: 'GET',
                contentType: "application/json"
            }).then(function () {         
                self.controllerFor('login').get('successMessages').pushObject('Successfuly reset password! Login below.');
                self.set('password', '');
                self.set('rePassword', '');
                self.transitionTo('login');
            }).catch(function (response) {
                self.extractErrors(response);
            }).finally(function () {
                self.set('submitting', false);
            });
        }
    }
});