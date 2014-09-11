import DS from 'ember-data';
import Base from './base';

export default Base.extend({
    
    path: DS.attr('string'),
    createdAt: DS.attr('date'),
    updatedAt: DS.attr('date'),
        
    matchesGetRequest: DS.attr(),
    matchesPostRequest: DS.attr(),
    matchesPutRequest: DS.attr(),
    matchesDeleteRequest: DS.attr(),
    
    project: DS.belongsTo('project', {async: true}),
	responses: DS.hasMany('response', {inverse: 'requestMatcher', async: true}),
    activeResponse: DS.belongsTo('response', { inverse: 'requestMatcher', async: true })
});