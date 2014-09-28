import Modal from './modal';

export default Modal.extend({

    saveButton: null,

    deleteButton: null,

    didInsertElement: function() {
        
        var $saveButton = this.$('.save-button')[0];
        this.set('saveButton', Ladda.create($saveButton)); 

        var $deleteButton = this.$('.delete-button')[0];
        this.set('deleteButton', Ladda.create($deleteButton));

        this._super();        
    },

    onSaveStateChange: function () {
        this.onButtonStateChange(this.get('saveButton'), this.get('controller.saving'));
    }.observes('controller.saving'),

    onDeleteStateChange: function () {
        this.onButtonStateChange(this.get('deleteButton'), this.get('controller.deleting'));
    }.observes('controller.deleting'),

    onButtonStateChange: function ($button, working) {
        if (!$button) { return; }

        if (working) {
            $button.start();
        } else {
            $button.stop();
        }
    }
});