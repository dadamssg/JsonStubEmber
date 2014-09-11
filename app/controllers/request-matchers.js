import Ember from 'ember';

export default Ember.ArrayController.extend({
    needs: ['project'],
    sortProperties: ['createdAt'],

    isSortingByPath: function () {
        return this.isSortingByField('path');
    }.property('sortProperties'),

    isSortingByCreatedAt: function () {
        return this.isSortingByField('createdAt');
    }.property('sortProperties'),

    isSortingByUpdatedAt: function () {
        return this.isSortingByField('updatedAt');
    }.property('sortProperties'),

    isSortingByField: function (field) {
        var activeProperty = this.get('sortProperties').get('firstObject');
        return field === activeProperty;
    },

    actions: {
        sort: function (field) {
            var activeProperty = this.get('sortProperties').get('firstObject');
            if (field === activeProperty) {
                this.toggleProperty('sortAscending');   
            } else {
                this.set('sortProperties', [field]);
            }  
        },

        editRequestMatcher: function (requestMatcher) {
            this.get('controllers.project').send('editRequestMatcher', requestMatcher);
        }
    }
});