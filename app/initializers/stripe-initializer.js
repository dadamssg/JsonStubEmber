import config from '../config/environment';

export default {
    name: 'stripe-initializer',
    initialize: function(){
        window.Stripe.setPublishableKey(config.APP.STRIPE.pubKey);
    }
};