import DS from 'ember-data';
import Base from './base';

export default Base.extend({
	email: DS.attr('string'),
    apiToken: DS.attr('string'),
    subscriptionPlan: DS.attr('string'),
    subscriptionPrice: DS.attr('number'),
    subscriptionValid: DS.attr('boolean'),
    subscriptionRateLimit: DS.attr('number'),
    rateLimit: function () {
        var limit = parseInt(this.get('subscriptionRateLimit'));
        return limit === 0 ? 200 : limit;
    }.property('subscriptionRateLimit'),
    isPremium: function () {
        var sub = this.get('subscriptionPlan');
        return sub && sub.toLowerCase() === 'premium';
    }.property('subscriptionPlan'),
    hasCard: function () {
        return this.get('isPremium') && this.get('subscriptionPrice') > 0;
    }.property('isPremium', 'subscriptionPrice')
});