import Ember from 'ember';

export default Ember.View.extend({

    model: null,
    modalName: 'ModalName',
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

        //when the controller triggers 'hideModal', actually hide the modal
        controller.on('hide' + self.get('modalName'), function() {

            self.$().modal('hide');

            //unbind the controller from this specific callback
            controller.off('hide' + self.get('modalName'));
        });

        this.$().on('hidden.bs.modal', function() {

            // bubbled to the route so the outlet gets disconnected
            controller.send('remove' + self.get('modalName'));
        });
    },

    willDestroyElement: function() {
        this.$().data('bs.modal', null);
    }
});