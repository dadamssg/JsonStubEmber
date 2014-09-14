import Ember from 'ember';
import SortableController from '../mixins/sortable-array-controller';

export default Ember.ArrayController.extend(SortableController, {
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

    actions: {
        editRequestMatcher: function (requestMatcher) {
            this.get('controllers.project').send('editRequestMatcher', requestMatcher);
        }
    }
});