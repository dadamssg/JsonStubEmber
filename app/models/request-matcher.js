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
    
    project: DS.belongsTo('project', {async: true, inverse: 'requestMatchers'}),
	responses: DS.hasMany('response', {inverse: 'requestMatcher', async: true}),
    activeResponse: DS.belongsTo('response', { inverse: 'requestMatcher', async: true }),

    activeResponseTitle: function () {
        return this.get('activeResponse').then(function(activeResponse) {
            return activeResponse.get('title');
        }).catch(function() {
            return '';
        });
    }.property('activeResponse')
});