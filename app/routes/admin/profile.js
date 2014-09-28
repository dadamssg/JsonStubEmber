import Ember from 'ember';
import CurrentUserMixin from '../../mixins/current-user';

export default Ember.Route.extend(CurrentUserMixin, {
    model: function () {
        return this.getUser();
    },

    setupController: function (controller, model) {
        this._super(controller, model);
        var token = this.get('session.user.apiToken');
        controller.set('apiToken', token);
    }
});