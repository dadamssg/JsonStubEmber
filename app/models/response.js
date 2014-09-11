import DS from 'ember-data';
import Ember from 'ember';
import Base from './base';

export default Base.extend({
    title: DS.attr('string'),
    body: DS.attr('string'),
    statusCode: DS.attr('number'),
    createdAt: DS.attr('date'),
    updatedAt: DS.attr('date'),
    requestMatcher: DS.belongsTo('requestMatcher', {inverse: 'responses', async: true}),
    isActiveResponse: false,
    onActiveResponseChange: function () {
        Ember.run.once(this, 'setActiveResponse');
    }.observes('requestMatcher.activeResponse'),
    setActiveResponse: function () {
        var self = this;
        var id = parseInt(this.get('id'), 10);

        this.get('requestMatcher').then(function (requestMatcher) {
            return requestMatcher;
        }).then(function (requestMatcher) {
            return requestMatcher.get('activeResponse');
        }).then(function (response) {
            var activeId = parseInt(response.get('id'), 10);
            var isActive = id === activeId;
            self.set('isActiveResponse', isActive);
        }).catch(function() {
            self.set('isActiveResponse', false);
        });
    }
});