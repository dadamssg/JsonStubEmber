import DS from 'ember-data';
import Base from './base';

export default Base.extend({
    receiver: DS.attr('string'),
    project: DS.attr('string'),
    token: DS.attr('string')
});