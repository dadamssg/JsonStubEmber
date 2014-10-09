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

    canceling: false,

    attemptingCancel: false,

    clearAllMessages: function () {
        var profileController = this.get("controllers.admin/profile");
        profileController.clearMessages();
        this.clearMessages();
    },

    getUser: function () {
        return this.get('userSession').getUser();
    },

    actions: {

        submit: function() {
            this.set('submitting', true);

            this.clearAllMessages();
            var profileController = this.get("controllers.admin/profile");

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
                    }).then(function(response) {
                        profileController.addSuccessMessage("You've successfuly updated your subscription!");
                        self.getUser().then(function (user) {
                            user.set('subscriptionPlan', response.subscription.plan);
                            user.set('subscriptionPrice', response.subscription.price);
                            //self.get('session').set('user', user);
                            self.trigger('closeModal');
                        });
                    }).catch(function(response) {
                        self.extractErrors(response);
                    }).finally(function() {
                        self.set('submitting', false);
                    });
                }
            });
        },

        attemptCancel: function () {
            this.set('attemptingCancel', true);
        },

        cancelSubscription: function () {
            
            var self = this;
            var profileController = self.get("controllers.admin/profile");
            self.clearAllMessages();
            self.set('canceling', true);

            ajax(config.APP.API.host + '/api/subscriptions/mine', {
                type: 'DELETE',
                contentType: 'application/json'
            }).then(function () {
                profileController.addSuccessMessage("You've successfuly cancelled your subscription.");
                self.getUser().then(function (user) {
                    user.set('subscriptionPlan', '');
                    user.set('subscriptionPrice', 0);
                    //self.get('session').set('user', user);
                    self.set('attemptingCancel', false);
                    self.trigger('closeModal');
                    //self.closeModal();
                });
            }).catch(function(response) {
                self.extractErrors(response);
            }).finally(function() {
                self.set('canceling', false);
            });
        },

        cancel: function() {
            //this.closeModal();    
            this.set('attemptingCancel', false);
            this.trigger('closeModal');  
        }
    },
    
    years: function () {
        var date = moment();
        var years = [];
        for (var i = 0; i < 4; i++) { 
            years.push({
                year: date.format('YYYY')
            });
            date.add(1, 'years');
        }
        return years;
    }.property()
});

































