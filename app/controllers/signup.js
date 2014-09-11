import Ember from 'ember';
import ApiResponseMixin from '../mixins/api-response';

export default Ember.ObjectController.extend(ApiResponseMixin, {

    completed: false,
    working: false,
	email: '',
	password: '',
    rePassword: '',

    actions: {

        register: function () {

            var self = this;
            self.clearErrors();

            self.set('completed', false);

            var password = self.get('password').trim();
            var rePassword = self.get('rePassword').trim();

            if (password !== rePassword) {
                self.addError('The passwords must match.');
                return;
            }

            var registration = {
                user_registration: {
                    email: self.get('email').trim(),
                    plain_password: password
                }
            };

            self.set('working', true);
            var adapter = this.store.adapterFor('application');
            var url = adapter.get('host') + '/users/register';

            return Ember.$.ajax({
                type: 'POST',
                url: url,
                dataType: 'json',
                contentType: "application/json",
                data: JSON.stringify(registration)
            }).then(function () {         
                self.set('completed', true);      
            }).fail(function (response) {
                self.extractErrors(response);
            }).always(function () {
                self.set('working', false);
            });
        } 
    }
});