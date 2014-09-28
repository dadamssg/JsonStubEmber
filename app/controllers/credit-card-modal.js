import Ember from 'ember';
import ajax from 'ic-ajax';
import config from '../config/environment';
import ApiMessages from '../mixins/api-messages';
import DS from 'ember-data';

export default Ember.ObjectController.extend(Ember.Evented, ApiMessages, {

    needs: ["admin/profile"],

    successMessages: [],

    errorMessages: DS.Errors.create(),

    submitting: false,

    actions: {

        submit: function() {
            this.set('submitting', true);

            var profileController = this.get("controllers.admin/profile");
            profileController.clearMessages();
            this.clearMessages();

            var $form = Ember.$('#payment-form');
            var self = this;

            Stripe.card.createToken($form, function stripeResponseHandler(status, response) {

                if (response.error) {
                    // Show the errors on the form
                    self.addErrorMessage('card', response.error.message);
                    self.set('submitting', false);
                } else {
                    // response contains id and card, which contains additional card details
                    var token = response.id;
                    
                    ajax(config.APP.API.host + '/api/subscriptions', {
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            stripe_create_subscription: {
                                token: token
                            }
                        })
                    }).then(function() {
                        profileController.addSuccessMessage("You've successfuly updated your subscription!");
                        self.trigger('closeModal');
                    }).catch(function(response) {
                        self.extractErrors(response);
                    }).finally(function() {
                        self.set('submitting', false);
                    });
                }
            });
        },

        cancel: function() {
            this.trigger('closeModal');     
        }
    }
});

































