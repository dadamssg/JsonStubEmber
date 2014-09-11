import Ember from 'ember';
import CurrentUserMixin from '../../mixins/current-user';

export default Ember.Route.extend(CurrentUserMixin, {
    model: function () {
        return this.getUser();
    }
});