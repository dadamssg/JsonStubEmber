import DS from 'ember-data';
import Base from './base';

export default Base.extend({
	title: DS.attr('string'),
	private: DS.attr('boolean'),
    apiToken: DS.attr('string'),
	requestMatchers: DS.hasMany('request-matcher', {async: true}),
	responses: DS.hasMany('response', {async: true})
});