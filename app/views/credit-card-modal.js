import Modal from './modal';

export default Modal.extend({
    templateName: 'credit-card-modal',
    modalName: 'CreditCardModal',
    button: null,

    didInsertElement: function() {
        var $button = this.$('.ladda-button');

        var button = Ladda.create($button[0]);
        this.set('button', button); 
        this._super();
    },

    startLoading: function () {
        this.handleLoading();
    }.observes('controller.submitting'),

    stopLoading: function () {
        this.handleLoading();
    }.observes('controller.submitting'),

    handleLoading: function () {
        var submitting = this.get('controller.submitting');
        var $button = this.get('button');
        if (!$button) {
            return;
        }

        if (submitting) {
            $button.start();
        } else {
            $button.stop();
        }
    }
});