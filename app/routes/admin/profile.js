import Ember from 'ember';

export default Ember.Route.extend({
    
    activate: function () {
        var controller = this.get('controller');
        if (controller) {
            controller.clearMessages();
        }
    },

    model: function () {
        return this.get('userSession').getUser();
    },

    actions: {
        openCreditCardModal: function () {
            this.render('credit-card-modal', {
                into: 'application',
                outlet: 'modal',
                model: this.get('controller.model')
            });
        }
    }
});