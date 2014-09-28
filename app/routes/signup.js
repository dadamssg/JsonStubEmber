import Ember from 'ember';

export default Ember.Route.extend({
  
    activate: function() {

        var controller = this.get('controller');
        if (controller) {
            controller.clearMessages();
            controller.set('completed', false);
        }
    }   
});