import Ember from 'ember';
import ApiMessages from '../mixins/api-messages';
import config from '../config/environment';
import DS from 'ember-data';
import ajax from 'ic-ajax';

export default Ember.ObjectController.extend(ApiMessages, {
    
    errorMessages: DS.Errors.create(),

    successMessages: [],

    submitting: false,

    email: '',

    actions: {
        reset: function() {
            
            this.clearMessages();
            
            this.set('submitting', true);

            var email = this.get('email');
            var self = this;

            return ajax(config.APP.API.host + '/users/reset/' + email, {
                type: 'GET',
                contentType: "application/json"
            }).then(function () {         
                self.get('successMessages').pushObject('Click on the link in the email we just sent you!');
                self.set('email', '');
            }).catch(function (response) {
                self.extractErrors(response);
            }).finally(function () {
                self.set('submitting', false);
            });
        }
    }
});