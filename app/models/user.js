import DS from 'ember-data';
import Base from './base';

export default Base.extend({
	email: DS.attr('string'),
    apiToken: DS.attr('string')
});