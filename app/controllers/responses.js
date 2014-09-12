import Ember from 'ember';
import SortableController from '../mixins/sortable-array-controller';

export default Ember.ArrayController.extend(SortableController, {
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

    actions: {
        editResponse: function (response) {
            this.get('controllers.project/request-matcher').send('editResponse', response);
        }
    }
});