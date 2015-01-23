import Ember from 'ember';

export default Ember.Route.extend({
    
    model: function () {
        return this.store.findAll('invitation');
    },

    setupController: function (controller, model) {
        this._super(controller, model);
        controller.clearMessages();
    }
});