import Ember from 'ember';
import ApiResponseMixin from '../mixins/api-response';
import config from '../config/environment';

export default Ember.ObjectController.extend(ApiResponseMixin, {

    submitting: false,

    email: '',

    actions: {
        reset: function() {
            
            this.clearMessages();
            
            this.set('submitting', true);

            var email = this.get('email');
            var self = this;

            return Ember.$.ajax({
                type: 'GET',
                url: config.APP.API.host + '/users/reset/' + email,
                dataType: 'json',
                contentType: "application/json"
            }).then(function () {         
                self.get('successMessages').pushObject('Click on the link in the email we just sent you!');
                self.set('email', '');
            }).fail(function (response) {
                self.extractErrors(response);
            }).always(function () {
                self.set('submitting', false);
            });
        }
    }
});