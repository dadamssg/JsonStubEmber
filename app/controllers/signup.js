import Ember from 'ember';
import ApiMessages from '../mixins/api-messages';
import DS from 'ember-data';
import ajax from 'ic-ajax';

export default Ember.ObjectController.extend(ApiMessages, {

    completed: false,
    
    submitting: false,
	
    email: '',
	
    password: '',
    
    rePassword: '',
    
    errorMessages: DS.Errors.create(),

    successMessages: [],

    actions: {

        register: function () {

            var self = this;
            self.clearMessages();

            self.set('completed', false);

            var password = self.get('password').trim();
            var rePassword = self.get('rePassword').trim();

            if (password !== rePassword) {
                self.addErrorMessage('The passwords must match.');
                return;
            }

            var registration = {
                user_registration: {
                    email: self.get('email').trim(),
                    plain_password: password
                }
            };

            self.set('submitting', true);
            var adapter = this.store.adapterFor('application');
            var url = adapter.get('host') + '/users/register';

            return ajax(url, {
                type: 'POST',
                contentType: "application/json",
                data: JSON.stringify(registration)
            }).then(function () {         
                self.set('completed', true);      
            }).catch(function (response) {
                self.extractErrors(response);
            }).finally(function () {
                self.set('submitting', false);
            });
        } 
    }
});