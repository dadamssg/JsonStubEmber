import Ember from 'ember';

export default Ember.ArrayController.extend({
    needs: ['project/request-matcher'],
    sortProperties: ['createdAt'],

    isSortingByTitle: function () {
        return this.isSortingByField('title');
    }.property('sortProperties'),

    isSortingByStatusCode: function () {
        return this.isSortingByField('statusCode');
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

        editResponse: function (response) {
            this.get('controllers.project/request-matcher').send('editResponse', response);
        }
    }
});