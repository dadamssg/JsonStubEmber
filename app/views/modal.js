import Ember from 'ember';

export default Ember.View.extend({

    classNames: ["modal", "fade"],

    didInsertElement: function() {

        var controller = this.get('controller');    

        this.$().modal({
            keyboard: false,
            backdrop: "static"
        });

        //show the modal
        this.$().modal('show');

        var self = this;

        controller.on('closeModal', function () {
            self.$().modal('hide');
            controller.off('closeModal');
        });

        this.$().on('hidden.bs.modal', function() {
            controller.send('closeModal');
        });
    }
});